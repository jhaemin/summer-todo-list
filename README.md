# Summer TODO List
A simple, elegant and cool TODO list web application.

> Note that, this is not a 'todo list' for my summer vacation, but is a web application which name is 'Summer TODO List(hereinafter referred to as STL)' :)


## Features

* Providing sample data for the testing
* Creating a new task
* Renaming a task's title
* Setting a duedate
* Changing a priority
* Marking as a done task
* Notifying the out of date tasks.

STL stores your private data into your own device using the browsers' localStorage API.


## Try the App Directly from My Server

I prepared the application on my website and you can test it right away by just going [here](https://www.jhaemin.com/todolist).


## Build instruction

You must install nodejs and npm before following the steps below.

1. Git clone or download the repository.

2. Go to the root directory and install the packages.

```bash
npm install
```

3. Build

```bash
npm run build
```

## Test on Local

You can start the server by running the script below. It will open the server at port number 3000.

```bash
npm run start
```

Type the url 'localhost:3000' in your browser and enjoy the application.
