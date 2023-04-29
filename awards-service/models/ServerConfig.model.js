const express = require('express');

module.exports = class ServerConfig {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.routes = {
            awards: '/api/v1/awards'
        };
        this.routesSetUp();

        this.middlewareConfig();
    }

    routesSetUp() {
        this.app.use(this.routes.awards, require('../routes/awards.routes'));
    }

    middlewareConfig() {
        // this.app.use(cors());
        // this.app.use(express.json());
    }

    turnOn() {
        this.app.listen(this.port, () => {
            console.log('Awards service running...');
        });
    }
}