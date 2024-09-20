---

# Redberry Real Estate Project

This project is a real estate website built using **Next.js**, **TypeScript**, **Tailwind CSS**, and various modern libraries. It provides users with advanced filtering functionality, allowing them to search for properties based on multiple criteria, including price, area, regions, and number of bedrooms. The filtering system is seamlessly integrated with **URL search parameters**, making the filters shareable and persistent across page reloads.

## Features

- **Advanced Filtering**: Users can filter properties by price, area, regions, and bedrooms. The filters are stored in the URL, making them shareable and persistent on page refresh.
- **Interactive Animations**: *Framer Motion** for smooth animations, enhancing the user experience with beautiful transitions.
- **Form Validation**: All forms in the project are validated using **Zod**. It ensures that the user inputs meet the required criteria (e.g., price and area validations), providing instant feedback.
- **Image Carousels**: Property listings include beautiful carousels powered by **Embla Carousel**.
- **State Management**: State-driven UI updates ensure real-time feedback without page reloads.
- **Dark/light mode**: Users can select between preferable, dark or light modes.
  
## Tech Stack

- **Next.js** - The React framework for server-rendered and static websites.
- **TypeScript** - Strictly typed JavaScript to minimize errors.
- **Tailwind CSS** - A utility-first CSS framework for custom design and rapid UI development.
- **Framer Motion** - Powerful library for animations and transitions.
- **Zod** - Schema-based form validation for robust input handling.
- **Embla Carousel** - Lightweight library for creating customizable carousels.

## Filter System

Filtering system uses **Next.js SearchParams**, storing the filter parameters directly in the URL. This approach has several benefits:
- **Shareable Links**: Users can share the URL with filters applied, allowing others to see the same filtered results.
- **Persistent Filters**: Filters are maintained even after the user refreshes the page, ensuring a smooth experience.

### How Filters Work:
- Users can filter by:
  - **Price Range**: Minimum and maximum prices.
  - **Area Range**: Minimum and maximum area in square meters.
  - **Regions**: Select one or more regions.
  - **Number of Bedrooms**: Filter by the number of bedrooms.
- **Clear Filters**: Individual filters can be cleared by clicking on the filter pill, and a reset button is available to clear all active filters at once.

## Installation & Setup

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/KUchuna/redberry.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd redberry
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
---
