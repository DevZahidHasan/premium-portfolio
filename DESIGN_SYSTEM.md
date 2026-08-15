# DESIGN SYSTEM

# ZAHID HASAN PREMIUM PORTFOLIO

---

# 1. DESIGN PRINCIPLES

The design system follows five principles:

1. Typography first
2. Space creates luxury
3. Motion creates continuity
4. Interaction creates personality
5. Restraint creates sophistication

---

# 2. TYPOGRAPHY

Use a premium contemporary sans-serif display typeface.

Recommended candidates:

- Geist
- Inter Tight
- Neue Montreal-like alternative
- Satoshi
- Manrope

Select the final typeface after comparing it against the reference.

Do not use a font simply because it is popular.

---

# 3. TYPE SCALE

Use fluid typography.

Display:

clamp(4rem, 11vw, 11rem)

Hero:

clamp(3.5rem, 9vw, 9rem)

Section heading:

clamp(3rem, 7vw, 7rem)

Project heading:

clamp(2.5rem, 6vw, 6rem)

Body:

clamp(1rem, 1.3vw, 1.35rem)

Small:

0.75rem - 0.9rem

These are starting values.

Tune visually.

---

# 4. LINE HEIGHT

Display:

0.85 - 0.95

Large heading:

0.9 - 1.0

Body:

1.4 - 1.7

Avoid excessive line-height in large editorial headings.

---

# 5. COLOR

Base:

Near-black background

Off-white foreground

Neutral gray secondary text

One accent color

Avoid overly saturated gradients.

---

# 6. SPACING

Use a fluid spacing system.

Primary spacing should be based around:

0.5rem
1rem
1.5rem
2rem
3rem
4rem
6rem
8rem
12rem
16rem

Large editorial sections may use:

12rem+
 
depending on viewport.

Whitespace is a major part of the visual identity.

---

# 7. GRID

Desktop:

12-column grid

Tablet:

8-column grid

Mobile:

4-column grid

Use asymmetry intentionally.

Do not force every section into identical alignment.

---

# 8. CONTAINERS

Avoid overly narrow containers.

Use:

width: min(100% - responsive padding, 1600px)

Large screens should still feel spacious.

---

# 9. BUTTONS

Buttons should feel tactile.

Minimum touch target:

44x44px

Hover should use:

- magnetic movement
- subtle scale
- background transition
- cursor interaction

Avoid excessive pill-shaped UI unless visually justified.

---

# 10. LINKS

Links should have:

- strong hover state
- animated underline or displacement
- clear focus state
- cursor interaction on desktop

---

# 11. IMAGES

Images should not always appear inside cards.

Use:

- full-width imagery
- cropped imagery
- oversized project previews
- layered composition
- viewport-based reveals

---

# 12. BORDERS

Use borders sparingly.

Prefer:

1px subtle neutral borders.

Avoid card-heavy UI.

---

# 13. RADIUS

Use minimal corner rounding.

The design should not look like a SaaS dashboard.

Use radius only when it improves the composition.

---

# 14. SHADOWS

Use very few shadows.

Depth should primarily come from:

- scale
- position
- contrast
- motion
- overlap

---

# 15. RESPONSIVE BREAKPOINTS

Mobile:

< 768px

Tablet:

768px - 1023px

Desktop:

1024px+

Large:

1440px+

Ultra-wide:

1920px+

---

# 16. ACCESSIBILITY

All interactive elements:

minimum 44px touch target.

Focus states must be visible.

Text contrast must remain accessible.

---

# 17. REDUCED MOTION

When:

prefers-reduced-motion: reduce

Use:

- no large transforms
- no continuous loops
- no unnecessary parallax
- minimal transitions

Content must remain fully accessible.