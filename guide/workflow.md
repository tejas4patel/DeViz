# End-to-End Storybook Generation Flow

This document defines the **full multi-agent workflow** required to generate
a high-quality visual storybook that is accurate, visually compelling,
and narratively effective.

The process is deliberately staged to balance:
- faithfulness to source
- visual richness
- factual reliability
- narrative clarity

---

## Overview

An awe-inspiring storybook is not created in one pass.
It is built through **disciplined stages**, each handled by a specialized agent.

The system uses **11 distinct steps**, grouped into **4 major phases**.

---

# PHASE 1 — FOUNDATION (UNDERSTAND THE DOCUMENT)

## Step 1 — Document Intake Agent
**Role:** Collector  
**Input:** PDF document  
**Output:** Document metadata  

### Responsibilities
- Accept and register the document
- Extract basic metadata (title, author, date, length)
- Validate document suitability for storification

### Key Question Answered
Is this document structurally rich enough to tell a story?

---

## Step 2 — Raw Extraction Agent
**Role:** Extractor  
**Input:** PDF  
**Output:** Raw content blocks (JSON)

### Responsibilities
- Extract paragraphs, headings, tables, lists
- Preserve original wording
- No interpretation
- No summarization

### Output Characteristics
- Flat
- No hierarchy
- No enrichment

---

## Step 3 — Normalization Agent
**Role:** Organizer  
**Input:** Raw blocks  
**Output:** Normalized sections JSON

### Responsibilities
- Group blocks into logical sections
- Preserve original text with minimal cleanup
- Assign section titles and IDs
- Avoid meaning loss

### Key Rule
Structure without summarization.

---

# PHASE 2 — MEANING (UNDERSTAND WHAT IT SAYS)

## Step 4 — Semantic Enrichment Agent
**Role:** Interpreter  
**Input:** Normalized sections  
**Output:** Enriched sections

### Responsibilities
- Identify meaningful entities
- Attach only relevant questions (what, why, how, when, etc.)
- Do not force completeness
- Preserve original structure

### Output
- Sections + entities + questions
- No visuals yet

---

## Step 5 — Gap Detection Agent
**Role:** Analyst  
**Input:** Enriched sections  
**Output:** Gap report

### Responsibilities
- Identify sections with insufficient detail for visualization
- Flag missing timelines, mechanisms, relationships
- Classify gaps as:
  - ignorable
  - enrichable
  - blocking

### Output
- Gap annotations per section

---

# PHASE 3 — KNOWLEDGE AUGMENTATION (WHEN NEEDED)

## Step 6 — External Enrichment Agent (Conditional)
**Role:** Researcher  
**Input:** Gap report + enriched sections  
**Output:** Fact-augmented sections

### Responsibilities
- Retrieve factual information from dependable sources
- Append information without changing document intent
- Attach source metadata and confidence
- Leave gaps unfilled if sources are unreliable

### Key Constraint
External facts support visuals, not conclusions.

---

## Step 7 — Enrichment QA Agent
**Role:** Validator  
**Input:** Enriched content  
**Output:** Approved enriched sections

### Responsibilities
- Verify factual consistency
- Ensure no narrative drift
- Validate source quality
- Reject speculative additions

---

# PHASE 4 — STORYTELLING (TURN CONTENT INTO A STORY)

## Step 8 — Story Planner Agent
**Role:** Story Architect  
**Input:** Approved enriched sections  
**Output:** Story outline

### Responsibilities
- Define story arc
- Decide number of scenes (no fixed limit)
- Assign one base visual per scene
- Ensure mandatory sections:
  - Introduction
  - Conclusion

### Output
A scene-by-scene outline with narrative intent.

---

## Step 9 — Visual Design Agent
**Role:** Visual Strategist  
**Input:** Story outline  
**Output:** Visual specifications

### Responsibilities
- Choose appropriate base visuals
- Decide where tactical visuals add value
- Enforce visual discipline
- Avoid forced or decorative visuals

---

## Step 10 — Visual JSON Generation Agent
**Role:** Builder  
**Input:** Visual specs  
**Output:** Visual JSON per scene

### Responsibilities
- Generate schema-valid visual JSON
- Attach microvisuals only where justified
- Maintain consistency across scenes
- Preserve entity identity

---

## Step 11 — Storybook Assembler & QA Agent
**Role:** Editor  
**Input:** All scene JSON  
**Output:** Final storybook JSON

### Responsibilities
- Assemble scenes in narrative order
- Validate schema conformity
- Check story flow and coherence
- Ensure strong opening and closing

---

# Final Output

The final product is a **VisualDocument JSON** containing:
- story metadata
- ordered scenes
- validated visuals
- traceable enrichment
- narrative integrity

This JSON is ready for rendering in a React + D3 front-end.

---

# Summary Flow

1. Intake  
2. Extract  
3. Normalize  
4. Enrich meaning  
5. Detect gaps  
6. Enrich facts (optional)  
7. QA enrichment  
8. Plan story  
9. Design visuals  
10. Generate visual JSON  
11. Assemble and validate  

---

## Core Guiding Principle

> Awe comes from clarity, not complexity.

A great storybook:
- respects the document
- guides the reader
- uses visuals with intent
- ends with meaning

If every agent honors its role,
the result will be both beautiful and trustworthy.
