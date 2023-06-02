# jrnysWebServer
🔥 JRNYS web server - A Node.js web app for JRNYS which utilizes Express.JS routing for implementing custom API endpoints and handling HTTP requests. The goal is to build scalable web applications leveraging Firebase services, including authentication, real-time database, cloud storage, and Firestore as the data backend.

# Starting Server

This is a template for starting our JRNYS API with a Firestore emulator. It provides a simple setup to develop and test your API locally using Firestore emulator as the database.
You can test the API by using the jrnysPostman collection found here: https://github.com/jrnys/jrnysPostman. 

## Prerequisites

- Node.js and npm should be installed on your machine.
- Firebase CLI
- Java should be installed on your machine.

## Getting Started - Many of these instructions can be found in the Cloud Firestore Documentation: https://firebase.google.com/docs/firestore/. 
- 1. Clone the repository
- 2. Run `npm ci` 
- 3. Run `nodemon` - this should successfully state that it has started `node main.js` 
- 4. Install Cloud Firestore Emulator - `firebase setup:emulators:firestore`
- 5. Initialize Firebase project in working directory - `firebase init`
- 6. Start the emulator - `firebase emulators:start --only firestore`