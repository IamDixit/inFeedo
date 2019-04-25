# inFeedo
Application which triggers 'Good Morning' email to user in different timezone at their respective 8AM

### Technology Stack
1. Nodejs 10.4(https://nodejs.org/en/download/)
2. MongoDB Database on Cloud(MongoDB Atlas)
3. Mongoose OCR

## Installation Steps
1. clone the repo
2. Install the required package using **npm install**

### Custom Configuration
1. Open Configurations/appConfig.js
2. emailTriggerTime: set time for email trigger
3. jobTime: repeat the cycle after specific hours
4. sendEmail: Add your email to send email to you for testing purpose

### Run Application
Run app using cmd **node app.js** or **npm start**

### Run Unit Test Case
1. Install mocha globally using **npm install mocha -g**
Run test case using **npm test** or **mocha test/dbTest.js**
