# Arcade Game Project
This game is implemented with vanilla JavaScript, HTML and CSS.

## Table of Contents

* [Instructions](#instructions)
* [Project Structure](#structure)

## Instructions

To play the game, load the html file in the browser.

To get started developing, open `js/app.js` and start modifiying the app's functionality

## Project Structure
```bash
├── README.md - This file.
├── index.html - Main html file.
├── css
│   └── app.css # CSS styles file.
├── js
│	├── app.js # Instatiates the game.
│	├── enemy.js # Encapulates the enemy logic. Inherits entity.
│	├── engine.js # Encapulates the game's main loop logic.
│	├── entity.js # Encapulates the entity logic.
│	├── player.js # Encapulates the player logic. Inherits entity.
│	├── playerSelector.js # Encapsulates the logix to render and select a player.
│	├── resources.js # Encapulates the resources logic. Loads and caches assets.
│   └── sprite.js # Encapsulates the sprite logic.
└── images # Assets used in the game.