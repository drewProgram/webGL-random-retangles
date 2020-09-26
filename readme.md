## Concepts of WebGL (also using babel and webpack)
### Babel and Webpack configuration
To install babel, use `yarn add @babel/core @babel/cli @babel/preset-env -D`
To install webpack, use `yarn add webpack webpack-cli -D`
Install babel loader `yarn add babel-loader`
install `yarn add style-loader css loader`
css-loader will interpretate imports of css files
style-loader will inject the css inside the html

Now just configure the babel.config.json and webpack.config.js the way you want.

To configure the webpack dev server, install it using `yarn add webpack-dev-server -D`
After properly configurating the webpack file, create a script to use easier the dev-server.

## WebGL and GLSL
To make my job easier, I developed a package to use when developing with WebGL. It's a set of helper functions to save some time. To install, `yarn add webgl-helper`

The shaders folder is just visual, I'm not using it. It's just to help to organize de shaders code, in a separate file I can use a extension to color highlight the GLSL syntax, as in the code I need to put the GLSL at a string var.

### Executing the program
- use `yarn` or `npm i`
- `yarn dev` or `npm dev`
