#version 300 es

// an attribute is an in (input) to an vertex shader. It receives data from the buffer
// vec2 is a 2 float value
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