# Bobby the chatbot
Bobby is a chatbot that allows you to learn information about countries around the world.

## Features
Ask Bobby something you want to know about a specific country
- It can give the official name of a country
- It can give its name of a country translated in French
- It can give the continent where the country is situated in
- It can give the number of inhabitants of a country
- It can give the currency a country uses
- It can give the capital city of a country
- It can give the official languages of a country
- It can display the flag of a country

## Tech

Bobby the chatbot is a Node.js project. uses a number of open source projects to work properly:
- It uses Express as a server framework
- It uses the [rest-countries](https://gitlab.com/amatos/rest-countries) API to collect country information
- It uses the [wit.ai](https://wit.ai/) to recognise common language sentences

## Installation

Bobby requires [Node.js](https://nodejs.org/) to run.

Install the dependencies.
```sh
npm install
```

## Start
To build index.js
```sh
npm run build
```

To launch the server
```sh
npm run start
```

Bobby is running on
http://127.0.0.1:3000/