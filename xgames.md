# X Games Integration Guide

This guide outlines how to integrate X Games sharing functionality into games in the collection.

## 1. Add Meta Tags (Server-Side)

Add these social media meta tags to your HTML template:

```html
<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://gfiles.benallfree.com/[game-path]/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="[Game Name]" />
<meta property="og:description" content="[Game Description]" />
<meta
  property="og:image"
  content="https://gfiles.benallfree.com/[game-path]/screenshot.webp"
/>

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="game" />
<meta name="twitter:site" content="@benallfree" />
<meta property="twitter:domain" content="gfiles.benallfree.com" />
<meta
  property="twitter:url"
  content="https://gfiles.benallfree.com/[game-path]/"
/>
<meta name="twitter:title" content="[Game Name]" />
<meta name="twitter:description" content="[Game Description]" />
<meta
  name="twitter:image"
  content="https://gfiles.benallfree.com/[game-path]/screenshot.webp"
/>
<meta
  name="twitter:player"
  content="https://gfiles.benallfree.com/[game-path]"
/>
<meta name="twitter:player:width" content="1024" />
<meta name="twitter:player:height" content="576" />
```

These must be added server-side for social media crawlers to see them. The `twitter:player` URL will also be used in the share message.

## 2. Add Share Button

Add this HTML where you want the share button to appear:

```html
<div class="x-share" data-game-name="Your Game Name"></div>
```

Common placement examples:

```html
<!-- Top-left corner -->
<div
  class="x-share"
  data-game-name="Game Name"
  style="position: absolute; left: 80px; top: 4px;"
></div>

<!-- Next to score display -->
<div style="display: flex; align-items: center; gap: 10px;">
  <div id="score">Score: 0</div>
  <div class="x-share" data-game-name="Game Name"></div>
</div>

<!-- In game menu -->
<div class="menu">
  <h2>Game Menu</h2>
  <div class="x-share" data-game-name="Game Name"></div>
  <button>Restart</button>
  <button>Settings</button>
</div>
```

Optional attributes:

- `data-game-url`: Override the URL used in share text (defaults to twitter:player meta tag URL)
- `data-score`: Initial score (defaults to "0")

## 3. Import Share Script

Add this to your HTML file:

```html
<script src="https://xg.benallfree.com/xgames.js"></script>
```

The script will automatically:

- Initialize when the DOM is ready
- Handle dynamically added share buttons
- Use the twitter:player URL for sharing (unless overridden by data-game-url)
- Work with frameworks and dynamic content

## 4. Update Score

Call this whenever the score/level changes:

```javascript
XGamesShare.updateScore('Level 5') // or 'Score 1000', etc.

// If you have multiple share buttons, specify which one:
XGamesShare.updateScore('Level 5', '#specific-share-button')
```

## 5. Share Message Format

The share message will automatically follow this format:

```
I made it to [achievement] on [GameName]. Install @xgamesproj to play right here on X and leave a comment with your high score [game-url]
```

The URL is taken from:

1. `data-game-url` attribute if specified
2. `twitter:player` meta tag if present
3. Falls back to current window location

Examples:

- "I made it to Level 5 on Astray..."
- "I scored 1000 points on Asteroids..."

## 6. Required Assets

- `/xgames.webp` - X Games logo for the share button (16x16px)
- `screenshot.webp` - Game screenshot for Twitter Card (1024x576px recommended)

## Notes

- Position the share button where it makes sense for your game's UI
- The button styling is consistent across games
- The button shows "Copied!" feedback when clicked
- Uses clipboard API for sharing
- No jQuery dependency required
- Works with dynamically loaded content
- Automatically initializes when ready
- Uses twitter:player URL for consistent sharing

## Example Implementation

Here's how to implement it in Astray:

```html
<!-- In your HTML template -->
<head>
  <meta name="twitter:card" content="game" />
  <meta name="twitter:site" content="@benallfree" />
  <meta name="twitter:title" content="Astray - 3D Maze Game" />
  <meta
    name="twitter:description"
    content="Navigate through an immersive 3D maze using arrow keys or vim controls. A challenging HTML5 game that tests your spatial awareness and reflexes."
  />
  <meta
    name="twitter:image"
    content="https://gfiles.benallfree.com/astray/screenshot.webp"
  />
  <meta name="twitter:player" content="https://gfiles.benallfree.com/astray" />
  <meta name="twitter:player:width" content="1024" />
  <meta name="twitter:player:height" content="576" />

  <script src="https://xg.benallfree.com/xgames.js"></script>
</head>

<body>
  <!-- Position next to level display -->
  <div
    style="position: absolute; left: 0; top: 0; display: flex; align-items: center; gap: 10px;"
  >
    <div id="level">Level 1</div>
    <div class="x-share" data-game-name="Astray"></div>
  </div>

  <script>
    // Update score when level changes
    function updateLevel() {
      const level = Math.floor((mazeDimension - 1) / 2 - 4)
      XGamesShare.updateScore(`Level ${level}`)
    }
  </script>
</body>
```
