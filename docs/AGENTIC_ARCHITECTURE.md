# Agentic Document-to-Visual-Story Architecture

---

## Rethinking the Shape

A linear pipeline breaks down once you add external enrichment. Enrichment is *demand-driven* — you don't know what external data you need until you understand the document. And summarization isn't one step — it's a *strategy* applied at multiple levels. The architecture should be a **stateful graph** managed by an orchestrator, not a sequential chain.

```
                        ┌─────────────────────────────────┐
                        │         STORY STATE STORE        │
                        │  (shared mutable context object) │
                        └──────────────┬──────────────────┘
                                       │ read/write
            ┌──────────────────────────▼──────────────────────────┐
            │                    ORCHESTRATOR                       │
            │   (decides agent sequence, handles retries/loops)     │
            └──┬──────────┬──────────┬──────────┬──────────┬──────┘
               │          │          │          │          │
         ┌─────▼──┐  ┌────▼───┐ ┌───▼────┐ ┌──▼─────┐ ┌──▼──────┐
         │Ingest  │  │Analyze │ │Enrich  │ │Narrate │ │ Render  │
         │Agent   │  │Agent   │ │Cluster │ │Cluster │ │ Agent   │
         └────────┘  └────────┘ └────────┘ └────────┘ └─────────┘
```

---

## The Story State Object

This is the most important design decision. Every agent reads from and writes to a single evolving state. It makes the system debuggable, resumable, and auditable.

```
StoryState {
  ── INGESTION LAYER ──
  source_document:       RawDocument           // original bytes + format
  parsed_content:        DocumentModel         // normalized text, tables, figures
  content_analysis:      ContentAnalysis       // entities, claims, data types, domain, gaps

  ── ENRICHMENT LAYER ──
  enrichment_plan:       EnrichmentPlan        // what to fetch and why
  enrichment_artifacts:  EnrichmentArtifact[]  // raw results from external sources
  unified_knowledge:     KnowledgeStore        // fused doc + enrichment, conflicts resolved

  ── SUMMARIZATION LAYER ──
  summary_hierarchy:     SummaryHierarchy      // doc-level, section-level, data-point-level

  ── NARRATIVE LAYER ──
  story_blueprint:       StoryBlueprint        // ← human checkpoint lives here
  scene_specs:           SceneSpec[]           // typed, validated, renderer-ready

  ── META ──
  audit_log:             AuditEntry[]          // which agent wrote what, when, why
  validation_results:    ValidationResult[]
  checkpoints:           Checkpoint[]          // for resumability
}
```

Every agent appends to `audit_log`. If anything fails, you can restart from the last checkpoint without re-running expensive steps.

---

## Stage 1 — Ingestion Agent

**Input**: raw document (any format)
**Output**: `DocumentModel` written to Story State

This agent's job is purely normalization — no interpretation yet.

- Multi-format parsers: PDF (text + layout), DOCX, PPTX, CSV/Excel, HTML, images (OCR)
- Structure detection: headings hierarchy, tables with headers, figures with captions, footnotes
- Metadata extraction: author, date, version, source institution
- Preservation: retain original structure (heading levels, table relationships) — don't flatten to raw text, this loses semantic structure that downstream agents need

**Key design**: output a `DocumentModel` that distinguishes between *prose sections*, *data tables*, *figures*, and *claims*. Treating them all as text is what causes downstream agents to hallucinate data or miss visualizable content.

---

## Stage 2 — Analysis Agent

**Input**: `DocumentModel`
**Output**: `ContentAnalysis` — the most consequential artifact in the pipeline

This agent does five things:

### 1. Domain Classification
Identify domain (healthcare, finance, policy, science, marketing, etc.). This gates which external data sources are relevant in Stage 3 and which viz templates are appropriate in Stage 5.

### 2. Content Topology Mapping
Build a structured map of what the document contains:
- Entities with attributes (organizations, geographies, time periods, metrics)
- Claims (stated conclusions, assertions)
- Data tables (structure, columns, units, granularity)
- Relationships between entities

### 3. Dimensionality Detection
What dimensions are present? This directly drives viz type selection:

