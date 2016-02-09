'use strict';

var config = {
    name: 'TODO API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8081,
    debug: process.env.DEBUG_MODE || true,
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/todo'
    },
};

export default config;
