# Zautomatyzowane generowanie wariantów obrazów

## Przegląd

Projekt został zaktualizowany, aby wykorzystywać wbudowany w Astro komponent `<Picture />`, który automatycznie generuje wiele formatów obrazów (AVIF i WebP) zamiast ręcznego tworzenia wariantów.

## Co zostało zrobione

### 1. Zaktualizowano Astro do wersji 5.17.2

Astro zostało zaktualizowane do najnowszej wersji, która wspiera eksperymentalną funkcję `responsiveImages`.

### 2. Włączono responsive images

W pliku `astro.config.ts` dodano konfigurację:
```typescript
image: {
  domains: ['cdn.pixabay.com'],
  experimentalLayout: 'responsive',
},

experimental: {
  responsiveImages: true,
},
```

### 3. Zaktualizowano konfigurację formatów

W pliku `src/utils/images-optimization.ts` zmieniono domyślne formaty na:
- AVIF (najlepsza kompresja, nowoczesne przeglądarki)
- WebP (dobra obsługa w większości przeglądarek)

## Jak używać natywnego komponentu Picture

### Podstawowe użycie

```astro
---
import { Picture } from 'astro:assets';
import myImage from '~/assets/my-image.jpg';
---

<Picture
  src={myImage}
  alt="Opis obrazka dla dostępności"
  formats={['avif', 'webp']}
/>
```

### Z ustawieniem responsive layout

Dzięki włączonej funkcji responsiveImages, możesz użyć prop `layout`:

```astro
<Picture
  src={myImage}
  alt="Opis obrazka"
  layout="responsive"
  formats={['avif', 'webp']}
/>
```

### Zaawansowane opcje

```astro
<Picture
  src={myImage}
  alt="Opis obrazka"
  width={1200}
  height={800}
  layout="full-width"
  formats={['avif', 'webp']}
  fallbackFormat="png"
  quality={90}
  loading="eager"
  class="my-image-class"
  pictureAttributes={{ style: "background-color: red;" }}
/>
```

### Dostępne właściwości

| Właściwość | Typ | Domyślna wartość | Opis |
|-----------|------|------------------|------|
| `src` | string \| ImageMetadata | - | Ścieżka do obrazka (wymagane) |
| `alt` | string | - | Tekst alternatywny (wymagany) |
| `width` | number | - | Szerokość obrazka |
| `height` | number | - | Wysokość obrazka |
| `formats` | array | `['webp']` | Formaty do wygenerowania |
| `fallbackFormat` | string | `'png'` \| `'jpg'` | Format fallback |
| `quality` | number | - | Jakość obrazu (0-100) |
| `layout` | `'responsive'` \| `'fixed'` \| `'full-width'` | Rodzaj layoutu (gdy włączono responsiveImages) |
| `loading` | `'lazy'` \| `'eager'` | `'lazy'` | Sposób ładowania |
| `class` | string | - | Klasa CSS |
| `style` | string | - | Style inline |
| `pictureAttributes` | object | - | Atrybuty dla zewnętrznego elementu `<picture>` |

## Jak to działa

1. **Automatyczne formaty**: Komponent automatycznie generuje obrazy w formatach AVIF i WebP
2. **Fallback**: Przeglądarka automatycznie wybiera najlepszy obsługiwany format
3. **Responsive layout**: Gdy włączono `responsiveImages`, komponent automatycznie generuje srcset i sizes
4. **Optymalizacja**: Obrazy są optymalizowane w czasie budowania

### Wynik HTML

Komponent generuje HTML podobny do:

```html
<picture>
  <source srcset="/_astro/image.hash.avif" type="image/avif" />
  <source srcset="/_astro/image.hash.webp" type="image/webp" />
  <img
    src="/_astro/image.hash.png"
    width="1200"
    height="800"
    decoding="async"
    loading="lazy"
    alt="Opis obrazka"
  />
</picture>
```

### Z Responsive Images

Gdy funkcja `responsiveImages` jest włączona, HTML będzie zawierał srcset:

```html
<picture>
  <source
    srcset="/_astro/image.hash1.avif 640w, /_astro/image.hash2.avif 750w, /_astro/image.hash3.avif 800w"
    type="image/avif"
  />
  <source
    srcset="/_astro/image.hash1.webp 640w, /_astro/image.hash2.webp 750w, /_astro/image.hash3.webp 800w"
    type="image/webp"
  />
  <img
    src="/_astro/image.hash.png"
    srcset="/_astro/image.hash1.png 640w, /_astro/image.hash2.png 750w, /_astro/image.hash3.png 800w"
    sizes="(min-width: 800px) 800px, 100vw"
    alt="Opis obrazka"
    data-astro-image="responsive"
  />
</picture>
```

## Migracja z ręcznych wariantów

### Przed (ręczne warianty)

```astro
<img src="/images/image-small.jpg" srcset="/images/image-small.jpg 640w, /images/image-large.jpg 1200w" alt="..." />
```

### Po (automatyczne warianty)

```astro
---
import { Picture } from 'astro:assets';
import myImage from '~/images/image.jpg';
---

<Picture src={myImage} alt="..." formats={['avif', 'webp']} />
```

## Przykłady zastosowań

### Obraz pełnoekranowy

```astro
<Picture
  src={heroImage}
  alt="Hero image"
  layout="full-width"
  formats={['avif', 'webp']}
  loading="eager"
/>
```

### Obraz w galerii

```astro
<Picture
  src={galleryImage}
  alt="Gallery photo"
  width={800}
  height={600}
  formats={['avif', 'webp']}
  loading="lazy"
/>
```

### Obraz w gridzie (responsive)

```astro
<Picture
  src={gridImage}
  alt="Grid image"
  layout="responsive"
  formats={['avif', 'webp']}
  loading="lazy"
/>
```

## Korzyści

1. ✅ **Mniej pracy**: Nie trzeba ręcznie tworzyć wariantów
2. ✅ **Lepsza optymalizacja**: Automatyczne formaty AVIF i WebP
3. ✅ **Responsive**: Automatyczne warianty dla różnych ekranów (gdy włączono responsiveImages)
4. ✅ **Fallback**: Automatyczny fallback dla starszych przeglądarek
5. ✅ **Jedno źródło**: Jeden plik źródłowy, wszystkie warianty generowane automatycznie
6. ✅ **Natywne rozwiązanie**: Używanie oficjalnie wspieranego komponentu Astro

## Integracja z istniejącymi komponentami

Można stopniowo migrować istniejące komponenty używające zwykłych `<img>` tagów na `<Picture>`:

### Stary sposób
```astro
<img src="/image.jpg" alt="..." width={1200} height={800} />
```

### Nowy sposób - z automatycznymi formatami
```astro
---
import { Picture } from 'astro:assets';
import myImage from '~/image.jpg';
---

<Picture src={myImage} alt="..." formats={['avif', 'webp']} />
```

## Wskazówki

- Używaj `loading="eager"` dla obrazów "above the fold" (widocznych bez przewijania)
- Używaj `loading="lazy"` dla obrazów poniżej "fold"
- Dostosuj `quality` w zależności od potrzeb (wyższa jakość = większe pliki)
- Dla fotografii używaj `quality=80-90`, dla grafiki prostszej `quality=70-80`
- Używaj `layout="full-width"` dla obrazów pełnoekranowych
- Używaj `layout="responsive"` dla obrazów adaptujących się do kontenera

## Testowanie

Projekt został pomyślnie zbudowany z `npm run build` i jest gotowy do użycia w produkcji z nową konfiguracją responsiveImages.