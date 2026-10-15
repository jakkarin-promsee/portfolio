# Outdoor Calisthenics Gym

## What the project contains

This is a functional design and engineering research package for an outdoor training space in a private garden, rather than a software application or a finished installation. The proposed site is about 6 × 5 m, with roughly 5 × 4 m available for equipment. The intended users are one adult and a young child. The package considers four steel structures and an EPDM/SBR impact-absorbing floor as one system: the equipment dimensions, fall zones, materials, corrosion protection, foundations, and handover obligations are connected rather than separate drawings.

The pull-up structure uses three posts with adult and child bars at different heights. A two-post snake-bar structure pairs a straight structural member with a wavy grip path and side grips. The dip structure uses three inverted-U frames to provide two grip widths and short C-shaped handles. The longest element is a five-zone monkey/flying bar: low entry, an angled climb, a flat section, and a higher inclined section ending at about 2.70 m. The design also assigns thicker rubber under the highest fall zones instead of treating one floor thickness as adequate everywhere.

## From geometry to reviewable specifications

Blender models show the overall layout and individual structures. The formal document set then translates that geometry into dimensions, tube sections, grip sizes, assembly details, and a preliminary bill of materials. The English and Thai sets contain an index, handover summaries, a detailed design specification, load and requirement analysis, verification and foundation summary, source research, connection research, and role/liability documents. The Thai set is described in the repository as the source of truth. Images and PDFs are presentation aids; the written specifications govern dimensions.

The preliminary engineering work starts from EN 16630 outdoor fitness equipment loads, with EN 1176 considered for child safety. It calculates first-order bending and deflection demands for bars, posts, braces, anchors, and foundations. The verification summary reports that the specified members do not yield under its assumptions, but several margins are limited. It singles out the 2.70 m monkey-bar post's triangular brace, the 1.5 m high pull-up bar, cantilevered snake grips, dip-frame lateral stability, dynamic-load welds, and flooring under fall zones. A detailed foundation proposal uses steel base plates, M12 anchors, and a C20/25 concrete slab; these are proposals for engineer review, not construction authorization.

The assembly study addresses a practical conflict: fully welding on site can damage protective galvanizing, while transporting the entire gym as one welded object is impractical. Its proposed sequence is to shop-weld manageable subassemblies, galvanize them as complete pieces, and bolt them together on site. The design documents consider end plates, bolt sizes, vent holes in hollow members, and inspection of welds and anchors.

## Scope and status

This is a draft, first-order functional design prepared by a researcher who explicitly does not claim a professional engineering license. The repository does not show a completed build or certified calculation. A licensed engineer is expected to recalculate and approve the structure, verify the actual chosen materials and fall-surface product, inspect the construction, and authorize use, especially by a child. That boundary is a central part of the work: the project packages useful design research while making assumptions and handover responsibilities visible.

## Evidence and open questions

- `project/calisthenic-outdoor-design/README.md` — overview, equipment, engineering basis, status, and repository map.
- `project/calisthenic-outdoor-design/final1-en/spec.full.md` and `spec.requirement.md` — proposed geometry, materials, loads, and load paths.
- `project/calisthenic-outdoor-design/final1-en/spec.summary.md` — preliminary verification, watch points, foundations, and limits.
- `project/calisthenic-outdoor-design/final1-en/toc.md` and `final1-en/research.connection-assembly.md` — document roles and assembly rationale.
- `project/calisthenic-outdoor-design/models/final1-blender/` — the final Blender model set.
- Open question for the owner: What personal circumstance initiated this design, and did any engineer or builder later review or construct it? The repository establishes the design package, not a built outcome.
