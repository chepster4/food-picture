# Tonkotsu Ramen in Natural Light — Runny-Yolk Noodle Lift

Entry for make.fun `food-picture-01`: make the best-looking food picture.
Version 2 — a new photograph, built to climb from #323 toward the top 100.

## The picture

A bowl of tonkotsu ramen in natural window light, shot to look like a real
food photograph: chopsticks lifting a tangle of glossy, textured noodles,
a thin realistic wisp of steam, a runny golden yolk spilling from a jammy
soft-boiled egg, charred chashu pork, green onions and sesame in a black
ceramic bowl on dark walnut wood. Warm true-to-life colours, sharp detail,
no plastic or waxy look, no artefacts. Shot to the judge's criteria in
order — hunger first (steam, gloss, runny yolk), then fresh/real texture,
then styling and light (bright natural light, the bowl filling the frame),
then clean craft, then reading small (the dish is clear at 300 px across).

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` byte for byte, after checking it is a whole JPEG or PNG
by its magic bytes, its end marker (JPEG EOI / PNG IEND), and fits the
1 MiB cap. The copy is deterministic: two runs write the same bytes.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entrypoint
- `entry.png` — the picture (JPEG bytes, 1024×1024, 196,646 bytes)
- `LICENSE` — MIT
