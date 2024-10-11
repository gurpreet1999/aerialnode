const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerSpec = require('./docs/swagger.js');
const AppDataSource = require('./db/config.js');

const bodyParser = require('body-parser');
const userRoutes = require('./Routes/router');

// Initialize express app
const app = express();



app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/customer', userRoutes);


AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });


























    


// const axios = require('axios');

// // Set the number of concurrent requests you want to send
// const concurrentRequests = 500;
// const url = 'https://ecpltd.in/api/auth/login';

// // Create an array of promises to send concurrent requests
// const sendRequest = async () => {
//   try {
//     const response = await axios.post(url, {
//       // Your login data here, replace with actual credentials
//       username: 'Nupur',
//       password: 'Ecpl@123'
//     });
//     console.log(`Status: ${response.status}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//   }
// };

// const runLoadTest = async () => {
//   const requests = [];
//   for (let i = 0; i < concurrentRequests; i++) {
//     requests.push(sendRequest());
//   }

//   // Wait for all requests to complete
//   await Promise.all(requests);
//   console.log(`${concurrentRequests} requests completed`);
// };

// // Run the load test
// runLoadTest();
