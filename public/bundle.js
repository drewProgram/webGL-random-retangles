/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas-helper.js":
/*!******************************!*\
  !*** ./src/canvas-helper.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return resize; });\nfunction resize(canvas) {\n  // lookup the size the browser is displaying the canvas\n  var displayWidth = canvas.clientWidth;\n  var displayHeight = canvas.clientHeight; // check if the canvas is not the same size\n\n  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {\n    // make the canvas the same size\n    canvas.width = displayWidth;\n    canvas.height = displayHeight;\n  }\n}\n\n//# sourceURL=webpack:///./src/canvas-helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas\", function() { return canvas; });\n/* harmony import */ var _canvas_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas-helper */ \"./src/canvas-helper.js\");\n\"use_strict\";\n\n\nvar vertexShaderSource = \"#version 300 es\\n\\n// an attribute is an in (input) to an vertex shader. It receives data from the buffer\\nin vec4 a_position;\\n\\n// all shaders have a main function\\nvoid main() {\\n    // gl_Position is a special var a vertex shader is responsible for setting\\n    gl_Position = a_position;\\n}\\n\";\nvar fragmentShaderSource = \"#version 300 es\\n\\n// fragment shaders don't have a default precision so we need\\n// to pick one. highp is a good default. It means \\\"higih precision\\\"\\nprecision highp float;\\n\\n//  we need to declare an output for the fragment shader\\nout vec4 outColor;\\n\\nvoid main() {\\n    // Just set the output to a constant reddish-purple\\n    outColor = vec4(1, 0, 0.5, 1);\\n}\\n\";\n/** @type {HTMLCanvasElement} */\n\nvar canvas = document.querySelector('#c');\nvar gl = canvas.getContext('webgl2');\n\nif (!gl) {\n  // no webgl for you!\n  console.error(\"You don't have webGL!\");\n}\n\nfunction createShader(gl, type, source) {\n  var shader = gl.createShader(type);\n  gl.shaderSource(shader, source);\n  gl.compileShader(shader);\n  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\n\n  if (success) {\n    return shader;\n  }\n\n  console.log(gl.getShaderInfoLog(shader));\n  gl.deleteShader(shader);\n} // linking shaders into a program\n\n\nfunction createProgram(gl, vertexShader, fragmentShader) {\n  var program = gl.createProgram();\n  gl.attachShader(program, vertexShader);\n  gl.attachShader(program, fragmentShader);\n  gl.linkProgram(program);\n  var success = gl.getProgramParameter(program, gl.LINK_STATUS);\n\n  if (success) {\n    return program;\n  }\n\n  console.log(gl.getProgramInfoLog(program));\n  gl.deleteProgram(program);\n} // vertex + fragment = program\n\n\nvar vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);\nvar fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);\nvar program = createProgram(gl, vertexShader, fragmentShader);\nvar positionAttributeLocation = gl.getAttribLocation(program, \"a_position\");\nvar positionBuffer = gl.createBuffer();\ngl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // three 2d points\n\nvar positions = [0, 0, 0, 0.5, 0.7, 0]; // * Copies the positions array content into an Float array.\n// * gl.bufferData copies that data to the positionBuffer on the GPU. It's using position buffer\n// because we bound it to the ARRAY_BUFFER bind point above.\n// * gl.STATIC_DRAW is a hint to webGL about how we'll the data, this tell to it that\n// we are not likely to change this data much.\n\ngl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);\nvar vao = gl.createVertexArray();\ngl.bindVertexArray(vao);\ngl.enableVertexAttribArray(positionAttributeLocation); // how to pull the data out of the buffer\n\nvar size = 2; // 2 components per iteration\n\nvar type = gl.FLOAT; // the data is 32 bit floats\n\nvar normalize = false; // don't normalize the data\n\nvar stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position\n\nvar offset = 0; // start at the beginning of the buffer\n\ngl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);\nObject(_canvas_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(gl.canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });