
Steps
=====

1. git clone the app

(cd into the folder where the apps files were cloned)


2. npm install


3. Set up your mongodb:
a) Run mongo locally and change dataUtils.js -> getDbDetails() -> configuration to 	'local'
OR
b) Create an account in mongolab and enter your credentials, URL and port from mongolab in dataUtils.js -> getDbDetails() 


4. node server.js

(go to localhost:8000 using a browser)
