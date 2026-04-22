# UI Redesign Plan

## Objective
Redesign the website UI to feel modern, professional, and responsive across mobile, tablet, and desktop while keeping all existing content, routes, and data sources intact.

## Constraints
- Do not rewrite content in `_pages/`, `_posts/`, or `_data/`.
- Do not change existing permalinks unless explicitly approved.
- Treat Minimal Mistakes as the content engine, not the final visual system.
- Do not execute redesign work until explicitly requested.

## Stepwise Todo Plan

### 1. Capture the baseline
- [ ] Run the site locally and review `/`, `/about/`, `/portfolio/`, `/contact/`, `/year-archive/`, and one blog post.
- [ ] Capture before screenshots at mobile, tablet, and desktop widths.
- [ ] Note layout constraints caused by `author_profile`, stock layouts, and inline styles.

Tests
- [ ] Visual baseline checklist completed for navigation, typography, spacing, image scaling, and form usability.

### 2. Define the visual direction
- [ ] Finalize a single visual direction: premium, editorial, light-first, Apple-adjacent.
- [ ] Define color palette, typography scale, spacing rhythm, border radius, shadows, buttons, and card styles.
- [ ] Define responsive rules for hero sections, app cards, grids, archive lists, and content width.

Tests
- [ ] Design spec reviewed against the goals: modern, professional, flexible for any screen size.

### 3. Plan the implementation structure
- [ ] Map current pages to new custom layouts and includes.
- [ ] Keep source content in `index.md`, `_pages/`, and `_posts/`.
- [ ] Identify shared UI components to extract into `_includes/`.

Likely files
- `assets/css/main.scss`
- `_layouts/`
- `_includes/`
- `index.md`
- `_pages/about.md`
- `_pages/portfolio.md`
- `_pages/contact.md`
- `_pages/year-archive.md`

Tests
- [ ] File-by-file migration map reviewed to confirm no page or route is dropped.

### 4. Add a design-system layer
- [ ] Add custom Sass partials for tokens, base styles, layout primitives, and components.
- [ ] Move visual decisions out of inline styles and into reusable classes.
- [ ] Define CSS variables or Sass tokens for colors, spacing, radii, shadows, and breakpoints.

Suggested structure
- `_sass/custom/_tokens.scss`
- `_sass/custom/_base.scss`
- `_sass/custom/_layout.scss`
- `_sass/custom/_components.scss`

Tests
- [ ] `bundle exec jekyll build`
- [ ] Confirm Sass compiles without warnings that block the build.

### 5. Create custom page shells
- [ ] Add custom layouts for home, standard pages, and archive pages.
- [ ] Reduce dependence on `author_profile: true` for key page structure.
- [ ] Add shared includes for hero, section headers, CTA bands, app cards, and content wrappers.

Suggested layouts
- `_layouts/home-custom.html`
- `_layouts/page-custom.html`
- `_layouts/archive-custom.html`

Tests
- [ ] Each target page renders through the intended layout.
- [ ] Navigation and footer still render correctly.

### 6. Refactor the homepage
- [ ] Replace inline-styled blocks in `index.md` with semantic markup and reusable classes.
- [ ] Build a stronger hero, featured apps section, skills/credibility section, and CTA area.
- [ ] Ensure imagery and badges scale correctly across breakpoints.

Tests
- [ ] Mobile, tablet, and desktop screenshots reviewed.
- [ ] No homepage content is lost or reordered incorrectly.

### 7. Refactor portfolio, about, and contact
- [ ] Move these pages onto the new page shell.
- [ ] Convert the portfolio into clearer case-study sections without changing the copy.
- [ ] Replace inline form styling in the contact page with shared form components.

Tests
- [ ] Portfolio links and images still work.
- [ ] Contact form fields remain readable and usable at all breakpoints.
- [ ] Heading hierarchy remains valid on each page.

### 8. Refactor blog archive and post presentation
- [ ] Improve the archive listing layout and metadata hierarchy.
- [ ] Restyle long-form post pages for readability: width, spacing, headings, images, code blocks, and calls to action.
- [ ] Keep categories, tags, and post navigation intact.

Tests
- [ ] `/year-archive/` lists posts correctly after the redesign.
- [ ] At least one existing post is manually checked for layout regressions.

### 9. Add verification coverage for UI work
- [ ] Keep build validation as the first-line safety check.
- [ ] Add lightweight UI regression coverage for key pages if approved.

Required checks
- [ ] `bundle exec jekyll build`
- [ ] `JEKYLL_ENV=production bundle exec jekyll build`
- [ ] `bundle exec htmlproofer ./_site --disable-external`

Recommended automation backlog
- [ ] Add Playwright screenshot tests for `/`, `/about/`, `/portfolio/`, `/contact/`, and `/year-archive/`.
- [ ] Capture screenshots at representative widths such as `375px`, `768px`, and `1440px`.
- [ ] Fail on obvious layout regressions once stable baselines are approved.

### 10. Run responsive and accessibility QA
- [ ] Validate keyboard navigation, focus states, contrast, heading order, tap targets, and reduced motion behavior.
- [ ] Check image cropping, text wrapping, and button sizing across screen sizes.

Tests
- [ ] Manual QA matrix completed for mobile, tablet, and desktop.
- [ ] Accessibility issues triaged and fixed before final sign-off.

### 11. Final regression and release readiness
- [ ] Compare before and after screenshots for the key pages.
- [ ] Confirm content, routes, analytics, and external links still behave as expected.
- [ ] Split changes into focused commits by milestone.

Tests
- [ ] Clean local build passes.
- [ ] Production build passes.
- [ ] `htmlproofer` passes.
- [ ] Final spot-check completed on all primary pages.

## Definition of Done
- The site keeps its current content and URLs.
- Home, portfolio, about, contact, archive, and post pages share one coherent design language.
- The UI no longer feels like a stock Minimal Mistakes theme.
- The layout works cleanly across mobile, tablet, and desktop.
- Build and verification checks pass.
