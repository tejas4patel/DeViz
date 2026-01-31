# Storybook Compilation Rules

This document defines how a **storybook** should be assembled from individual scenes.
The goal is to ensure narrative clarity, visual coherence, and predictable structure,
regardless of the source document.

A storybook is not a slide deck or a report.
It is a guided visual narrative.

---

## Core Storybook Principles

- A storybook tells **one coherent story**
- Visuals serve the narrative, not the other way around
- Order matters
- Less is more when clarity is preserved

---

## Mandatory Storybook Structure

Every storybook MUST follow this high-level structure:

1. **Context (Introduction)**
2. **Story Body (Scenes)**
3. **Message (Conclusion)**

These sections are non-negotiable.

---

## 1. Context Section (Introduction)

**Purpose:** Orient the reader  
**Role:** Set expectations and frame the story  

### Rules
- Must always be the **first section**
- Should be concise (1–3 short lines)
- Explains:
  - what the story is about
  - why it matters
  - how to read what follows
- May include ONE high-level base visual
- Must NOT include tactical or microvisuals

### Design Guidance
- Calm, minimal, declarative
- No exploration or interaction required
- Think of this as the “cover page” of the story

---

## 2. Story Body (Scenes)

**Purpose:** Develop the narrative  
**Role:** Explain, explore, and reveal meaning  

The body consists of one or more **scenes**.
Each scene represents a self-contained idea.

---

### Scene Rules

Each scene MUST:
- Have a clear narrative intent
- Use exactly ONE base visual
- Answer at least one core question:
  - when
  - how
  - why
  - what
  - where
  - who
- Be understandable on its own
- Progress the story forward

---

### Scene Ordering Rules

Scenes should be ordered to follow a logical flow such as:
- problem → solution
- cause → effect
- simple → complex
- overview → detail
- past → present → future

Avoid random or purely thematic ordering.

---

### Use of Tactical Visuals

Tactical visuals are optional and should be used sparingly.

Rules:
- Never required
- Only add when content density justifies it
- Must enhance understanding, not decorate
- Often triggered by hover, focus, or drill-down

Examples:
- micro force graph on a timeline node
- tooltip with entity questions
- small bar or sparkline for context

---

### Scene Count Guidance

There is no fixed number of scenes.

General guidance:
- Minimum: 3 scenes (including intro and conclusion)
- Typical: 8–16 scenes
- Maximum: determined by narrative clarity, not document length

If a scene does not add new understanding, remove it.

---

## 3. Message Section (Conclusion)

**Purpose:** Close the story  
**Role:** Leave the reader with meaning  

### Rules
- Must always be the **final section**
- Summarizes key takeaways
- Reinforces the core message
- May include a simple visual or none at all
- Must NOT introduce new concepts

### Design Guidance
- Reflective, not analytical
- Answers: “So what?”
- Think of this as the story’s landing point

---

## Cross-Cutting Storybook Rules

### Consistency
- Use consistent terminology across scenes
- Reuse entity names and concepts
- Avoid renaming or re-framing late in the story

---

### Visual Discipline
- Do not mix multiple base visuals in one scene
- Do not force visuals where text alone is clearer
- Prefer fewer, stronger scenes over many weak ones

---

### Faithfulness to Source
- Do not invent facts
- Do not speculate beyond the document
- Enrichment clarifies structure, not content

---

## Mental Model

Think of a storybook as:

- a guided walk, not a maze
- a narrative, not a dashboard
- a sequence, not a pile

If the reader knows where they are, why they are there,
and what comes next, the storybook is working.

---

## Summary Rule

A good storybook starts with context, builds understanding through scenes, and ends with a clear message — without ever confusing the reader.