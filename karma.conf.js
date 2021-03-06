/**
 * Created by clicktronix on 12.11.16.
 */

'use strict';

let webpackConfig = require('./webpack.config.js');

module.exports = function (config) {

    config.set({

        basePath: 'dev/__tests__/',

        browsers: ['PhantomJS'],

        frameworks: ['mocha', 'sinon', 'chai'],

        files: [
            '../../packages/canteen.min.js',
            '../../packages/easeljs-0.8.2.min.js',
            '*Test.js'
        ],

        reporters: ['mocha'],

        preprocessors: {
            '*.js': ['webpack']
        },

        webpack: {
            module: webpackConfig.module,
            resolve: {
                alias: {
                    sinon: 'sinon/pkg/sinon.js',
                },
            }
        },

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-sinon'),
            require('karma-sinon-chai'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher')
        ]
    });
};