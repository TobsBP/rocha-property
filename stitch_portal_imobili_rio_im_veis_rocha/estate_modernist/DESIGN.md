---
name: Estate Modernist
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5b403d'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8f706c'
  outline-variant: '#e4beba'
  surface-tint: '#b91d20'
  primary: '#a20513'
  on-primary: '#ffffff'
  primary-container: '#c62828'
  on-primary-container: '#ffe0dd'
  inverse-primary: '#ffb4ac'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#883600'
  on-tertiary: '#ffffff'
  tertiary-container: '#af4700'
  on-tertiary-container: '#ffe1d4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#93000e'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3000'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system is engineered for a high-end real estate experience that balances institutional trust with modern digital agility. It targets property seekers and owners who value efficiency, transparency, and a premium aesthetic.

The visual style is **Modern / Corporate**, leaning heavily into high-clarity layouts and sophisticated whitespace. It utilizes a refined execution of **Glassmorphism** for navigational elements and **Tonal Layering** for information density. The emotional response is one of "effortless luxury"—where complex real estate data feels organized, accessible, and high-value.

## Colors
The color strategy employs a "Split-Personality" approach to differentiate the user experience based on the theme context:

- **Light Mode (Professional/Search):** Utilizes **Elegant Red (#C62828)** as the primary action color against a **Pure White (#FFFFFF)** backdrop. This creates a high-contrast, authoritative feel suitable for day-time property browsing and administrative tasks.
- **Dark Mode (Premium/Lifestyle):** Transitions to **Modern Orange (#FF6B00)**. This shift creates a high-energy, boutique atmosphere that makes architectural photography pop against the **Deep Black (#121212)** background.

Neutral tones are strictly controlled to maintain a clean appearance, using **#F5F5F5** for surface offsets in Light Mode and **#1E1E1E** for card containers in Dark Mode.

## Typography
The design system exclusively uses **Inter** to ensure maximum legibility across dense data environments and mobile devices. 

- **Headlines:** Use tighter letter-spacing and heavier weights (600-700) to create a strong visual anchor for property titles.
- **Body:** Set with generous line heights to ensure readability during long sessions of comparing property descriptions.
- **Labels:** Utilizing Medium (500) and Semi-Bold (600) weights for metadata (sqft, bedrooms, pricing) to ensure these key metrics are scannable at a glance.

## Layout & Spacing
This design system follows a **Fluid Grid** model with a hard-set maximum width for desktop environments to maintain readability of property listings.

- **Mobile-First:** Layouts are designed for a single-column view with 16px side margins. Cards span the full width of the viewport minus margins.
- **Desktop:** A 12-column grid is utilized. Property cards typically span 3 or 4 columns (3 or 4-up layouts).
- **Rhythm:** An 8px linear scale drives all padding and margin decisions. For internal card spacing, a 16px (stack-md) padding is the standard.

## Elevation & Depth
Depth is signaled through **Soft Shadows** and **Tonal Layers** rather than heavy borders.

- **Level 1 (Surface):** Default background.
- **Level 2 (Cards):** Uses a subtle, extra-diffused shadow (0px 4px 20px rgba(0,0,0,0.05) in light mode) to lift property cards off the surface.
- **Level 3 (Modals/Popovers):** Higher elevation with a more pronounced shadow and a subtle backdrop blur (glassmorphism) to maintain context of the underlying list.
- **In Dark Mode:** Shadows are replaced by slight increases in surface luminosity (moving from #121212 to #1E1E1E) to indicate hierarchy.

## Shapes
Following the "2xl" requirement, the system uses a progressive rounding scale:
- **Small components (Inputs, Chips):** 8px (rounded).
- **Medium components (Buttons, Small Cards):** 12px (rounded-lg).
- **Large components (Property Cards, Modals):** 24px (rounded-2xl).

This generous rounding softens the "corporate" edge of the real estate industry, making the platform feel approachable and contemporary.

## Components
- **Buttons:** Primary buttons use a solid fill (Red in light, Orange in dark) with a subtle 2px vertical offset shadow on hover to simulate a "pressable" tactile feel.
- **Property Cards:** High-end execution featuring a fixed-aspect ratio image (4:3), metadata chips for key stats, and a "Heart" icon positioned in the top-right using a glassmorphism backdrop blur.
- **Search Filters:** A horizontal sticky bar with 8px rounded chips for quick filtering (Price, Type, Beds).
- **Input Fields:** Minimalist style with a 1px border (#E5E5E5) that thickens and changes to the primary color on focus.
- **Chips/Badges:** Used for "New," "Exclusive," or "Price Reduced." These use a low-opacity tint of the primary color with bolded text for visibility without visual clutter.