| Dimension | Viz Types |
|---|---|
| Temporal | Timelines, trend charts |
| Geographic | Maps, regional comparisons |
| Hierarchical | Trees, sunbursts |
| Comparative | Before/after, side-by-side |
| Relational | Force graphs, network diagrams |
| Statistical | Distributions, correlations |

### 4. Gap Identification *(critical for enrichment)*
What context is missing that would make this story more compelling or credible?
- Document claims X is "high" but provides no benchmark → need benchmark data
- Document covers 2 years of data but trend requires 5 → need historical data
- Document mentions geographic distribution but has no geo data → need mapping data
- Document is domain-specific but may lack broader context → need industry baselines

This gap list becomes the input to the Enrichment Planner. It should be specific: not "get more data" but "need national average for metric M in domain D for year Y to provide comparison."

### 5. Summarization Strategy Recommendation
Based on content topology, recommend how aggressive summarization should be per section — some sections are dense with data (summarize lightly, preserve numbers), others are verbose narrative (summarize aggressively, extract only key claims).

---

## Stage 3 — Enrichment Cluster

This is where the architecture diverges most from a simple pipeline. Enrichment is *conditional* and *parallel*.

### 3a. Enrichment Planner Agent
Takes the gap list from `ContentAnalysis` and produces an `EnrichmentPlan`:
- Maps each gap to a source type (public API, database, web search, vector store, internal data)
- Assigns priority (blocking vs nice-to-have)
- Generates specific queries per source

**Example plan for a healthcare document:**
```
Gap: "No national readmission benchmarks"
  → Source: CMS Hospital Compare API
  → Query: readmission_rates WHERE condition=X AND year=2023

Gap: "Geographic distribution mentioned but no geo data"
  → Source: Census TIGER files + internal hospital registry
  → Query: facility_locations WHERE state IN [mentioned_states]

Gap: "Claims about cost reduction but no industry baseline"
  → Source: Web search + vector store of industry reports
  → Query: "average hospital readmission cost reduction industry benchmark 2022-2024"
```

### 3b. Data Fetcher Agents *(parallel, one per source type)*
Each specialized fetcher handles one source category:
- **API Fetcher**: structured calls with auth, rate limiting, pagination
- **Database Fetcher**: SQL/NoSQL queries against internal data
- **Web Search Fetcher**: search + scrape + extract structured data from results
- **Vector Store Fetcher**: semantic search over indexed documents/reports

These run in parallel. The orchestrator waits for all blocking enrichments before proceeding; nice-to-have enrichments can complete later.

### 3c. Data Fusion Agent
Takes `DocumentModel` + `EnrichmentArtifacts[]` and produces the `KnowledgeStore`:
- **Conflict resolution**: document says X, external source says Y — flag it, prefer external if source is authoritative
- **Unit normalization**: percentages vs ratios, fiscal years vs calendar years, thousands vs millions
- **Temporal alignment**: ensure all data is on the same time axis
- **Geographic normalization**: state abbreviations, county FIPS codes, facility IDs
- **Provenance tagging**: every data point in the KnowledgeStore retains its source (document vs which external API) — critical for audit trails

The KnowledgeStore is *richer* than the original document but *smaller* — it's already deduplicated and normalized.

---

## Stage 4 — Summarization Agent

**Input**: `KnowledgeStore`, `ContentAnalysis.summarization_strategy`
**Output**: `SummaryHierarchy`

Summarization here isn't "make it shorter." It's **semantic compression with shape awareness** — the summaries are pre-structured for the downstream viz types they'll feed.

### Three Levels

**Document-level summary**
One coherent narrative paragraph. Used by the Narrative Planner to understand the overall arc. Contains: what the document is about, what it concludes, what data it contains, what the key tension or insight is.

**Section-level summaries** (one per logical section)
Each section summary is generated with awareness of:
- The likely viz type (if analysis detected temporal data in this section → summarize chronologically)
- What enrichment data applies to this section
- The target audience / detail level

