# Foma portal source overlays (portVersion 2)

R03 diagram corrections and responsive layouts are maintained in this repository.
`pages/` contains the four bilingual portal pages whose diagrams differ from the legacy
translations in foma-portal. The original Russian lesson pages remain at the repository root,
including their school-only sections. No school documents are added to these overlays.

For each overlay, `<page>.base` is the SHA-256 of the corresponding Russian HTML after
`cs-port-lab.mjs` removes school sections. The port refuses stale translations and old/missing
`foma-port.json` markers before it changes generated files. Do not update a hash without
reviewing the source change and updating the translation.

From an isolated foma-portal checkout:

```sh
FOMACS_DIR=/path/to/FomaCS node scripts/cs-port-lab.mjs
```

Run responsive renderer regressions in this repository with:

```sh
node --test tests/*.test.*
```

The desktop rendering is retained; phone flows use a 280-unit vertical canvas. Tables,
network graphs and pipeline timelines keep their geometry and scroll inside a labelled frame.
Browser verification at 390 and 1280 pixels is still required after changing diagrams.
