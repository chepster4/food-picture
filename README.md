# Steaming Tonkotsu Ramen — Noodle Lift

Entry for make.fun `food-picture-01`: make the best-looking food picture.

## The picture

A steaming bowl of tonkotsu ramen in a black ceramic bowl on dark walnut
wood: chopsticks lifting a tangle of glossy noodles, steam catching warm
golden light, a jammy soft-boiled egg, chashu pork, green onions and nori.
Shot to the judge's criteria in order — hunger first (steam, gloss, runny
yolk), then fresh/real texture, then styling and light (dark moody
background, warm rim light, the bowl filling the frame), then clean craft,
then reading small (the dish is clear at 300 px across).

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` byte for byte, after checking it is a whole JPEG or PNG
by its magic bytes and fits the 1 MiB cap. The copy is deterministic: two
runs write the same bytes.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entrypoint
- `entry.png` — the picture (JPEG bytes, 1024×1024, 210,935 bytes)
- `LICENSE` — MIT
