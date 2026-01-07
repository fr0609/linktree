# FitLife Gym Landing Page

A modern, high-performance landing page for FitLife Gym with a bold, athletic design inspired by the Fitness Explorer brand.

## Features

- **Dark theme** with red/orange gradient accents
- **Responsive design** that works on all devices
- **Image slider** showcasing gym photos and trainer content
- **Smooth animations** and hover effects
- **WhatsApp integration** for direct contact
- **Video section** with autoplay support
- **Mobile-optimized navigation** with hamburger menu

## Design Elements

- **Colors**: Dark background (#0a0a0a) with red (#ff3e3e) to orange (#ff6b00) gradient accents
- **Fonts**: 
  - Bebas Neue for headings (bold, athletic style)
  - Inter for body text (clean, readable)
- **Style**: Bold, energetic, professional fitness branding

## Structure

```
landing/
├── index.html          # Main landing page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features (slider, nav, WhatsApp links)
├── assets/
│   ├── coach/          # Trainer and gym photos
│   └── testimonies/    # Transformation/result photos
└── README.md           # This file
```

## Sections

1. **Hero** - Eye-catching introduction with CTA buttons
2. **Services** - Three-card feature section highlighting offerings
3. **About** - Video and image slider with coach information
4. **Results** - Gallery of transformations
5. **Contact** - CTA section with contact information

## Customization

To customize the landing page:

1. **Contact Info**: Update phone number and email in `index.html` and `script.js`
2. **Images**: Replace images in `assets/coach/` and `assets/testimonies/`
3. **Colors**: Modify CSS variables in `styles.css` `:root` section
4. **Content**: Edit text directly in `index.html`

## Usage

Simply open `index.html` in a web browser, or serve it with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Credits

Design inspired by the Fitness Explorer / Charles Coaching landing page, adapted for FitLife Gym branding.