A section summary for a comparison scene looks different from one for a timeline scene. The Narrative Planner will match sections to scene types — so summaries should already be shaped for their likely destination.

**Data-point summaries** (for individual metrics, tables, key claims)
These are the atoms of the story. Each data point summary contains:
- The value + unit
- Source (document or which external source)
- Context (what is this compared to? what does it mean?)
- Confidence level (directly stated vs inferred vs enriched)

### Anti-Hallucination Constraint
The Summarization Agent operates *only* on the KnowledgeStore. It cannot invent data. Any claim in a summary must cite a KnowledgeStore node. Statistical claims are never paraphrased in ways that change their meaning — exact figures from authoritative sources are preserved verbatim.

---

## Stage 5 — Narrative Planning Agent

**Input**: `SummaryHierarchy`, `ContentAnalysis.dimensionality`
**Output**: `StoryBlueprint`

### ← Human Checkpoint

**Story Arc Selection**
Based on document type and content:
- *Problem → Solution*: pain point → intervention → outcome (common for healthcare, policy)
- *Data Journey*: here's what we found → here's why it matters → here's what to do
- *Before → After*: contrast two states with a clear transformation in between
- *Geographic Exploration*: national → regional → local drill-down
- *Comparative Analysis*: entity A vs entity B across multiple dimensions

**Scene Sequencing**
The blueprint specifies an ordered list of scenes, each with:
- Scene type (maps to a viz template in the library)
- Data binding references (points to specific KnowledgeStore nodes and data-point summaries)
- Narrative role (hook, context, insight, call-to-action)
- Transition hint (how this scene connects to the next)

**Transition Logic**
Good stories have information flow — each scene should answer a question raised by the previous. The blueprint encodes this: "Scene 3 raises 'why is this distributed unevenly?' → Scene 4 answers it with geographic breakdown."

**What the User Can Do at the Checkpoint**
- Reorder scenes
- Change a scene type (bar chart → timeline)
- Remove scenes
- Add a scene ("also show X")
- Change the story arc

This is the cheapest point to course-correct. Changing a blueprint is trivial; re-rendering 12 scenes because the arc was wrong is expensive.

---

## Stage 6 — Scene Specification Agents *(parallel)*

**Input**: individual scene blueprints + relevant summaries + KnowledgeStore slices
**Output**: typed, validated `SceneSpec[]` — the renderer's native input format

This is where **format casting** happens in full.

### Three-Step Casting Process Per Scene

**Step 1 — Template Selection**
Given the scene type from the blueprint, select the exact template from the viz library. Templates have strict schemas. A "comparison" scene template expects exactly: `{ left: { title, items: Item[] }, right: { title, items: Item[] }, highlight?: string }`.

**Step 2 — Data Binding**
Map KnowledgeStore nodes and section summaries to template fields. This is the agent's main reasoning task:
- "The template needs `items[].value` as a number — the KnowledgeStore has it as a string with unit suffix → parse and separate"
- "The template needs geographic IDs — the summary mentions state names → map to FIPS codes"
- "The template needs exactly 4 comparison items — the summary has 7 → select the 4 most significant by delta"

**Step 3 — Validation**
The bound spec is validated against the template schema:
- All required fields present
- Types match
- No out-of-range values
- No empty arrays where items are required

**On validation failure**: try an alternative template first, then request a re-summarization of the relevant section with different constraints, then escalate to the orchestrator with a fallback (simpler template that can always be filled).

### Specialist Scene Agents

| Agent | Expertise |
|---|---|
| Chart Agent | Chart grammar: axes, scales, legends, color encoding |
| Map Agent | Geographic encoding: projection, choropleth vs proportional symbol, zoom level |
| Network Agent | Graph layout: force config, node grouping, link types |
| Timeline Agent | Temporal encoding: scale, event density, grouping |
| Text+Stats Agent | Typographic hierarchy: headline, stat callout, supporting copy |

---

## Stage 7 — QA & Validation Agent

**Input**: all `SceneSpec[]`
**Output**: validation report + corrections or flags

