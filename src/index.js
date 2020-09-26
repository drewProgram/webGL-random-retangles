"use_strict";
import { createProgramFromSources, resizeCanvas } from 'webgl-helper';
import './styles.css';

let vertexShaderSource = `#version 300 es
in vec2 a_position;

uniform vec2 u_resolution;

// all shaders have a main function
void main() {
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;

    // convert from 0 -> 1 to 0 -> 2
    vec2 zertoToTwo = zeroToOne * 2.0;

    // convert from 0 -> 2 to -1 -> +1 (clip space)
    vec2 clipSpace = zertoToTwo - 1.0;

    // gl_Position is a special var a vertex shader is responsible for setting
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

let fragmentShaderSource = `#version 300 es

precision highp float;

uniform vec4 color;

//  we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
    outColor = color;
}
`

function main() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector('#c');

    const gl = canvas.getContext('webgl2');
    if (!gl) {
        // no webgl for you!
        console.error("You don't have webGL!");
    }

    const program = createProgramFromSources(gl, vertexShaderSource, fragmentShaderSource);

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // look up uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const colorLocation = gl.getUniformLocation(program, "u_color");

    // Create a buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    const positions = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,
    ];
    // * Copies the positions array content into an Float array.
    // * gl.bufferData copies that data to the positionBuffer on the GPU. It's using position buffer
    // because we bound it to the ARRAY_BUFFER bind point above.
    // * gl.STATIC_DRAW is a hint to webGL about how we'll the data, this tell to it that
    // we are not likely to change this data much.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    // how to pull the data out of the buffer
    let size = 2;             // 2 components per iteration
    let type = gl.FLOAT;      // the data is 32 bit floats
    let normalize = false;    // don't normalize the data
    let stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;           // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type,
        normalize, stride, offset
    );

    resizeCanvas(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // tell it to use our program
    gl.useProgram(program);

    // pass in the canvas resolution so we can convert from pixels
    // to clip space in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // bind the attribute/buffer set we want
    gl.bindVertexArray(vao);

    // ASK WEBGL TO EXECUTE OUR GLSL PROGRAM
    let primitiveType = gl.TRIANGLES;
    offset = 0;
    // times vertex shader need to execute (3 vertex, so 3 times)
    let count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

main();