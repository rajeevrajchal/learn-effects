# Plan: Add Red Progress Tip Indicator to Bone-Shaped Progress Bar

## Task Type

Feature Implementation

## Overview

Add a small red vertical rectangle that tracks the leading (right) edge of the green fill in the SVG bone-shaped progress bar. The indicator is hidden at `value === 0` and whenever the tip position overlaps any circle knob's dark inner body (radius 28), making it contextually visible only when it would be meaningful to the user.

## Goals

- [ ] Goal 1 — A red `<rect>` (4 × 80 SVG units) appears at the right edge of the green fill, centred on that edge, tracking progress visually
- [ ] Goal 2 — The red rect is hidden when `value === 0` or when its x position falls within ±28 SVG units of any circle centre in `circlePositions`
- [ ] Goal 3 — No existing elements are modified; only two additions are made to the single target file

## Assumptions

- The file at `src/lib/components/progress.svelte` is exactly the 101-line version provided — no other versions or imports exist.
- `VIEWBOX_HEIGHT = 80` and circle dark-body radius `r = 28` are stable constants and will not change as part of this task.
- `circlePositions` is already a reactive `$derived` array — referencing it inside the new `showTip` derived is safe.
- No external consumers of this component need changes; the red rect is purely internal/visual.
- Svelte 5 runes mode is active (file already uses `$props`, `$bindable`, `$derived`).
- `clip-path` must NOT be applied to the red rect (confirmed requirement).

## Architecture Decisions

| Decision             | Choice                                   | Rationale                                                             |
| -------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| Reactivity primitive | `$derived` (Svelte 5 rune)               | Consistent with all other reactive values already in the file         |
| Visibility gate      | `{#if showTip}` block                    | Cleanest SVG — no hidden/invisible element in the DOM when not needed |
| Positioning          | `x = tipX - 2` (half of 4-unit width)    | Centres the 4-unit-wide rect on the exact tip x                       |
| Overlap detection    | `Math.abs(tipX - cx) <= 28` for every cx | Matches the dark inner body radius used in the existing design        |

## Implementation Steps

### Phase 1: Add derived values to `<script>` (Estimated: simple)

**Goal link**: Goal 1, Goal 2  
**Files touched**: `src/lib/components/progress.svelte`  
**Depends on**: Nothing

1. After the existing `const boneTotalWidth = $derived(...)` line (line 33), insert two new `$derived` constants — no existing lines are removed or altered:

   ```ts
   // Absolute x position of the right edge of the green fill (the progress tip)
   const tipX = $derived(boneStart + (value / 100) * boneTotalWidth);

   // Show only when value > 0 AND tipX is not within the dark-body radius of any knob
   const showTip = $derived(value > 0 && !circlePositions.some((cx) => Math.abs(tipX - cx) <= 28));
   ```

2. Verify that `tipX` and `showTip` reference only values already declared above them (`boneStart`, `boneTotalWidth`, `value`, `circlePositions`) — no forward-reference issues.

### Phase 2: Add red rect to SVG markup (Estimated: simple)

**Goal link**: Goal 1, Goal 2, Goal 3  
**Files touched**: `src/lib/components/progress.svelte`  
**Depends on**: Phase 1 (requires `tipX` and `showTip` to be declared)

1. After the closing `/>` of the green fill `<rect>` (the last element in the SVG, currently around line 98), append the following block — no existing markup is removed or altered:

   ```svelte
   <!-- Red tip indicator: visible only when not over a circle knob and value > 0 -->
   {#if showTip}
   	<rect x={tipX - 2} y="0" width="4" height={VIEWBOX_HEIGHT} fill="red" />
   {/if}
   ```

2. Confirm layer order: this block comes **after** the green fill rect, so the red rect renders on top of the green fill (correct visual stacking).
3. Confirm no `clip-path` attribute is present on the red rect (constraint satisfied).

## Testing Strategy

- **Manual verification**:
  - `value=0`, any `steps` → red rect absent from DOM
  - `value=50`, `steps=0` → `tipX=50`, no circles → red rect visible at `x=48`
  - `value=50`, `steps=2` → `tipX≈290`, no circle within ±28 → red rect visible
  - `value≈4.9`, `steps=2` → `tipX≈40` (on left knob, `|40-40|=0 ≤ 28`) → red rect hidden
  - `value≈96`, `steps=2` → `tipX≈546` (on right knob, `|546-540|=6 ≤ 28`) → red rect hidden
  - `value=100`, `steps=2` → `tipX≈574` (`|574-540|=34 > 28`) → red rect visible
- **No unit test infra changes required** — purely visual feature; manual verification against the example behaviour table is sufficient.

## Edge Cases & Risks

| Risk                                                                                       | Impact | Mitigation                                                                                                 |
| ------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------- |
| `steps=1` has a single circle; tip may overlap it for most of the fill range               | Low    | `Math.abs(tipX - cx) <= 28` still applies correctly for one circle — by design                             |
| `value=100`, `steps=0` → `tipX=100` (VIEWBOX_WIDTH), no circles → tip visible at far right | Low    | Correct and expected; no overflow since `overflow="visible"` is already set on the SVG                     |
| Hardcoded `28` overlap threshold must stay in sync with the dark inner body radius         | Low    | Add an inline comment referencing the matching `r=28` circle radius so future maintainers see the coupling |
| Red colour may need theming later                                                          | Low    | `fill="red"` satisfies current spec; can be extracted to a prop in a follow-up if needed                   |

## Open Questions

- None — all requirements confirmed via user Q&A prior to planning.

## Success Criteria

- [ ] `tipX` and `showTip` are declared as `$derived` values in `<script>` immediately after `boneTotalWidth`
- [ ] A `{#if showTip}` block containing the red `<rect>` is appended after the green fill rect in the SVG
- [ ] The red rect has no `clip-path` attribute
- [ ] No existing lines in `progress.svelte` are removed or modified
- [ ] All example behaviour cases in the table above produce the correct visibility outcome
- [ ] No new TypeScript errors introduced
- [ ] No new Svelte compiler warnings introduced
