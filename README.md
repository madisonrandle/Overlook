# Overlook

## Abstract
This is a project I did during my time at [Turing School of Software and Design](https://turing.io/).

I had seven days to build the app. It is a dashboard interface that allows either a customer to log in or a manager. If logged in as one of 50 customers, the user has the ability to view their past, present, and future bookings, the total spent, and search through availability filters and select a room to book. As a manager, the user may view the total occupancy, total revenue for the day, and search for a specific customer by name. Once a customer is selected, the manager may see all their bookings, delete their bookings, or make a new booking for the selected guest.

The project focuses on using the fetch API to GET, POST, and DELETE room, user, and booking data from Heroku. Another focus of this project is to create a robust testing suite for each class and its methods.

## Setup
1. clone down this repo
2. Inside of the project directory, install the project dependencies by running ```npm install``` in your terminal.
3. run ```npm start``` in your terminal to run the server
4. open localhost:8080 (unless your terminal says otherwise)
5. use manager as username and overlook2019 as a password to go to manager board
6. use customer1 (or any other number from 1 to 50, a number is an id of user) as username and overlook2019 as a password to go to customer board

## App Screenshots
### Login Page
![Login Page](https://i.postimg.cc/zXhqb96D/Screen-Shot-2020-04-22-at-8-26-48-AM.png)
### Manager Home Page
![Manager Home Page](https://i.postimg.cc/gjQRMfHk/Screen-Shot-2020-04-22-at-8-27-10-AM.png)
### Manager Search & Book Page
![Manager Search & Book Page](https://i.postimg.cc/sxv74VSN/Screen-Shot-2020-04-22-at-8-27-27-AM.pngot)
### Customer Home Page
![Customer Home Page](https://i.postimg.cc/d0j2qNw4/Screen-Shot-2020-04-22-at-8-27-45-AM.png)
### Search & Book Page
![Search & Book Page](https://i.postimg.cc/X7tcxysc/Screen-Shot-2020-04-22-at-8-29-54-AM.png)

## Project Next Steps
In future iterations, I'd like to style out the application more extensively, including animation and overall balancing of containers and cards.

I'd also like to create a test suite using chai spies.
