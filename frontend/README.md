# Frontend Architecture for goTan-city

The frontend of the `goTan-city` project is built using a combination of React and Vite, complemented by Capacitor to enable the creation of a native Android app. This combination offers a modular and efficient architecture. This document provides insights into the architectural choices, setup, and dependencies.

## Overview

The frontend is designed to provide a user-friendly interface for visualizing transportation routes and stations on a map. It leverages the Mapbox GL JS library for rendering interactive maps and offers a search modal for filtering and selecting specific routes and stations.

## Key Components

### GotanMap

The `GotanMap` component is responsible for rendering the map and displaying transportation routes and stations. It uses the `react-map-gl` library, which is a suite of React components for Mapbox GL JS.

- **`GotanMap.tsx`**: Contains the logic for rendering the map, fetching geojson data for routes and stations, and displaying markers and popups.
- **`GotanMap.scss`**: Provides the styling for the map component.

### SearchModal

The `SearchModal` component offers a user interface for filtering and selecting transportation routes and stations.

- **`SearchModal.tsx`**: Contains the logic for displaying the search modal, which includes a logo, welcome title, search input, and routes selection.
- **`SearchModal.scss`**: Provides the styling for the search modal.

### MapContext

The `MapContext` provides a context for managing the state of the map, including the current view, selected route, and selected station.

- **`MapContext.ts`**: Defines the context and its properties, including the default view state.

## Dependencies

The frontend has several dependencies to ensure smooth and efficient operation:

- **React**: Used for building the user interface.
- **Vite**: A build tool that offers faster development and build times.
- **Mapbox GL JS**: For rendering interactive maps.
- **react-map-gl**: A suite of React components for Mapbox GL JS.
- **Capacitor**: Provides a consistent, web-focused set of APIs that enable an app to stay as close to web-standards as possible, while accessing rich native device features.

## Setup

### Prerequisite
1. Ensure you have Node.js and pnpm installed on your machine.
2. Navigate to the `frontend` directory.
3. Install the dependencies:
   ```bash
   pnpm install
   ```
4. Create a .env file based on .env.example and adjust the values as needed. You need to have a mapbox token here: https://account.mapbox.com/access-tokens/. 

### Web

1. Start the frontend using:
   ```bash
   pnpm run dev
   ```
Once the frontend is running, you can access it via your browser to visualize and interact with the transportation routes and stations.

### Android

1. Build the dist folder 
   ```bash
   pnpm run build
   ```
2. Sync android project with dist folder 
   ```
   npx cap sync
   ```
3. Run app
   ```
   npx cap run android
   ```
Useful links: https://capacitorjs.com/docs/android




