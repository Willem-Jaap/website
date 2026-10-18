# **Website**

Website & portfolio for Willem-Jaap: v4, a desk you can zoom around. Everything lives on a blue cutting mat: about me, Pixel Perfect and its products, open source work, writing and a few personal props.

You can find the live version of this website at [willemjaap.com](https://willemjaap.com).

### **Quick setup**

```
pnpm i
cp .env.example .env.local
pnpm run dev
```

### **Checks**

```
pnpm lint
pnpm typecheck
pnpm build && pnpm test:e2e
```

The smoke tests (`tests/`) run with Playwright against the production build, on a desktop and a phone viewport. Install the browser once with `pnpm exec playwright install chromium`. CI (`.github/workflows/ci.yml`) runs all of the above on every push.

### **How the desk works**

-   `src/canvas` is the engine: `camera.ts` (pan, zoom, `flyTo`, `useZoomLevel` for semantic zoom), `viewport.tsx` (mouse, trackpad, touch & keyboard) and `mat.tsx` (the cutting mat, drawn as SVG).
-   `fit.ts` holds the pure camera maths. `frame-script.tsx` uses it in a tiny inline script that frames the desk before hydration, so the first paint already shows the right part of it.
-   `src/desk/layout.ts` defines where each region sits on the mat, in centimetres (`CM` world units).
-   Each region lives in its own folder, `src/desk/<region>`, and renders inside `<Region id="...">`. Children are positioned relative to the region in world units.
-   Regions can be linked to: `/#about`, `/#pixelperfect`, `/#github`, `/#writing`, `/#props`. Focusing one (click, deep link or keyboard) is tracked as `Region Focus` in Eyes.
-   Until a region fills the screen, clicking it flies there instead of following links. On phones a fitted region is still too small to read, so tapping an object in it flies to that object (or a readable slice of a wide one) first; the next tap follows its links.
-   `/list` has everything on the desk as a single paper sheet, for screen readers, search engines and browsers without JavaScript. The desk links to it with a skip link and a `<noscript>` note.

Controls: drag or two-finger scroll to pan, mouse wheel / pinch / <kbd>+</kbd> <kbd>-</kbd> to zoom, double-tap or double-click to zoom in on a spot, arrow keys to move, <kbd>0</kbd> for the whole desk. <kbd>Tab</kbd> moves through the links and flies the camera to wherever focus goes.

The sharing image (`src/app/opengraph-image.jpg`) is a render of the whole desk. To update it, frame the desk at zoom 0.2 in a 1200×630 window and take a screenshot.

Eyes only accepts events from the site's own domain, so nothing is sent from `localhost`. Vercel Analytics only loads on Vercel.
