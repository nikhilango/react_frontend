# üK 223 Backend & Database Setup

This is the Setup for the backend and database for the application. 
It is made using Java and SpringBoot in IntelliJ IDEA. The database in use is Docker Desktop.

## Clone this Repo

```
git clone https://github.com/nikhilango/uek223_group3.git
```

## For Testing:

- Postman has been used for Testing, you can find a folder in this Repo called "FOLDE NAME". You can test the programm on your own.
-> https://www.postman.com/downloads/

## To Download:

- Docker Desktop -> https://docs.docker.com/desktop/install/windows-install/

- IntelliJ IDEA -> https://www.jetbrains.com/help/idea/installation-guide.html


## After Download:

To run start using the Docker, use this command in your command prompt
```
docker run --name postgres_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Troubleshooting
```
org.postgresql.util.PSQLException: ERROR: relation "role_authority" does not exist
```

Simply restart the application. Hibernate sometimes does not initialize the tables fast enough and causes this error. Restarting the application fixes this.

Check if the Docker is running

![DockerScreenshot](https://github.com/nikhilango/uek223_group3/blob/main/Images/DockerScreenshot.png)

Open IntelliJ IDEA

![OpenProject](https://github.com/nikhilango/uek223_group3/blob/main/Images/OpenProject.png)

Run the Code:

To make the application run, press the Gradle Elephant Icon on the top right. After that press Tasks, build and build.

![Build](https://github.com/nikhilango/uek223_group3/blob/main/Images/BuildProject.png)

Finally go to the Main Class called DemoApplication and press run 

![RunApp](https://github.com/nikhilango/uek223_group3/blob/main/Images/demoApplicationStart.png)


# üK 223 Frontend Setup

This is the Frontend Setup for the Application. This is the next step after you have finished setting up the backend. 
The Frontend is made using React and TypeScript in Visual Studio Code. 

## This Setup is made using the following package manager:

- npm / yarn

## For testing:

- cypress

## Before Starting

- Docker Desktop installed & running

- Backend running 

## Use this link to install Node.js:


https://nodejs.org/en


## How to install yarn

```
npm install --global yarn
```

## Check the yarn version:

```
yarn -v
```

## Install packages in root directory 

```
yarn install
```

## Command to run code

```
yarn start
```

Your browser will open on port 3000 and you should be able to see the application.





