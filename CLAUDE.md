# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A React UI prototype for **Zepto Comfort Mode** — a late-night emotional commerce interface with comfort-focused product recommendations, one-tap reorder, and delivery confidence indicators. This is a standalone component built as a product design artifact, not a deployed app.

## Project Structure

```
zepto_blinkit/
├── zepto-comfort-mode.jsx         # Single self-contained React component (~600 lines)
└── Zepto Emotional Commerce Prd Systems Thinking (1).docx  # PRD / business rationale
```

## Running the Component

This is a **standalone JSX file with no local build setup**. To run it, integrate into any React scaffold:

```bash
# Option 1: Create React App
npx create-react-app demo && cd demo
cp ../zepto-comfort-mode.jsx src/ZeptoComfortMode.jsx
# Import and render in src/App.js

# Option 2: Vite
npm create vite@latest demo -- --template react && cd demo && npm install
npm install lucide-react
# Copy component, import in App.jsx

# Run dev server
npm run dev       # Vite
npm start         # CRA
```

**Required dependency:** `lucide-react` (icons — ShoppingCart, Clock, Star, Zap, Shield, RefreshCw).

## Architecture

**Single component, no external state management.** Everything lives in `ZeptoComfortMode`:

```
ZeptoComfortMode
├── State: currentTime (1s interval), isComfortMode, selectedProduct, cart[]
├── Data: comfortShelf.items[] (products), previousComfortOrders[] (reorder history)
├── Logic: addToCart(), reorderPrevious(), getETAMessage() (time-aware ETA)
└── UI Sections: Header → ETA Banner → Quick Reorder → Product Shelf → Toast
```

**Styling:** Inline CSS-in-JS only. CSS keyframe animations (`pulse`, `slideUp`) are injected via a `<style>` tag at the bottom of the component. No external CSS file.

**Theme:** Dark purple midnight (`#1a0d2e` → `#0a0416`), Zepto brand purple (`#8B1BFF`), success green (`#00d97e`).

## Key Design Decisions (from PRD)

- ETA changes dynamically: 14–16 min (night) vs. 10–12 min (day) via `getETAMessage()`
- Frozen-safe badge appears only on `item.frozenSafe === true` products
- Hover state managed via `onMouseEnter/Leave` on inline style objects (no CSS classes)
- Toast auto-dismisses; `selectedProduct` state drives toast visibility
- No backend — all product data and order history are hardcoded mock objects

## Extending This Prototype

When adding products, match this shape:
```js
{ id, name, price, image (emoji), frozenSafe (bool), tags (string[]) }
```

When adding reorder entries, match:
```js
{ id, name, items (string[]), total, lastOrdered (string), image (emoji) }
```
