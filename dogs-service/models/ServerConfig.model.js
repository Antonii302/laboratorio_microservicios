const express = require('express');

module.exports = class ServerConfig {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;

        this.routes = {
            dogs: '/api/v1/dogs'
        };
        this.routesSetUp();

        this.middlewareConfig();
    }

    routesSetUp() {
        this.app.use(this.routes.dogs, require('../routes/dogs.routes'));
    }

    middlewareConfig() {
        // this.app.use(cors());
        // this.app.use(express.json());
    }

    turnOn() {
        this.app.listen(this.port, () => {
            console.log('Dogs service running...');
        });
    }
}