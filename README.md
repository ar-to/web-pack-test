#Webpack Sample

These npm scripts can be used to run webpack for development

```
"scripts": {
  "start": "webpack-dev-server --watch",
  "build":"webpack --progress --profile",
  "build-w": "webpack --debug --progress --watch"
},
```

`--progress` shows percentage of build
`--profile` shows timing for processes
`--debug` of `-d` shows debug 

## Notes

* webpack-dev-server does not build the files inside the config. To read more about this and a possible fix see [this](https://medium.com/@ali.muzaffar/when-using-react-js-webpack-dev-server-does-not-bundle-c2d340b0a3e8)

## Known Issues

* webpack-dev-server does not build from public/dist but it does update browser (??)