# ❄️ Snowflakes and Balloons — Atmospheric Control Suite

An elegant, modern React-based presentation applet designed with premium dark mode aesthetics and glassmorphic UI elements. It features real-time, triggerable atmospheric visual effect sequences, specifically falling snowflakes and rising helium balloons, animated smoothly using Framer Motion.

---

## ✨ Features

- **Ambient Premium UI**: Built with a sleek dark slate theme (`#020617`), vibrant color accents, ambient blur gradients, and polished glassmorphic cards.
- **Interactive Preset Effects**:
  - **Preset 01: Snowflakes**: Dispenses high-contrast, falling ice particles featuring individual wind-drift sway, size variety, and rotation animation.
  - **Preset 02: Balloons**: Inflates and launches 3D-shaded helium balloons with vibrant colors (blue, emerald, rose, violet, amber, and cyan) rising smoothly with physics-like sway.
- **Precision 5-Second Timer**: A custom countdown utility tracks execution duration, visual progress bar, and automatic effect termination.
- **Real-Time Telemetry**: Live telemetry dashboard tracking active effect state, venue location ("Hall of Mirrors"), and active particle counts in the DOM.
- **Performance Optimized**: Automatically cleans up and unmounts particles from the DOM once they drift off-screen, maintaining minimal CPU/memory footprint.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite 6](https://vite.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion for React](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 How to Run Locally

Follow these instructions to set up and run the project in your local development environment.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone the Repository & Install Dependencies

Navigate to the project root directory and install the required npm packages:

```bash
npm install
```

### 2. Configure Environment Variables (Optional)

If needed, copy the example environment file to `.env.local` to configure variables:

```bash
cp .env.example .env.local
```

Modify the values in `.env.local` to customize your local hosting URL or setup keys:
- `GEMINI_API_KEY`: API key for Gemini AI.
- `APP_URL`: The URL where this applet is hosted.

*Note: The core animation controls and user interface run completely client-side and do not require external API keys to function.*

### 3. Start the Development Server

Run the following command to start Vite's local dev server:

```bash
npm run dev
```

The server will spin up, typically on:
- **Local URL**: [http://localhost:3000](http://localhost:3000)
- **Network URL**: `http://192.168.x.x:3000` (accessible from other devices on the same network)

### 4. Build for Production

To compile the application into static assets for production deployment:

```bash
npm run build
```

This compiles optimized assets into the `dist/` directory.

### 5. Preview the Production Build

To run and preview the production build locally before hosting:

```bash
npm run preview
```

---

## 📁 Project Structure

- `src/App.tsx`: Main application component containing effect triggering logic, state tracking, layout structure, and DOM animation sequences.
- `src/components/Balloon.tsx`: Custom SVG-based balloon renderer featuring inline radial gradients for 3D realism and physics strings.
- `src/types.ts`: TypeScript type definitions for snowflakes, balloons, and application states.
- `src/index.css`: Stylesheet linking Tailwind CSS imports.
- `vite.config.ts`: Vite build configuration with aliases and custom server controls.
