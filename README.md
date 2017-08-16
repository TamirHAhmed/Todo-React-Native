# Todo React Native

This is a simple mobile app for a todo app developed in .NET Core along side Identity Server 4 and Angular as front-end. It has authorization and authentication and simple CRUD operations.


# Features

  - Login/Logout and user authentication via tokens from Identity Server 4
  - Single Screen for Todo CRUD operations
  - Using React Navigation
  - Using Redux , Redux-Thunk
  - Using Expo

### Installation

First: download the .NET Core project titled "TodoCore" from the following 
link: https://github.com/TamirHAhmed/TodoCore

Apply the migrations and change the Connection string to point at your SQL server.

Run the Identity server project and register a new user.

Second: Using command system, navigate to the folders of "TodoCore" and "TodoAPI", and in each one run the command:
```
dotnet run <app name>
```
after that run the Console app after setting it to the default project, and change the username and pass to match the user you have created earlier and everything should work as expected.

Third:
Download this project and also download EXPO XDE for usage.


### Notes

This is meant only for demonstration purposes and as a simple boilerplate for beginners to use, do not use this code for production.

### Projects connected to this one

### Todo Core:
Asp.net core web api + identity server projects that serves as backend and authorization server respectively.

link: https://github.com/TamirHAhmed/TodoCore

### Todo Angular:
Front end for the todo app using angular v4.

link: https://github.com/TamirHAhmed/TodoAngular

### Todo React Native:
Cross platform mobile app for the todo app using react native - Expo - redux - redux-thunk.

link: https://github.com/TamirHAhmed/Todo-React-Native


#### Contribute

Everyone is welcome to contribute this simple boilerplate to have the basics of security integrated with authentication/authorization tokens.
