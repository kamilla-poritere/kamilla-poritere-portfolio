# Portfolio Website

A modern, multilingual portfolio website built with TypeScript and Vite. Features a clean design, smooth animations, and support for English, Russian, and Latvian languages.

## 🌐 Live Demo

[View Live Demo](https://internet-presence.co.uk/Kamilla)

## ✨ Features

- 🌍 **Multilingual Support** - English, Russian, and Latvian translations
- 🎨 **Dark/Light Theme** - Toggle between dark and light modes
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🎯 **Modern Stack** - TypeScript, Vite, vanilla CSS
- ✅ **Tested** - Unit tests with Jest and E2E tests with Playwright

## 🚀 Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kamilla-poritere/kamilla-poritere-portfolio.git
cd kamilla-poritere-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
``` 

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Build for Production 
To build the project for production, run:
```bash
npm run build
# or
yarn build
```

The optimized files will be in the `dist` folder.

## 🔍 Preview Production Build 
To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

## 🧪 Testing

### Unit Tests
To run unit tests with Jest:
```bash
npm run test
# or            
yarn test
```   

### Watch mode for development
```bash         
npm run test:watch
# or
yarn test:watch
``` 

### End-to-End Tests
To run E2E tests with Playwright:
```bash
npm run test:e2e
# or
yarn test:e2e
``` 

### Run E2E tests with UI mode (interactive):
```bash
npm run test:e2e:ui
# or
yarn test:e2e:ui
``` 

### Run E2E tests in headed mode (with browser UI):
```bash
npm run test:e2e:headed     
# or
yarn test:e2e:headed
```

## 🛠️ Tech Stack

### Core

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- Vanilla CSS - Custom CSS with CSS variables for theming
- [i18next](https://www.i18next.com/) for translations

### Testing
- [Jest](https://jestjs.io/) for unit testing
- [Playwright](https://playwright.dev/) for end-to-end testing  

## 📁 Project Structure

```bash
portfolio-ts/
├── public/               # Static assets
├── src/
│   ├── components/       # UI components
│   ├── modules/          # Core modules (i18n, theme)
│   │   ├── __mocks__/    # Module mocks for testing
│   │   └── __tests__/    # Unit tests
│   ├── translations/     # Language files (en, ru, lv)
│   ├── assets/           # Images, fonts, etc.
│   ├── main.ts           # Application entry point
│   └── style.css         # Global styles
├── e2e/                  # E2E tests
├── index.html            # HTML template
├── jest.config.ts        # Jest configuration
├── playwright.config.ts  # Playwright configuration
└── vite.config.ts        # Vite configuration
``` 

## 🌐 Supported Languages

- 🇬🇧 English (en)
- 🇷🇺 Russian (ru)
- 🇱🇻 Latvian (lv)


## 📝 License

All rights reserved © 2025 Kamilla Poriter

## 📧 Contact

- [Email](kamilla.poriter@gmail.com)
- [LinkedIn](linkedin.com/in/kamilla-poritere-177721198)
- [GitHub](github.com/kamilla-poritere)