# 🎬 Movie-App

> A modern, feature-rich movie discovery application built with Vue 3 and Vite.
>
> **⚠️ Status:** This project is **under development** and new features are being actively added.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Setup](#-project-setup)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)

## ✨ Features

### Implemented Features

- **🔥 Trending Movies** - Discover movies trending now with time window filters (day/week)
- **⭐ Popular Movies** - Browse the most popular movies across different genres
- **🏆 Top-Rated Movies** - View the highest-rated movies on TMDB
- **🔍 Search & Discover** - Advanced search functionality to find movies by title
- **🎬 Movie Details** - Detailed information about movies including:
  - Movie overview and ratings
  - Cast and crew information
  - Similar movies recommendations
  - Release dates and runtime
- **❤️ Favorites** - Save and manage your favorite movies (persistent storage)
- **🎭 Browse by Genre** - Filter and explore movies by genres
- **📱 Responsive Design** - Fully responsive UI optimized for all screen sizes
- **⚡ Performance Optimization** - Query caching and lazy loading with TanStack Vue Query

### Upcoming Features

- Advanced filtering options
- User authentication and profiles
- Movie ratings and reviews
- Watchlist feature

## 🏗️ Architecture

### Project Structure

```
src/
├── api/                          # API Integration Layer
│   ├── api.js                   # Axios instance with interceptors
│   └── services/
│       └── moviesService.js     # TMDB API service methods
│
├── features/                     # Feature Modules (Feature-Based Architecture)
│   ├── favorites/               # Favorites feature
│   ├── movie-details/           # Movie details feature
│   ├── popular-movies/          # Popular movies feature
│   ├── search/                  # Search & discover feature
│   ├── top-rated/               # Top-rated movies feature
│   └── trending-movies/         # Trending movies feature
│       ├── composables/         # Vue 3 composables (reusable logic)
│       ├── services/            # Feature-specific API services
│       ├── stores/              # Pinia state management
│       └── views/               # Feature page components
│
├── components/                   # Shared Components
│   ├── ui/                      # UI Components (shadcn-vue/reka-ui)
│   │   ├── button/
│   │   ├── card/
│   │   └── badge/
│   └── [Feature Components]     # Reusable feature components
│
├── composables/                  # Global Composables
│   ├── useDiscoverMovies.js
│   ├── useGenres.js
│   └── ...
│
├── stores/                       # Global Pinia Stores
│   └── counter.js
│
├── layouts/                      # Layout Components
│   └── AppLayout.vue
│
├── router/                       # Vue Router Configuration
│   └── index.js
│
├── lib/                         # Utilities and Helpers
│   ├── utils.js
│   └── helpers.js
│
└── assets/                      # Static Assets
    └── [Stylesheets]
```

### Architecture Principles

1. **Feature-Based Architecture** - Each feature (trending, search, favorites, etc.) is self-contained with its own:
   - Views (page components)
   - Composables (reusable logic)
   - Services (API calls)
   - Stores (state management)
   - Router configuration

2. **Separation of Concerns**
   - API layer handles all HTTP requests
   - Services contain business logic
   - Composables provide reusable component logic
   - Stores manage application state

3. **Component Reusability**
   - Shared components in `components/` directory
   - UI library components for consistency
   - Composables for logic sharing across components

4. **State Management**
   - Pinia for global and feature-level state
   - Vue Query for server state management and caching
   - Persistent storage for favorites

## 💻 Tech Stack

### Frontend Framework

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend build tool

### State Management

- **Pinia** - Vue store with modules and persistence
- **TanStack Vue Query** - Powerful async state management with caching

### Styling

- **TailwindCSS** - Utility-first CSS framework
- **CSS Variables** - For theming support

### UI Components

- **shadcn-vue** - Accessible, customizable component library
- **Reka UI** - Unstyled, accessible components
- **Lucide Vue Next** - Beautiful icon library

### Data Fetching

- **Axios** - HTTP client with interceptors
- **TMDB API** - Movie database API

### Additional Libraries

- **Vue Router** - Client-side routing
- **Swiper** - Touch slider library
- **Vue Sonner** - Toast notification library
- **VueUse** - Vue 3 composition utilities

### Development Tools

- **ESLint** - Code quality and style enforcement
- **Prettier** - Code formatter
- **Vite Plugin Vue DevTools** - Vue devtools integration

## 🚀 Project Setup

### Prerequisites

- Node.js (v20.19.0 or >=22.12.0)
- npm or yarn package manager

### Installation

```sh
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root:

```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=your_tmdb_bearer_token_here
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Get your credentials from [TMDB API](https://www.themoviedb.org/settings/api)

## 📦 Available Scripts

### Development

```sh
npm run dev
```

Starts the development server with hot-module replacement (HMR).
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```sh
npm run build
```

Creates an optimized production build in the `dist` directory.

### Preview

```sh
npm run preview
```

Preview the production build locally before deploying.

### Linting

```sh
npm run lint
```

Runs ESLint to check and fix code style issues.

### Formatting

```sh
npm run format
```

## 📝 Development Notes

- Features are organized in the `features/` directory for scalability
- Each feature is independent and can be developed/tested separately
- API calls are centralized in services for easy maintenance
- Global composables are used for shared component logic
- Pinia stores are used for persistent state (favorites)

## 🤝 Contributing

This project is under active development. Contributions are welcome!
