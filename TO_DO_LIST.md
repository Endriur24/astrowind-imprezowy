# Migration Plan: Old Website to AstroWind

## 1. Project Configuration & Setup
- [x] **Update Site Metadata**: Edit `src/config.yaml` to set the correct site name, description (Polish), language (`pl`), and verification IDs from the old site (if any).
- [x] **Navigation Update**: Edit `src/navigation.ts` to add the "BLOG" link to the header and footer menus.
- [x] **Favicons**: Ensure favicons in `src/assets/favicons` match the brand.
- [x] **Robots.txt**: Verify `public/robots.txt` allows indexing and points to the sitemap.
- [x] **Analytics**: Integrate Google Analytics or similar in `src/components/common/Analytics.astro` or `config.yaml`.

## 2. Asset Management
- [x] **Image Migration**: Move images from `public/assets/` to `src/assets/images/` to enable Astro's image optimization logic.
    - Check `Old_website_reference_no_delete/public/assets/img` for `fb_share.webp` and other meta images.
- [x] **Asset Verification**: Compare `Old_website_reference_no_delete/public/assets/img` with the current assets to ensure no important images are missing.

## 3. Blog Integration ("Plog")
- [x] **Activate Blog**: Ensure `blog` is enabled in `src/config.yaml` (already true).
- [x] **Create Initial Content**: Create a welcome post in `src/data/post/` to verify the blog works.
- [x] **Migrate News (if any)**: If the old site had news/articles, migrate them to Markdown files in `src/data/post/`.

## 4. Page Refactoring & Content Matching
The goal is to replace raw HTML with AstroWind widgets (Components) for a consistent look and easier maintenance.

### Main Pages
- [x] **Strona Główna (`src/pages/index.astro`)**:
    - Review content against old `index.html`.
    - **Hero**: Ensure the copy and background image mimic the old site.
    - **Logos/Partners**: If old site had partner logos, use the `Brands` widget.
    - **Carousel**: The old site had a carousel. AstroWind suggests using `Features2` or a grid. If a slider is strictly required, implement a `Carousel` widget using Swiper.js to replace the static grid.
- [x] **Create New Widget (`src/components/widgets/ImageGrid.astro`)**:
    - Create a reusable component using `WidgetWrapper` and `ItemGrid`-style logic but with image support.
    - Props: `items` (array with `image`, `title`, `description`, `link`), `title`, `subtitle`.
    - Use `src/components/common/Image.astro` for optimized image rendering.
- [x] **Oferta (`src/pages/oferta.astro`)**:
    - Refactor the raw HTML grid to use the new `ImageGrid` widget.
    - Example usage: `<ImageGrid items={[{ title: 'Studniówka', image: '...', link: '...' }]} />`
- [x] **Portfolio (`src/pages/portfolio.astro`)**:
    - Implement the portfolio by organizing images into categories using the new `ImageGrid` widget.
    - Each section (e.g. "Studniówka", "Koncerty") becomes an instance of `ImageGrid`.
    - **Lightbox**: Consider integrating a lightbox library (like `baguetteBox` or `photoswipe`) so clicking an image opens it in full screen, mimicking the old site's behavior.
- [x] **FAQ (`src/pages/faq.astro`)**: Ensure it uses the `FAQs` widget and contains all questions from `Old_website_reference_no_delete/public/faq.html`.
- [x] **Kontakt (`src/pages/kontakt.astro`)**:
    - Refactor to use the `Contact` widget or style the form consistently with Tailwind.
    - **Backend**: The old site used "Smart Forms" (Bootstrap Studio). Plan to migrate to a service like Formspree, Netlify Forms, or a custom API endpoint, as the old `data-bss-recipient` attribute will likely not work without the specific Bootstrap Studio script.
- [x] **Create Missing Page**: Create `src/pages/pracuj-z-nami.astro` based on `Old_website_reference_no_delete/public/pracuj-z-nami.html`.

### Subpages (Oferta)
Refactor these specific pages to replace raw HTML with standard AstroWind widgets:
- **Header**: Use `Hero` widget.
- **Content**: Use `Content` widget for text+image sections (use `isReversed` for alternating layout).
- **Features**: Use `Features2` or `Steps` for listing benefits/process.
- **Contact**: Use `CallToAction` or specific `Contact` widget.

Specific pages to refactor:
- [x] `src/pages/oferta/fotograf-eventowy-krakow.astro`
- [x] `src/pages/oferta/fotograf-klubowy-koncertowy-krakow.astro`
- [x] `src/pages/oferta/fotograf-na-konferencje-krakow.astro`
- [x] `src/pages/oferta/fotograf-na-studniowke.astro`
- [x] `src/pages/oferta/fotograf-na-urodziny-krakow.astro`
- [x] `src/pages/oferta/fotograf-na-wydarzenia-studenckie.astro`
- [x] `src/pages/oferta/fotograf-slubny-krakow.astro`
- [x] `src/pages/oferta/dodatkowe-uslugi-fotograficzne.astro`
- [x] `src/pages/oferta/reportaze-i-projekty-specjalne.astro`
- [x] `src/pages/oferta/streaming-video.astro`
- [x] `src/pages/oferta/szkolenia-foto-wideo.astro`
- [x] `src/pages/oferta/video-eventowe.astro`
- [x] `src/pages/oferta/zdjecia-live.astro`

## 5. Verification & Launch
- [x] **Redirects**: Ensure old .html URLs redirect to new URLs (add to `vercel.json` or `_redirects` if deploying to Vercel/Netlify).
- [x] **Link Checking**: Verify all internal links (buttons, nav items) work.
- [x] **Mobile Responsiveness**: Check pages on mobile view (AstroWind widgets handle this well by default).
- [x] **SEO Check**: Ensure `metadata` objects in each page file are correctly populated from the old site's meta tags (OpenGraph, description).
- [x] **Performance**: Run Lighthouse to verify Performance/SEO/Accessibility scores are optimal.
