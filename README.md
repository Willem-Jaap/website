# **Website**

Website & portfolio for Willem-Jaap: v4, a desk you can zoom around. Everything lives on a blue cutting mat: about me, Pixel Perfect and its products, open source work, writing and a few personal props.

You can find the live version of this website at [willemjaap.com](https://willemjaap.com).

### **Quick setup**

```
pnpm i
pnpm run dev
```

### **How the desk works**

-   `src/canvas` is the engine: `camera.ts` (pan, zoom, `flyTo`, `useZoomLevel` for semantic zoom), `viewport.tsx` (mouse, trackpad, touch & keyboard) and `mat.tsx` (the cutting mat, drawn as SVG).
-   `src/desk/layout.ts` defines where each region sits on the mat, in centimetres (`CM` world units).
-   Each region lives in its own folder, `src/desk/<region>`, and renders inside `<Region id="...">`. Children are positioned relative to the region in world units.
-   Regions can be linked to: `/#about`, `/#pixelperfect`, `/#github`, `/#writing`, `/#props`.

Controls: drag or two-finger scroll to pan, mouse wheel / pinch / <kbd>+</kbd> <kbd>-</kbd> to zoom, arrow keys to move, <kbd>0</kbd> for the whole desk.
