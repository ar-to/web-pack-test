# Webpack Sample

Webpack is bundler. Use the following commands and npm scripts to bundle javascript files.

## Getting Started

```
git clone git@github.com:ar-to/webpack-exercise.git
cd webpack-exercise
yarn install
```


**bundle single file from shell**

`$ ./node_modules/.bin/webpack folder/main.js folder/bundle.js`

**bundle from a config file from shell**

`$ ./node_modules/.bin/webpack --config webpack.config.js`

**bundle from a config file via npm script**

create npm script to only bundle once

`"build": "webpack",`

then run

```
$ npm run build
```

These npm scripts can be used to run webpack for development

```
"scripts": {
  "start": "webpack-dev-server --watch",
  "build":"webpack --progress --profile",
  "build-w": "webpack --debug --progress --watch",
  "dev": "webpack-dev-server --content-base src --inline --hot"
},
```

`--progress` shows percentage of build
`--profile` shows timing for processes
`--debug` of `-d` shows debug 

## Notes

* webpack-dev-server does not build the files inside the config. To read more about this and a possible fix see [this](https://medium.com/@ali.muzaffar/when-using-react-js-webpack-dev-server-does-not-bundle-c2d340b0a3e8)

* Css Modules: 

- Add Css modules via css loaders in webpack:
Got a "loader not found error", see [this](https://github.com/react-boilerplate/react-boilerplate/issues/1648) issue for details.

Also see [this](https://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/)

Also need the following loaders
  - [style](https://webpack.js.org/loaders/style-loader/)
  - [file](https://webpack.js.org/loaders/file-loader/)
  - [url](https://webpack.js.org/loaders/url-loader/)
  - [css](https://webpack.js.org/loaders/css-loader/)

To install run

```
$ yarn add --dev css-loader style-loader file-loader url-loader
```

Use CSS modules by importing to specific components with `import 'styles.css'`

## Known Issues

* webpack-dev-server does not build from public/dist but it does update browser (??)