Cross-scene checks that individual scene agents can't do:
- **Narrative coherence**: do scenes flow logically? does each scene's narrative text connect to adjacent scenes?
- **Data consistency**: same metric cited in two scenes — do the values match?
- **Visual diversity**: are too many scenes the same type? (5 bar charts in a row is bad UX)
- **Completeness**: does the story cover all the key insights from the blueprint?
- **Factual provenance**: every displayed number traces back to a KnowledgeStore node

Failed scenes are sent back to the relevant Scene Agent with specific correction instructions.

---

## Stage 8 — Renderer

Deterministic. Takes validated `SceneSpec[]`, instantiates the React/D3 component library. No LLM involved.

---

## The Orchestrator

The orchestrator is itself an LLM agent, but its job is *control flow* not content. It:

- Decides whether enrichment results are sufficient or more fetching is needed (can loop back to Stage 3)
- Detects if a document type requires skipping certain stages (a simple CSV with no narrative text skips summarization)
- Manages token budget across agents (if context is large, tells summarization to be more aggressive)
- Handles partial failures (one enrichment API is down — continue without it, flag the gap in the story)
- Detects if the Narrative Planner's blueprint conflicts with available data and routes for re-planning

---

## Key Architectural Patterns

### Gap-Driven Enrichment (not shotgun enrichment)
Only fetch external data for *identified gaps*. Fetching everything upfront is expensive and creates noise. The Analysis Agent's gap list is the contract for what enrichment is justified.

### Provenance as a First-Class Citizen
Every data point carries its source chain: `document.section_3.table_2.row_4` or `cms_api.readmission_rates.2023.national_avg`. The renderer can show citations; the QA agent can verify consistency; users can trace claims back to sources.

### Summarization is Shape-Aware
Summaries are not generic — they're pre-structured for their destination viz type. A summary destined for a timeline scene is already in chronological order. A summary destined for a comparison scene already identifies the two entities being compared. This makes format casting in Stage 6 much more reliable.

### The Template Library as a Constraint
Agents don't generate arbitrary visualizations — they select and populate from a finite catalog. This is the most important constraint in the system. It makes outputs predictable, consistent, and renderable without code generation.

### Checkpoint-Based Resumability
Ingestion + analysis is cheap. Enrichment (external API calls) is expensive and unreliable. Summarization is moderate. Rendering is cheap. The system saves checkpoints after expensive stages so failures don't require restarting from scratch.

---

## Human-in-the-Loop Points

| Point | What user sees | What user can do |
|---|---|---|
| Post-analysis | Gap list + enrichment plan | Add/remove data sources, override domain classification |
| Post-blueprint | Story arc + scene list | Reorder, add, remove, change scene types |
| Post-generation | Preview of all scenes | Edit individual scene data, override viz choices |

Three checkpoints, progressively more expensive to change. Most users only need the blueprint checkpoint.

---

## Infrastructure

| Concern | Recommendation |
|---|---|
| Orchestration | Claude Agent SDK with explicit state management |
| LLM for reasoning agents | Claude (long context, structured JSON output, low hallucination on data) |
| Document parsing | Unstructured.io (multi-format, preserves layout) |
| External data caching | Redis with TTL by source freshness requirements |
| KnowledgeStore | Structured JSON + optional vector index for semantic retrieval on large docs |
| Schema validation | Zod (TypeScript) or Pydantic (Python) — pick at system boundary |
| State persistence | Postgres or document DB — one row per story job |
| Viz rendering | Existing React/D3 component library |
| Async execution | Queue-based (BullMQ or similar) — enrichment calls can be slow |

---

## Why This Is a Graph, Not a Pipeline

A pipeline assumes a fixed sequence. This system has:

- **Conditional branching**: enrichment is gap-driven, not always triggered
- **Parallelism**: scene agents and fetcher agents run concurrently
- **Feedback loops**: QA can route back to scene agents; orchestrator can re-trigger enrichment
- **Human checkpoints**: at the most valuable intervention points
- **Resumability**: checkpoint-based restart after partial failures

The Story State object is what makes all of this coherent — every agent writes to a shared, versioned, auditable store rather than passing messages point-to-point.
