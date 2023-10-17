## PERN API PEOPLE
Backend: Built with Node.js and Express for handling API requests and interacting with the PostgreSQL database.
Frontend: Developed using React.js to provide a user-friendly interface for managing records.
Database: PostgreSQL is used as the data store to store and retrieve record information.
PERN API project is designed to offer a versatile solution for record management, suitable for a wide range of applications and use cases.

## Prerequisites
- Node.js version: v6.10.3
- npm version: 3.10.10
- Postgresql 16.0-1

## POSTGRES DATABASE 
# Step 1: Install PostgreSQL
If you haven't already installed PostgreSQL, you can do so from the official PostgreSQL website: https://www.postgresql.org/download/.


# Step 2:Create a Database and Connect to PostgreSQL
After installing PostgreSQL, open a terminal or command prompt and execute the following commands to create the database and connect to PostgreSQL:

`psql -U your_username`
In the above command, replace "your_username" with the username you created during PostgreSQL installation.

You will be prompted for the user's password. Enter your password you also create during PostgreSQL installation.Code is not visible when entering. 

Then, you can create the database:
createdb mydatabase

In the above command, replace "mydatabase" with the desired name of the database."pernpeople" is suggested for the base name

After creating the database, you can proceed to Step 3.

# Step 3: Create a "People" Table
Next, you can create the "people" table:

`Copy code
CREATE TABLE people (
    id UUID DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    dateofbirth DATE
);`

These commands will create a new database and a "people" table within it. You can execute these SQL commands in a PostgreSQL client or using the psql command-line tool.

# STEP 4 :CONNECT SERVER WITH DATABASE 
After you have cloned or downloaded the project using the following command: git clone https://github.com/Ioannesi/PERN-API-PEOPLE.git.

Open the .env file with a text editor and fill in the following information:
`
DB_NAME=: "Replace this with the name of your PostgreSQL database"
DB_USERNAME=: "Replace this with your PostgreSQL database username"
DB_PASSWORD=: "Replace this with your PostgreSQL database password"
Make sure to save the file after entering your database information
`

Your .env file should now be properly configured with the necessary database details.

## RUNΝΙNG the SERVER
You can run the server-side of the project by following these steps:

# STEP 5:Navigate to the 'server' directory
`cd server`

# STEP 6: Install the required dependencies
`npm install`

# STEP 7: Start the server:
`npm start`

The server application should now be up and running on your local machine.
`server has started on Port 5000
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.`
Please note that you need to have Node.js and npm installed on your system before running the client application.

## RUNNING THE CLIENT
You can run the server-side of the project by following these steps:

# STEP 5:Navigate to the 'client' directory
`cd client`

# STEP 6: Install the required dependencies
`npm install`

# STEP 7: Start the client:
`npm start`

# STEP 8: VISIT THE PERN API PEOPLE
Visit: 'http://localhost:3000' in a browser to reach the index page

