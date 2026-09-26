# MotionFrame — Performance-Aware Cinematic Video Hero

[![Quality](https://github.com/kooroosh1363/website-video-back/actions/workflows/quality.yml/badge.svg)](https://github.com/kooroosh1363/website-video-back/actions/workflows/quality.yml)

MotionFrame modernizes the original 2023 video-background landing page into a production-minded cinematic hero focused on **adaptive media delivery**.

## What changed

The original project:

- shipped a ~36 MB MP4 as an unconditional background asset
- used autoplay directly in markup
- had no reduced-motion behavior
- had no Save-Data behavior
- had no play/pause control
- used placeholder `href="#"` navigation
- misspelled `playsinline`
- contained media queries targeting the wrong video class
- loaded external Google Fonts
- had no automated tests, asset budgets, build, or CI

The maintained version adds:

- lightweight decorative MP4
- lightweight poster image
- `preload="none"`
- conditional loading from JavaScript
- `prefers-reduced-motion` support
- Save-Data support
- 2G/slow-2G protection
- explicit play/pause control
- accessible real section navigation
- poster/CSS fallback that works without video
- responsive layout
- automatic light/dark support for content sections
- zero runtime dependencies
- unit-tested media policy
- static accessibility checks
- asset-budget enforcement
- deterministic build
- GitHub Actions quality gate

## Delivery policy

The background video is treated as optional enhancement.

```text
reduced motion?  -> do not request video
Save-Data?       -> do not request video
2G / slow-2G?    -> do not request video
otherwise        -> load and attempt muted playback
```

The page remains readable and visually complete when motion is disabled.

## Asset budget

The original MP4 was approximately 36 MB.

The maintained repository enforces CI limits:

- video: under 250 KB
- poster: under 80 KB

The current generated ambient asset is intentionally far below those limits.

## Why not unconditional autoplay?

A background video can be decorative while still consuming substantial bandwidth and motion attention.

MotionFrame does not put `autoplay` in HTML. JavaScript first evaluates user/device preferences and only then requests the video source.

## Architecture

```text
media-policy.js
    │
    ├── reduced-motion decision
    ├── Save-Data decision
    └── connection decision
    │
    ▼
main.js
    ├── conditional source attachment
    ├── playback attempt
    └── accessible play/pause control
    │
    ▼
poster + CSS fallback + optional MP4
```

The policy is pure and independently tested.

## Local run

Because the app uses ES modules, serve the repository over HTTP:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Quality checks

No npm dependencies need to be installed.

```bash
npm run check
```

This runs:

- JavaScript syntax checks
- Node built-in unit tests
- static accessibility/media checks
- asset-budget checks
- deterministic static build

## Tests

```bash
npm test
```

The tests verify:

- normal connections allow video
- reduced-motion prevents video
- Save-Data prevents video
- 2G and slow-2G prevent video
- control labels match playback state

## Accessibility

MotionFrame includes:

- skip link
- semantic navigation with real anchors
- explicit video play/pause control
- visible focus indicators
- no essential information inside decorative video
- reduced-motion fallback
- responsive layout

## Scope

This is a static landing-page engineering demo. It does not include analytics, authentication, form submission, CMS integration, or backend services.

## GitHub Pages

A deployment workflow is included. GitHub Pages must first be enabled once:

1. Open **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Open **Actions → Deploy Pages**
4. Run the workflow manually

## License

No license is currently included.
