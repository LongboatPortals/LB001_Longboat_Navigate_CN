/* eslint-disable no-undef */
//const { default: plugin } = require("tailwindcss");

module.exports = {
    env: {
        test: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: "current",
                        },
                    },
                ],
            ],
            plugins:[
                'babel-plugin-transform-import-meta',
                'babel-plugin-transform-vite-meta-env'
            ]
        },
    },
}