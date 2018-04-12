# Feed Reader Testing
This project demonstrates using TDD to add test coverage to a feed reader in an automated fashion using Jasmine.js

## Table of Contents

* [Instructions](#instructions)
* [Project Structure](#structure)

## Instructions

To run and interpret tests, load the html file in the browser.

To get started developing tests, open `js/jasmine/spec/feedreader.js` and start modifiying the tests

## Project Structure
```bash
├── README.md - This file.
├── index.html - Main html file.
├── css - Contains Feed Reader's styles
├── fonts - Contains Feed Reader's fonts
├── js
│	└── app.js # Contains the logic for manipulating the DOM with the feeds. This is the target code under test.
└── jasmine - Jasmine framework and specs
	└── lib - Jasmine framework and runner
	└── spec #
		└── feedreader.js # Defines the specs describing the expected behavior and tests.