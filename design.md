# Design Base Plan - Yash Bhardwaj Portfolio Website

## Overview
This document captures the complete design system, layout specifications, typography, colors, spacing, and UX patterns for the minimalist portfolio website.

## Color Palette

### Primary Colors
- **Background**: `#ffffff` (White)
- **Primary Text**: `#111111` (Near black)
- **Secondary Text**: `#374151` (Dark gray)
- **Tertiary Text**: `#6b7280` (Medium gray)
- **Muted Text**: `#9ca3af` (Light gray)
- **Light Text**: `#d1d5db` (Very light gray)

### Accent Colors
- **Border/Divider**: `#e5e7eb` (Light gray border)
- **Hover Underline**: `#e5e7eb` → `#111111` (transitions on hover)
- **Loader Border**: `#f3f3f3` (light) → `#333333` (dark)
- **Weather Icon**: `#fbbf24` (Yellow-500 for sun icon)

### Project Colors (Tailwind Classes)
- Blue: `bg-blue-600`
- Cyan: `bg-cyan-200`
- Orange: `bg-orange-100`
- Black: `bg-black`
- Gradient (Spotify): `bg-gradient-to-br from-purple-400 to-pink-400`

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold)
- **Fallback**: System sans-serif
- **Font Smoothing**: `-webkit-font-smoothing: antialiased`

### Type Scale

#### Headings
- **H1 (Post Title)**: `1.5rem` (24px), `font-weight: 600`, `letter-spacing: -0.02em`, `color: #111`
- **H2 (Section Headings)**: `1.25rem` (20px), `font-weight: 500`, `color: #111`
- **H3 (Section Labels)**: `0.75rem` (12px), `font-weight: 500`, `text-gray-400`, `tracking-widest`, `uppercase`

#### Body Text
- **Intro Text**: `1rem` (16px) to `1.5rem` (24px) on desktop, `font-weight: 400`, `line-height: 1.6-1.8`, `color: #374151`
- **Body Paragraphs**: `0.9375rem` (15px), `line-height: 1.8`, `color: #374151`
- **Summary Items**: `0.9375rem` (15px), `line-height: 1.75`, `color: #6b7280`
- **Project Descriptions**: `0.9375rem` (15px), `color: #6b7280`
- **Writing List Items**: `0.9375rem` (15px), `color: #6b7280`

#### Metadata & Small Text
- **Date (Monospace)**: `0.75rem` (12px), `font-mono`, `color: #9ca3af`
- **Header Name**: `0.875rem` (14px), `font-weight: 500`, `tracking-wide`
- **Navigation Links**: `0.875rem` (14px), `color: #6b7280`
- **Clock/Weather**: `0.875rem` (14px), `font-mono`, `color: #6b7280`
- **Spotify Text**: `0.875rem` (14px), `color: #6b7280`

### Prose Styles (Post Content)
- **Paragraphs**: `margin-bottom: 1.5rem`, `line-height: 1.8`, `color: #374151`
- **Links**: `text-decoration: underline`, `text-decoration-color: #e5e7eb`, `text-underline-offset: 4px`, `color: #111`, `transition: all 0.2s`
- **Links Hover**: `text-decoration-color: #111`
- **Blockquotes**: `border-left: 2px solid #e5e7eb`, `padding-left: 1rem`, `font-style: italic`, `color: #6b7280`
- **Lists**: `list-style-type: disc`, `padding-left: 1.5rem`, `margin-bottom: 1.5rem`

## Layout

### Container
- **Max Width**: `max-w-4xl` (896px)
- **Horizontal Padding**: `px-5` (1.25rem / 20px)
- **Vertical Padding (Main)**: `pt-12 md:pt-20` (48px mobile, 80px desktop), `pb-20` (80px)

### Header
- **Position**: `sticky top-0 z-50`
- **Background**: `bg-white/95 backdrop-blur-sm`
- **Border**: `border-b border-transparent` (subtle separation)
- **Padding**: `px-5 py-4` (20px horizontal, 16px vertical)
- **Layout**: Flexbox, `justify-between`, `items-center`

