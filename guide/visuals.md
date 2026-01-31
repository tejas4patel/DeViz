# Reusable Visual Types for Storytelling Engine

This document defines two classes of visuals used by the engine:
- **Base Visuals**: structural primitives that define an entire scene
- **Tactical Visuals**: optional, composable elements that enhance meaning

The separation keeps the system scalable, predictable, and expressive.

---

## Reusable Base Visuals

Base visuals are **scene-level primitives**.  
They are stable, schema-driven, and always supported by the engine.

If removing a visual makes the story impossible to tell, it belongs here.

---

### 1. Timeline
**Purpose:** Time-based progression  
**Answers:** When did things happen  

**Use cases:**
- history and evolution
- milestones
- phased initiatives
- roadmaps

---

### 2. Tree
**Purpose:** Hierarchical structure  
**Answers:** What belongs to what  

**Use cases:**
- taxonomies
- organizational structures
- system decomposition
- capability breakdowns

---

### 3. Sankey
**Purpose:** Flow and transformation  
**Answers:** How inputs become outputs  

**Use cases:**
- value flow
- resource allocation
- influence mapping
- process transformation

---

### 4. Force Graph
**Purpose:** Network relationships  
**Answers:** What is connected to what  

**Use cases:**
- entity networks
- dependencies
- ecosystems
- concept relationships

---

### 5. Matrix / Heatmap
**Purpose:** Two-dimensional comparison  
**Answers:** How dimensions relate  

**Use cases:**
- alignment analysis
- risk vs impact
- agreement levels
- prioritization grids

---

### 6. Flowchart / Process Diagram
**Purpose:** Procedural logic  
**Answers:** What happens next  

**Use cases:**
- workflows
- decision trees
- approval processes
- protocols

---

### 7. Map / Spatial Visual
**Purpose:** Geographic or spatial context  
**Answers:** Where things happen  

**Use cases:**
- regional distribution
- jurisdictional boundaries
- service coverage

Note: keep abstract, not GIS-heavy.

---

### 8. Custom Visual
**Purpose:** Controlled escape hatch  
**Answers:** This does not fit existing models  

**Use cases:**
- domain-specific visuals
- experimental layouts
- narrative-only scenes

---

## Reusable Tactical Visuals

Tactical visuals are **meaning amplifiers**.  
They attach to base visuals but never define a scene on their own.

If removing a visual does not break the story, it belongs here.

---

### 1. Micro Force Graph
**Purpose:** Local relationship context  
**Used for:** hover or drill-down on entities

---

### 2. Bar (Micro)
**Purpose:** Relative comparison  
**Used for:** small category contrasts

---

### 3. Pie / Donut (Micro)
**Purpose:** Proportional breakdown  
**Used for:** parts of a whole

---

### 4. Sparkline
**Purpose:** Trend indication  
**Used for:** lightweight time context

---

### 5. Gauge
**Purpose:** Status or progress  
**Used for:** readiness, completion, risk

---

### 6. Before / After Panel
**Purpose:** Contrast states  
**Used for:** transformation narratives

---

### 7. Callout / Annotation
**Purpose:** Emphasize meaning  
**Used for:** directing attention

---

### 8. Tooltip Card
**Purpose:** Rich metadata display  
**Used for:** entity questions or 7W details

---

### 9. Legend / Icon Strip
**Purpose:** Semantic cues  
**Used for:** reinforcing categories or meaning

---

### 10. Summary Strip
**Purpose:** High-level takeaway  
**Used for:** framing or concluding a scene

---

## Guiding Rules

- Base visuals define structure  
- Tactical visuals enhance meaning  
- Never force a visual where content density is low  
- Prefer clarity over novelty  

This separation keeps the storytelling engine expressive, scalable, and safe.
