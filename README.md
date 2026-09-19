# 🎞️ TSlider

[![npm version](https://img.shields.io/npm/v/tslider?logo=npm)](https://www.npmjs.com/package/tslider)
[![license](https://img.shields.io/npm/l/tslider)](./LICENSE)
[![Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://tslider.vercel.app/)

A lightweight and customizable slider library built with **TypeScript**, focused on smooth interactions, responsive behavior, accessibility, and a clean separation between functionality and visual styling.

**Dependency-free** · **Types included** · **Works with vanilla JS and React**

## 🌐 Live Demo

👉 **[View the live demo](https://tslider.vercel.app/)**

---

## 🚀 Features

* ↔️ Drag and swipe navigation
* ⬅️ Previous / next navigation
* 🔘 Dot navigation
* 🔢 Pagination
* 🔁 Infinite loop
* ▶️ Autoplay
* ⏸️ Play / pause autoplay control
* 🖱️ Pause autoplay on hover
* 👀 Pause autoplay when the slider is outside the viewport
* ⌨️ Keyboard navigation
* 📱 Responsive items per view
* 🎯 Navigation by item or page
* ♿ `prefers-reduced-motion` support
* 🧩 Customizable controls
* 📦 No UI framework required
* 💪 Written in TypeScript

---

## 🛠️ Tech Stack

* TypeScript
* JavaScript DOM API
* CSS
* Pointer Events
* `requestAnimationFrame`
* `IntersectionObserver`

---

## 📦 Installation

```bash
npm install tslider
```

---

## 💻 Usage

### 1. Add the markup

The slider uses a wrapper containing a rail with the slides.

```html
<div data-slide="wrapper">
	<div data-slide="rail">
		<div data-slide="slide">Slide 1</div>
		<div data-slide="slide">Slide 2</div>
		<div data-slide="slide">Slide 3</div>
	</div>
</div>
```

### 2. Import the styles and initialize

```ts
import Slide from 'tslider';
import 'tslider/style.css';

const slide = new Slide({
	wrapper: '[data-slide="wrapper"]',
	rail: '[data-slide="rail"]',
});

slide.init();
```

> The stylesheet is required: it contains the structural styles the slider needs to work. TSlider's reset styles are scoped to the slider wrapper and do not affect elements outside the component.

### Usage with React

Create the slider in an effect and call `destroy()` in the cleanup, so listeners, observers, and timers are removed when the component unmounts.

```tsx
import { useEffect } from 'react';
import Slide from 'tslider';
import 'tslider/style.css';

export function Carousel() {
	useEffect(() => {
		const slide = new Slide({
			wrapper: '#hero-slider',
			rail: '#hero-slider [data-slide="rail"]',
			options: { loop: true, autoplay: { enabled: true } },
		});

		slide.init();

		return () => slide.destroy();
	}, []);

	return (
		<div id="hero-slider" data-slide="wrapper">
			<div data-slide="rail">
				<div data-slide="slide">Slide 1</div>
				<div data-slide="slide">Slide 2</div>
				<div data-slide="slide">Slide 3</div>
			</div>
		</div>
	);
}
```

---

## ⚙️ Configuration

The slider can be configured through the `options` property.

```ts
const slide = new Slide({
	wrapper: '[data-slide="wrapper"]',
	rail: '[data-slide="rail"]',

	options: {
		loop: true,

		itemsPerView: 3,

		slideBy: 'page',

		controls: {
			arrows: true,
			dots: true,
			pagination: true,
		},

		autoplay: {
			enabled: true,
			delay: 3000,
			pauseOnHover: true,
			controls: true,
		},
	},
});

slide.init();
```

### Available options

| Option                  | Type               | Default  | Description                          |
| ----------------------- | ------------------ | -------- | ------------------------------------ |
| `loop`                  | `boolean`          | `false`  | Enables infinite navigation          |
| `itemsPerView`          | `number`           | `1`      | Number of slides displayed at once   |
| `slideBy`               | `'item' \| 'page'` | `'page'` | Defines the navigation step          |
| `controls.arrows`       | `boolean`          | `false`  | Displays previous / next buttons     |
| `controls.dots`         | `boolean`          | `false`  | Displays dot navigation              |
| `controls.pagination`   | `boolean`          | `false`  | Displays current / total pagination  |
| `autoplay.enabled`      | `boolean`          | `false`  | Enables autoplay                     |
| `autoplay.delay`        | `number`           | `3000`   | Delay between slides in milliseconds |
| `autoplay.pauseOnHover` | `boolean`          | `true`   | Pauses autoplay while hovering       |
| `autoplay.controls`     | `boolean`          | `false`  | Displays play / pause control        |

---

## 🎯 Navigation

TSlider supports two navigation modes.

### Item

Moves one slide at a time:

```ts
slideBy: 'item';
```

### Page

Moves according to the number of visible slides:

```ts
slideBy: 'page';
```

For example:

```ts
itemsPerView: 3,
slideBy: 'page'
```

Each navigation action moves three slides.

---

## 🔁 Infinite Loop

When `loop` is enabled, the slider creates cloned slides at both ends of the rail.

```ts
loop: true;
```

This allows navigation to continue seamlessly from the last slide to the first and vice versa.

The logical slide index is maintained separately from the physical position of the slides, allowing the transition to remain visually continuous.

---

## ▶️ Autoplay

Autoplay can be enabled through the configuration:

```ts
autoplay: {
	enabled: true,
	delay: 3000,
}
```

It can also pause automatically when the user interacts with the slider:

```ts
autoplay: {
	enabled: true,
	pauseOnHover: true,
	controls: true,
}
```

The slider also uses `IntersectionObserver` to pause autoplay when the slider is outside the viewport and resume it when it becomes visible again.

---

## 🎨 Customization

The slider separates its **behavior** from its **visual appearance**.

The TypeScript class handles the slider logic, while the CSS controls its appearance.

The stylesheet is divided into:

```css
/* SLIDE — STRUCTURAL STYLES */

/* SLIDE — CUSTOMIZABLE STYLES */
```

Structural styles are responsible for the slider's operation and should generally not be modified.

The customizable section controls the appearance of navigation arrows, dots, pagination, autoplay controls, spacing, transitions, opacity, borders, backgrounds, and other visual properties.

TSlider also includes a small reset scoped to `[data-slide='wrapper']`. It does not apply a global CSS reset to the page.

You can override the control colors using CSS variables directly on the slider wrapper or on a custom class:

```css
.my-slider {
	--slide-control-color: rgb(255 255 255);
	--slide-control-background: rgb(255 255 255 / 0.12);
	--slide-control-border: rgb(255 255 255 / 0.18);
	--slide-control-opacity: 0.9;
	--slide-control-inactive-opacity: 0.35;
	--slide-control-hover-background: rgb(255 255 255 / 0.2);
	--slide-control-disabled-opacity: 0.35;
}
```

Then apply the class to the slider wrapper:

```html
<div class="my-slider" data-slide="wrapper">
	<div data-slide="rail">
		<div data-slide="slide">Slide 1</div>
		<div data-slide="slide">Slide 2</div>
		<div data-slide="slide">Slide 3</div>
	</div>
</div>
```

This makes it possible to customize each slider instance independently without changing the library's source files.

You can also override other visual properties from your own stylesheet:

```css
.my-slider [data-slide='slide'] {
	height: 600px;
}

.my-slider [data-slide-arrow] {
	width: 3rem;
	height: 3rem;
}
```

---

## ♿ Accessibility

TSlider includes several accessibility considerations:

* Keyboard navigation using `ArrowLeft` and `ArrowRight`
* Accessible labels for navigation controls
* `aria-current` for the active dot
* Focusable slider wrapper
* Support for `prefers-reduced-motion`
* Semantic `<button>` elements for interactive controls

Reduced motion is detected using:

```ts
window.matchMedia('(prefers-reduced-motion: reduce)');
```

When reduced motion is preferred, autoplay is disabled.

---

## 🧹 Destroy

The slider provides a `destroy()` method to remove event listeners, observers, controls, timers, and animation frames.

```ts
slide.destroy();
```

This makes the component safe to mount and remove dynamically, which is especially useful in frameworks like React.

---

## 🧠 Implementation Highlights

The project was built from scratch with a focus on understanding the mechanics behind a reusable slider component.

* Type-safe configuration with TypeScript
* Pointer Events for mouse and touch interaction
* `requestAnimationFrame` for drag movement
* Debounced resize handling
* Dynamic slide position calculations
* Clone-based infinite looping
* Logical and physical slide indexes
* Automatic navigation index calculation
* `IntersectionObserver` for viewport visibility
* Autoplay lifecycle management
* Keyboard interaction
* Component cleanup through `destroy()`

---

## 🧑‍💻 Development

Clone the repository and install the dependencies:

```bash
git clone https://github.com/CrystyanVerly/tslider.git
cd tslider
npm install
```

Available scripts:

| Script              | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Starts the demo with the Vite dev server       |
| `npm run build`     | Builds the demo site                           |
| `npm run build:lib` | Builds the library (`dist/`) that is published |

### 📁 Project Structure

```text
src/
├── assets/
│   └── controls/
│       ├── arrow-left.svg
│       ├── arrow-right.svg
│       ├── dots-navigation.svg
│       ├── play.svg
│       └── pause.svg
│
├── Components/
│   ├── utils/
│   │   └── debounce.ts
│   └── Slide.ts
│
├── index.ts
└── style.css

index.html          # demo page
vite.lib.config.ts  # library build config
```

---

## 🎯 Purpose

This project was created to practice building a reusable UI component from scratch instead of relying on an existing slider library.

The main goal was to understand the underlying mechanics involved in:

* Dragging and swiping
* Navigation
* Infinite scrolling
* Autoplay
* Responsive behavior
* Accessibility
* Animation control
* Component lifecycle

---

## 👨‍💻 Author

**Crystyan Verly**

[GitHub](https://github.com/CrystyanVerly)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