### Home Page Layout

#### Intro Section
- **Layout**: `flex flex-col-reverse md:flex-row`, `justify-between`, `gap-12` (48px)
- **Content Width**: `w-full md:w-2/3` (66.67% on desktop)
- **Image Width**: `w-full md:w-1/3` (33.33% on desktop)
- **Image Size**: `w-32 h-32 md:w-64 md:h-64` (128px mobile, 256px desktop)
- **Image Style**: `rounded-xl`, `shadow-sm`, `grayscale hover:grayscale-0`, `transition-all duration-700`
- **Spacing**: `mb-20` (80px) after intro section

#### Summary Section
- **Label**: `text-xs`, `font-medium`, `text-gray-400`, `tracking-widest`, `uppercase`, `mb-6`
- **List**: `space-y-3` (12px between items)
- **List Items**: `flex items-start gap-3`
- **Bullet**: `w-1.5 h-1.5`, `rounded-full`, `bg-gray-300`, `mt-2.5` (aligned with text)

#### Social Links Section
- **Layout**: `flex flex-wrap items-center gap-6`
- **Icon Group**: `flex gap-5`
- **Divider**: `h-4 w-px bg-gray-200` (vertical line)
- **Spotify Widget**: `flex items-center gap-2.5`
- **Spotify Icon**: `w-5 h-5 rounded-full`, `animate-pulse`

#### Projects & Writing Grid
- **Layout**: `grid grid-cols-1 md:grid-cols-2`, `gap-16 md:gap-24` (64px mobile, 96px desktop)
- **Section Label**: `text-xs`, `font-medium`, `text-gray-400`, `tracking-widest`, `uppercase`, `mb-8`
- **Projects List**: `space-y-10` (40px between projects)
- **Writing List**: `space-y-4` (16px between items)

#### Project Card
- **Layout**: `flex items-center gap-3` (icon + title)
- **Icon**: `w-6 h-6 rounded-full`, `flex items-center justify-center`, `text-[10px] text-white font-bold`
- **Title**: `text-[15px] font-medium text-black`, hover underline
- **Description**: `text-[15px] text-gray-500`, `pl-9` (aligned with title)

#### Writing Item
- **Layout**: `flex gap-6 items-baseline`
- **Date**: `text-xs text-gray-400 font-mono w-16 flex-shrink-0`
- **Title**: `text-[15px] text-gray-600`, hover to black with underline

### Post Reader Layout
- **Back Button**: `flex items-center gap-2`, `text-sm text-gray-400`, hover to black
- **Article**: `max-w-2xl` (672px)
- **Date**: `text-xs text-gray-400 font-mono mb-4`
- **Content**: Prose styles applied

## Spacing System

### Padding
- **Container**: `px-5` (20px)
- **Header**: `px-5 py-4` (20px × 16px)
- **Main Content**: `pt-12 md:pt-20 pb-20` (48px/80px top, 80px bottom)
- **Sections**: `mb-20` (80px) for major sections
- **Lists**: `space-y-3` (12px) for summary, `space-y-4` (16px) for writing, `space-y-10` (40px) for projects

### Margins
- **Section Labels**: `mb-6` (24px) or `mb-8` (32px)
- **Paragraphs**: `mb-1.5rem` (24px) in prose
- **Post Date**: `mb-4` (16px)

### Gaps
- **Header Navigation**: `gap-8` (32px)
- **Intro Section**: `gap-12` (48px)
- **Social Links**: `gap-6` (24px)
- **Icon Groups**: `gap-5` (20px)
- **List Items**: `gap-3` (12px)
- **Writing Items**: `gap-6` (24px)
- **Projects Grid**: `gap-16 md:gap-24` (64px/96px)

## UX Patterns

### Interactions
- **Hover States**: 
  - Text: `hover:text-black` (gray → black)
  - Links: Underline decoration changes from `#e5e7eb` to `#111`
  - Images: `grayscale-0` on hover (removes grayscale filter)
