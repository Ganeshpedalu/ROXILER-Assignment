# ROXILER-Assignment

**IF YOU READ THIS DOCUMENT YOU WILL UNDERSTAND EVERYTHING**


Our application utilizes a robust technology stack, featuring:

Tech Stack: JavaScript, React (Frontend), MongoDB (Database), Node.js (Backend), Material-UI, ApexChart.js, charts,js

This stack enables a responsive and user-friendly application with efficient data management and a visually appealing design.


As per your requirement 

## BACKEND

## First requirement

##Requirement

Create API to initialize the database. fetch the JSON from the third-party API and
initialize the database with seed data. You are free to define your own efficient table /
collection structure

## SOLUTION

This the endpoint
http://localhost:4000/initialize-database

## Description

Endpoint: /initialize-database

Method: GET

Description: The "Initialize Database" API endpoint is designed to be called manually or by backend processes. It fetches data from a third-party source and populates your application's database with this data.

**Note**: This API is not intended for direct interaction with the frontend through user actions. 


## Second requirement

##Requirement

Create an API to list the all transactions
- API should support search and pagination on product transactions
- Based on the value of search parameters, it should match search text on product
  title/description/price and based on matching result it should return the product
  transactions
- If search parameter is empty then based on applied pagination it should return all the
  records of that page number
- Default pagination values will be like page = 1, per page = 10

## solution

this is endpoint 
http://localhost:4000/list-transactions?page=?perPage=?search=""?month=?

## Description

Endpoint: /list-transaction

Method: GET

Parameters: page , perPage, search , month 

Description: The "List Transactions" API allows you to fetch and filter product transactions based on search criteria and pagination.


## Third Requirement

##Requirement

GET
Create an API for statistics
- Total sale amount of selected month
- Total number of sold items of selected month
- Total number of not sold items of selected month

## Solution

this is endpoint 
http://localhost:4000/statistics?month=?

## Description

Endpoint: /statistics

Method: GET

Parameters: month (1-12) 

Description: The Statistics API provides key insights for sales and inventory management. It offers three endpoints:


## Fourth Requirement

##Requirement

GET
Create an API for bar chart ( the response should contain price range and the number
of items in that range for the selected month regardless of the year )
- 0 - 100
- 101 - 200
- 201-300
- 301-400
- 401-500
- 501 - 600
- 601-700
- 701-800
- 801-900
- 901-above


## Solution

this is endpoint 
http://localhost:4000/bar-chart-data?month=1

## Description

Endpoint: /bar-chart-data

Method: GET

Parameters: month (1-12)

Description: Retrieve data for generating a bar chart showing item counts within specified price ranges for the selected month.


## Fifth Requirement 

##Requirement 

GET
Create an API for pie chart Find unique categories and number of items from that
category for the selected month regardless of the year.
For example :
- X category : 20 (items)
- Y category : 5 (items)
- Z category : 3 (items)

## Solution

this is endpoint
http://localhost:4000/pie-chart-data?month=?


## Description

Endpoint: /pie-chart-data, 

Method: GET, 

Parameters: month (1-12), 

Description: Get data for generating a pie chart displaying the distribution of items across unique categories for the selected month.


## Sixth Requirement

##Requirement

Create an API which fetches the data from all the 3 APIs mentioned above, combines
the response and sends a final response of the combined JSON

## Solution 

this is my endpoint

http://localhost:4000/combined-data?month=?

## Description 

Endpoint: /combined-data

Method: GET

Parameters: month (1-12)

Description: Fetches data from multiple APIs, combines the responses, and delivers a final JSON response with integrated data from all sources.
