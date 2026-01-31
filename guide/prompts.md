# Manual Storybook Generation Prompts
Reusable Prompt Kit for Document → Visual Storybook JSON

This file contains a sequence of prompts to manually generate a complete
storybook JSON from a PDF document using ChatGPT.

Follow the prompts in order.
Do not skip steps.
Save the output of each step before moving to the next.

---

## PROMPT 1 — Document Suitability & Orientation

### Purpose
Determine whether the document is suitable for a visual storybook and identify major themes.

### Upload
- PDF document

### Prompt
You are a document analysis agent.

Review the attached PDF and answer the following:
1. What is the primary purpose of this document?
2. What are the major themes or sections?
3. Does this document have enough structure to support a visual storybook?
4. What types of visuals does the content naturally suggest (timeline, flow, hierarchy, network)?

Rules:
- Do not summarize the document
- Do not extract text yet
- This is an orientation check only

### Save Output As
- Orientation notes (optional)

---

## PROMPT 2 — Raw Content Extraction

### Purpose
Extract raw text blocks with minimal interpretation.

### Upload
- PDF document

### Prompt
Extract raw content blocks from the attached PDF.

Rules:
- Preserve original wording
- Extract headings, paragraphs, lists, and tables as separate blocks
- No summarization
- No interpretation
- No enrichment

Return JSON:
{
  "raw_blocks": [
    {
      "block_id": "",
      "block_type": "heading | paragraph | list | table",
      "text": "",
      "page_number": ""
    }
  ]
}

### Save Output As
- raw_blocks.json

---

## PROMPT 3 — Normalize Into Sections

### Purpose
Group raw blocks into logical sections without losing text.

### Upload
- PDF document
- raw_blocks.json

### Prompt
Normalize the raw blocks into clean document sections.

Rules:
- Preserve original wording as much as possible
- Do not aggressively summarize
- One structural layer only
- Group blocks logically

Return JSON:
{
  "document_sections": [
    {
      "section_id": "",
      "title": "",
      "original_text": ""
    }
  ]
}

### Save Output As
- document_sections.json

---

## PROMPT 4 — Semantic Enrichment (Entities and Questions)

### Purpose
Add meaning without changing structure.

### Upload
- document_sections.json

### Prompt
Perform semantic enrichment on the document sections.

Tasks:
- Identify meaningful entities (Person, Organization, Place, Concept, Process, Event, Data)
- Attach only meaningful questions
- Rename 7W fields to "questions"
- Trim unused question fields
- Do NOT restructure sections

Return the same JSON structure with entities appended.

### Save Output As
- enriched_sections.json

---

## PROMPT 5 — Gap Detection

### Purpose
Identify where strong visuals may require additional information.

### Upload
- enriched_sections.json

### Prompt
Analyze the enriched sections and identify gaps that could limit strong visual storytelling.

For each section, classify:
- sufficient
- enrichable
- blocking

Explain what is missing (timeline detail, relationships, background facts, etc.).

Return JSON:
{
  "gap_report": [
    {
      "section_id": "",
      "classification": "",
      "notes": ""
    }
  ]
}

### Save Output As
- gap_report.json

---

## PROMPT 6 — External Factual Enrichment (Conditional)

### Purpose
Append reliable external facts where needed.

### Upload
- enriched_sections.json
- gap_report.json

### Prompt
Perform external factual enrichment ONLY for sections marked enrichable.

Rules:
- Use dependable sources only (government, academic, standards bodies)
- Do not change document intent
- Append information, do not overwrite
- Attach source metadata:
  - source_type
  - source_name
  - retrieval_date
  - confidence_level

Return updated enriched sections JSON.

### Save Output As
- fact_enriched_sections.json

---

## PROMPT 7 — Story Planner (Outline Only)

### Purpose
Define the story arc and scene structure.

### Upload
- fact_enriched_sections.json

### Prompt
Create a storybook outline based on the enriched sections.

Rules:
- Story MUST start with Introduction and end with Conclusion
- Number of scenes is not fixed
- Each scene must:
  - have narrative purpose
  - reference source section_ids
  - use exactly ONE base visual
- Choose base visuals from:
  timeline, tree, sankey, force_graph, matrix, flowchart, map, custom

Return JSON:
{
  "story_outline": [
    {
      "scene_id": "",
      "scene_title": "",
      "narrative_purpose": "",
      "source_sections": [],
      "recommended_base_visual": "",
      "notes": ""
    }
  ]
}

### Save Output As
- story_outline.json

---

## PROMPT 8 — Visual Design Decisions

### Purpose
Decide tactical and microvisual usage.

### Upload
- story_outline.json
- fact_enriched_sections.json

### Prompt
For each story scene, decide:
- whether tactical visuals are needed
- what type (micro force graph, bar, sparkline, tooltip, etc.)
- where they appear (hover, drill-down, inline)

Rules:
- Never force microvisuals
- Introduction should not include microvisuals
- Only add where content density justifies it

Return JSON keyed by scene_id.

### Save Output As
- visual_design_notes.json

---

## PROMPT 9 — Introduction Visual Generation

### Purpose
Generate the visualization data for the opening scene as a dedicated force-directed graph.

### Upload
- story_outline.json
- fact_enriched_sections.json

### Prompt
Generate the visual JSON for the first scene (Introduction) ONLY.

Rules:
- The base visual MUST be a Force Directed Graph
- Nodes represent major Themes and Entities from the document
- Links represent strong connections between them
- This scene sets the context for the story
- Output strictly valid JSON for a force directed graph structure (nodes, links)

Return a single scene object for the Introduction.

### Save Output As
- intro_visual.json

---

## PROMPT 10 — Visual JSON Generation (Middle Scenes)

### Purpose
Generate schema-valid visuals for the middle scenes.

### Upload
- story_outline.json
- fact_enriched_sections.json
- visual_design_notes.json

### Prompt
Generate visual JSON for the middle story scenes (excluding Introduction and Conclusion).

Rules:
- Follow base visual type strictly
- Attach tactical visuals only where approved
- Preserve entity identity and questions
- Do not invent facts
- Keep visuals faithful to the outline

Return an array of scene JSON objects.

### Save Output As
- scene_visuals.json

---

## PROMPT 11 — Conclusion Visual Generation

### Purpose
Generate the visualization data for the closing scene.

### Upload
- story_outline.json
- fact_enriched_sections.json

### Prompt
Generate the visual JSON for the last scene (Conclusion) ONLY.

Rules:
- The base visual can be any type appropriate for a summary/conclusion
- Summarize the key takeaways
- Output strictly valid JSON for the scene structure

Return a single scene object for the Conclusion.

### Save Output As
- conclusion_visual.json

---

## PROMPT 12 — Final Assembly and QA

### Purpose
Produce the final storybook JSON.

### Upload
- intro_visual.json
- scene_visuals.json
- conclusion_visual.json

### Prompt
Assemble all scenes into a single VisualDocument JSON.

Tasks:
- Combine the Introduction (intro_visual.json), middle scenes (scene_visuals.json), and Conclusion (conclusion_visual.json)
- Order scenes correctly
- Validate consistency
- Ensure Introduction and Conclusion are present
- Check schema cleanliness
- Ensure narrative flow

Return ONE final JSON object.
No explanation outside JSON.

### Final Output
- storybook_final.json

---

## End of Manual Workflow

The resulting JSON is ready to be consumed by a React + D3 storybook renderer.
