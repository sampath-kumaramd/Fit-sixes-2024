# FIT SIXES 2K24 - Official Website

This is the official website for FIT SIXES 2K24, an annual six-a-side cricket tournament organized by the Faculty of Information Technology at the University of Moratuwa, Sri Lanka.

## Project Overview

FIT SIXES is a friendly cricket tournament that brings together teams from the IT faculty and industry partners. The event features cricket matches, mini-games, fun activities, and an afterparty celebration. This website serves as the central platform for tournament information, registration, live scores, and more.

## Technology Stack

* **Framework**: Next.js 14.2.5
* **Language**: TypeScript
* **Styling**: Tailwind CSS with shadcn/ui components
* **State Management**: React Hooks
* **Authentication**: Custom JWT authentication
* **Form Handling**: React Hook Form with Zod validation
* **Animation**: Framer Motion
* **PDF Generation**: @react-pdf/renderer
* **Database Integration**: Firebase Firestore
* **Deployment**: Vercel

## Key Features

* **Live Scores**: Real-time match updates
* **Team Registration**: Online registration system for companies
* **Invoice Generation**: Automated invoice creation for registration fees
* **Authentication**: Secure login and registration system
* **Responsive Design**: Optimized for all device sizes
* **Interactive UI**: Animated components and transitions
* **Tournament Information**: Rules, regulations, and event details
* **Hall of Fame**: Showcase of past champions

## Getting Started

* Clone the repository
* Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
* Set up environment variables:
  * Create a `.env.local` file in the root directory
  * Add the following variables:
  ```
  API_BASE_URL=your_api_url
  NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
  NEXT_PUBLIC_YOUTUBE_VIDEO_ID=your_youtube_video_id
  ```
* Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
* Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

* `src/app`: Next.js app router pages
* `src/components`: Reusable UI components
* `src/layout`: Layout components
* `src/lib`: Utility functions and configurations
* `src/schemas`: Zod validation schemas
* `src/utils`: Helper functions
* `public`: Static assets

## Development Workflow

* **Code Style**: The project uses ESLint and Prettier for code formatting
* **Pre-commit Hooks**: Husky is configured to run linting before commits
* **TypeScript**: Strict type checking is enabled

## Deployment

The project is configured for easy deployment on Vercel:
* Connect your GitHub repository to Vercel
* Configure the environment variables
* Deploy

## Contributing

* Fork the repository
* Create a feature branch (`git checkout -b feature/amazing-feature`)
* Commit your changes (`git commit -m 'Add some amazing feature'`)
* Push to the branch (`git push origin feature/amazing-feature`)
* Open a Pull Request

## License

This project is maintained by the IT Faculty Students' Union of the University of Moratuwa.

## Contact

For any inquiries, please contact the IT Faculty Students' Union.

---

Built with ❤️ by the IT Faculty Students' Union, University of Moratuwa.