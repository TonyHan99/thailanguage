# ThaiStep - Thai Language Learning Platform

ThaiStep is a web-based platform designed to help Korean speakers learn Thai language through pronunciation and conversation practice.

## Features

- Gender-specific learning (Male/Female expressions)
- Two learning levels:
  - Level 1: Pronunciation Focus
  - Level 2: Reading & Writing
- Interactive learning interface
- Audio pronunciation support
- Responsive design for all devices

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- XLSX for data management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Structure

The learning content is stored in an Excel file (`Thai_Basic.xlsx`) with the following columns:

- id: Unique identifier
- kr: Korean translation
- gender: Target gender (male/female)
- pronunciation: Korean pronunciation guide
- thai: Thai script
- audio: Path to audio file

## Project Structure

```
thai-step/
├── app/
│   ├── gender-selection/
│   ├── level-selection/
│   ├── learning/
│   ├── utils/
│   ├── globals.css
│   └── layout.tsx
├── public/
│   └── audio/
├── Thai_Basic.xlsx
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 