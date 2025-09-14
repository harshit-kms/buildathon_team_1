# InsuGrow

## Description

InsuGrow Platform is a modern, full-stack insurance management solution that combines powerful analytics, AI-driven marketing tools, and comprehensive customer management capabilities. Built with React and Node.js, it provides insurance professionals with the tools they need to grow their business efficiently.

### Features:

  * Real-time Analytics: Comprehensive dashboard with insurance metrics and performance tracking
  * AI-Powered Marketing: Automated text and image generation for marketing campaigns
  * Customer Management: Advanced lead tracking and customer relationship management
  * Modern Architecture: Built with React, Node.js, and MongoDB for scalability
  * Responsive Design: Mobile-first approach with dark mode support

## Guide

Here is a guide on how to run this project locally:

Clone the repository
```
git clone https://github.com/harshit-kms/buildathon_team_1.git
```




## Database Seed

`npm run seed` in the backend will seed the data to the db initially

## Install

`npm install` in the project root will install dependencies in both `client` and `server`. 

Some basic Git commands are:

```
git clone https://github.com/harshit-kms/buildathon_team_1.git
cd project
npm install
```

## ENV

Create `.env` file for both client and server. See examples:

[Frontend ENV](client/.env.example)

[Backend ENV](server/.env.example)




## Start development

```
npm run start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)



### Code Formatter

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Prettier - Code formatter in VSCode
- Add the following snippet:  

```json

    {
      "editor.formatOnSave": true,
      "prettier.singleQuote": true,
      "prettier.arrowParens": "avoid",
      "prettier.jsxSingleQuote": true,
      "prettier.trailingComma": "none",
      "javascript.preferences.quoteStyle": "single",
    }

```

