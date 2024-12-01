# CSB-project backend
This project is the backend for the Cyber Security Basics project. It serves the frontend in the parent folder. This project showcases 5 of the top 10 OWASP sevurity vulnerabilities listed in their website.

## Prerequisites
Make sure you have installed
- node
- npm
- sqlite3

## Installation
This folder is part of the Cyber Security Basics project and works as the backend server for the frontend. The installation and usage instructions here are for this specific folder only and is used to document the backend part mainly for the developing party. To view how the project is intended to work as a whole consult the README.md file in the parent folder instead.  

### Install dependencies
In the backends root folder, install dependencies by running:

```
$ npm install
```

### Initialize the database
To initialize the database, run:
```
npm run database
```

## Usage
To start the server, inside the root folder, run:
```
$ npm run serve
```

There exists some ready made users you can use for testing login. Format username:password
```
paavo:pesusieni
molla:maija
```