- **Transitions**: `transition-colors`, `transition-all duration-700` (for images)
- **Cursor**: `cursor-pointer` on clickable elements

### Navigation
- **Smooth Scrolling**: `scrollIntoView({ behavior: 'smooth' })`
- **Sticky Header**: Always visible at top
- **Mobile Menu**: Slides down on mobile, `shadow-lg`

### Loading States
- **Loader**: Spinning circle, `border: 2px solid #f3f3f3`, `border-top: 2px solid #333`
- **Animation**: `spin 1s linear infinite`

### Animations
- **Fade In**: `animate-in fade-in duration-700` (home page)
- **Slide In**: `slide-in-from-bottom-4 duration-500` (post reader)
- **Pulse**: `animate-pulse` (Spotify icon)

## Mobile Responsive Design

### Breakpoint
- **Mobile**: Default (< 768px)
- **Desktop**: `md:` prefix (≥ 768px)

### Mobile-Specific Behaviors

#### Layout Changes
- **Intro Section**: `flex-col-reverse` (image on top, content below)
- **Projects/Writing**: Single column (`grid-cols-1`)
- **Header Navigation**: Hidden, replaced with hamburger menu
- **Clock/Weather**: Hidden in header, shown in mobile menu

#### Typography Adjustments
- **Intro Text**: `text-xl` (20px) mobile → `text-2xl` (24px) desktop
- **Image Size**: `w-32 h-32` (128px) mobile → `w-64 h-64` (256px) desktop

#### Mobile Menu
- **Trigger**: Hamburger icon (3 horizontal lines)
- **Position**: Below header, full width
- **Background**: `bg-white`, `border-t border-gray-100`
- **Padding**: `px-5 py-4`
- **Items**: `space-y-4`, `text-sm`, `block w-full text-left`
- **Shadow**: `shadow-lg` for depth

### Touch-Friendly
- **Button Sizes**: Minimum 44px × 44px touch target
- **Spacing**: Adequate gaps between interactive elements
- **Hover States**: Work on touch (active states)

## Component Specifications

### Header Component
- Sticky positioning
- Name on left (clickable, returns to home)
- Navigation links center (writing, projects, values)
- Clock/weather on right (desktop only)
- Mobile menu button (mobile only)

### HeaderClock Component
- Displays current time (12-hour format with AM/PM)
- Location text
- Weather icon (☀) and temperature
- Updates every minute
- Monospace font

### Social Links
- Icons: Mail, X (Twitter), Instagram, GitHub
- Size: `20px × 20px` (Mail, Instagram, GitHub), `18px × 18px` (X)
- Color: `text-gray-400`, hover to `text-gray-800`
- Spacing: `gap-5` (20px)

### Spotify Widget
- Animated gradient circle icon (`w-5 h-5`)
- Text: "♪ Listening to [song name]"
- Link: Underlined on hover
- Color transition on hover

### Project Cards
- Circular icon with first letter of title
- Title with external link arrow
- Description below
- Hover: Title underlines

### Writing List
- Date (monospace, fixed width)
- Title (clickable)
- External link arrow (if external)
- Hover: Title changes color and underlines

### Post Reader
- Back button (arrow + text)
- Date display
- Markdown-rendered content
- Prose styling

### Values Page
- Numbered list of values
- Each value has title and description
- Similar typography to post content

## Accessibility

### Semantic HTML
- Use proper heading hierarchy
- Semantic elements (`<header>`, `<main>`, `<article>`, `<nav>`)
- Alt text for images

### Keyboard Navigation
- All interactive elements focusable
- Visible focus states
- Logical tab order

### Color Contrast
- Text meets WCAG AA standards
- Primary text (#111) on white (#fff): 16.6:1
- Secondary text (#374151) on white: 7.1:1

## Performance

### Font Loading
- Preconnect to Google Fonts
- Font display: swap

### Image Optimization
- Appropriate sizing
- Lazy loading where applicable
- Grayscale filter for performance (removed on hover)

### Code Splitting
- Modular JavaScript files
- Load only what's needed

## Browser Support

### Modern Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)



