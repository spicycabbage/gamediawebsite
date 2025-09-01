# Mobile Game Showcase Website

A responsive website to showcase mobile games across different genres. Built with HTML, CSS, and JavaScript for easy maintenance and scalability.

## 🚀 Features

- **Sitewide Navigation**: Consistent header and footer across all pages
- **Genre Organization**: Games organized by categories (Spot The Difference, Tower Defense, etc.)
- **Responsive Design**: Mobile-first approach that works on all devices
- **Reusable Components**: Easy to maintain and extend
- **Modern UI**: Clean, professional design with smooth animations

## 📁 Project Structure

```
├── index.html                    # Homepage
├── genre-spot-difference.html    # Spot The Difference games page
├── genre-tower-defense.html      # Tower Defense games page
├── game-*.html                   # Individual game detail pages
├── styles.css                    # Main stylesheet
├── script.js                     # JavaScript functionality
└── README.md                     # This file
```

## 🎯 Navigation Flow

```
Home Page
├── Hero Section (Genre Previews)
└── Navigation Menu
    ├── Spot The Difference
    │   ├── Urban Explorer
    │   ├── Nature's Secrets
    │   └── Fantasy Worlds
    └── Tower Defense
        ├── Castle Siege
        └── Space Defense
```

## 🔧 How to Add New Content

### Adding a New Genre

1. **Create Genre Page**: Copy an existing genre page (e.g., `genre-spot-difference.html`) and modify:
   ```html
   <!-- Update the title -->
   <title>New Genre Games - Mobile Game Showcase</title>

   <!-- Update the header -->
   <h1>🎯 New Genre Games</h1>

   <!-- Update the description -->
   <p>Description of your new genre</p>
   ```

2. **Update Navigation**: Add the new genre to all HTML files:
   ```html
   <li><a href="genre-new-genre.html">New Genre</a></li>
   ```

3. **Update Footer**: Add the genre to the footer links in all files.

### Adding a New Game

1. **Create Game Detail Page**: Copy an existing game page (e.g., `game-urban-explorer.html`) and modify:
   ```html
   <!-- Update metadata -->
   <title>Game Name - Genre</title>

   <!-- Update breadcrumb -->
   <a href="index.html">Home</a> > <a href="genre-xxx.html">Genre</a> > Game Name

   <!-- Update content -->
   <h1>Game Name</h1>
   <p class="game-tagline">Game description...</p>
   ```

2. **Add to Genre Page**: Add the game card to the appropriate genre page:
   ```html
   <div class="game-card">
       <div class="game-image">
           <img src="game-screenshot.jpg" alt="Game Name">
           <div class="game-badge">Free/Premium</div>
       </div>
       <div class="game-info">
           <h3>Game Name</h3>
           <p>Description...</p>
           <div class="game-meta">
               <span class="rating">⭐⭐⭐⭐⭐ (4.x)</span>
               <span class="downloads">XX+ Downloads</span>
           </div>
           <div class="game-actions">
               <a href="game-xxx.html" class="btn-primary">View Details</a>
               <button class="btn-secondary">Download/$X.XX</button>
           </div>
       </div>
   </div>
   ```

3. **Update Homepage**: Add the game to the featured games section if desired.

### Adding a New Genre to Navigation

To add a new genre dropdown option:

1. Update all HTML files with the new genre link in the navigation menu
2. Update the footer links
3. Create the genre page following the template above

## 🎨 Customization

### Colors
The design uses a blue-purple gradient theme. To change colors, modify these CSS variables in `styles.css`:

```css
/* Primary colors */
--primary: #667eea;
--secondary: #764ba2;
--accent: #ff6b6b;
```

### Fonts
Currently using system fonts. To add custom fonts:

1. Add Google Fonts link to `<head>` in all HTML files
2. Update the `font-family` in `styles.css`

### Images
Replace placeholder images with actual game screenshots and promotional images.

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Desktop: Default styles
- Tablet: 768px and below
- Mobile: 480px and below

## 🚀 Deployment

1. Upload all files to your web server
2. Ensure all links are relative or update to absolute URLs
3. Test all pages and links
4. Consider adding analytics tracking

## 🔮 Future Enhancements

- Search functionality
- User accounts and favorites
- Game ratings and reviews
- Newsletter signup
- Social media integration
- Multi-language support
- Dark mode toggle

## 📄 License

Feel free to use and modify this template for your own game showcase website.

## 📞 Support

For questions or suggestions, feel free to reach out!

