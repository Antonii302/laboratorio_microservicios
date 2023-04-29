const express = require('express');

module.exports = class ServerConfig {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.routes = {
            breeds: '/api/v1/breeds'
        };
        this.routesSetUp();

        this.middlewareConfig();
    }

    routesSetUp() {
        this.app.use(this.routes.breeds, require('../routes/breeds.routes'));
    }

    middlewareConfig() {
        // this.app.use(cors());
        // this.app.use(express.json());
    }

    turnOn() {
        this.app.listen(this.port, () => {
            console.log('Breeds service running...');
        });
    }
}