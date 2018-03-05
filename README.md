# Game Of Thrones Battle API

## About

This is API that returns following Games Of Thrones battles data from database:

    - List of all the locations where battles have taken place;
    - Total count of battles occured;
    - Statistics:
        * Most active attacker king, defender king, place, name
        * Attacker wins and losses number;
        * Battle types list;
        * Defender min, max and average size
    - All documents by given parameter(s)
    
Also there are routes to import data from csv to databases and remove all imported documents

## Directory Structure

    controllers/    Contains all methods used by routes
    Models/         Contains connection to database and schema of Battle collection
    routes/         Contains all endpoints
        
    app.js          Imports routes and runs the application
    battles.csv     Contains data to import to atabase
    package.json    Contains all required dependancies
    
## Routes

    - Return array of all battles locations: `http://<YOUR_HOST>:<YOUR_PORT>/list`
    - Return total battles count: `http://<YOUR_HOST>:<YOUR_PORT>/count`
    - Return battles statistics object: `http://<YOUR_HOST>:<YOUR_PORT>/stats`
    - Return array of documents that match given parameters: `http://<YOUR_HOST>:<YOUR_PORT>/search?<PARAMETER_1>=<VALUE_1>&<PARAMETER_2>=<VALUE_2>&...&<PARAMETER_N>=<VALUE_N>`

    - Import data from csv file: `http://<YOUR_HOST>:<YOUR_PORT>/import`
    - Remove all data from database: `http://<YOUR_HOST>:<YOUR_PORT>/remove`
    
## Run application

In root directory run `npm start`
