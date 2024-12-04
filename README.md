# CSB-project
This repository is the project 1 for Cyber Security Basics from University of Helsinki. It has a frontend and the backend. The project showcases 5 of the top 10 OWASP sevurity vulnerabilities listed in the OWASP's website. The following content introduces instruction guides and how to use the app for assignment review purposes.

## Prerequisites
Make sure you have installed
- node
- sqlite3

To check if you already have them, in the terminal run the next lines and see if they print out a version number:
```
$ node --version
```
```
$ sqlite3 --version
```
If both output a version number then they are already installed.

Installation guides for each can be found here. Make sure to check the guide corresponding to your operating system (Linux, Mac, Windows):
- [node installation](https://nodejs.org/en/download/package-manager)
- [sqlite3 installation](https://www.tutorialspoint.com/sqlite/sqlite_installation.htm)


## Backend installation
From the parent folder navigate into the `backend` folder:
```
# ./

$ cd backend
```

Run the next line to install all dependencies:
```
# ./backend

$ npm install
```

To initialize the database, run:
```
# ./backend

$ npm run database
```

To start up the server, run:
```
# ./backend

$ npm run serve
```



## Frontend installation 
Now in your terminal and from the parent folder, navigate into the `frontend` folder:
```
# ./

$ cd frontend
```

And run the next line to install all dependencies:
```
# ./frontend

$ npm install
```

Then for starting the frontend run:
```
# ./frontend

$ npm run dev
```

Now you should be able to use the application in [http://localhost:5173/](http://localhost:5173/)



## Usage
The Application is a simple blog app. Main features are:

- Creating an account
- Login and logout
- Creating and deleting blogs
- Reading other users blogs

For testing purposes you can create a new account or use one of the existing accounts (username:password):

- paavo:pesusieni
- molla:maija
