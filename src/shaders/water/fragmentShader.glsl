
// uSurfaceColor
uniform vec3 uSurfaceColor;

// uDepthColor
uniform vec3 uDepthColor;

// uColorOffset
uniform float uColorOffset;

// uElevation
// uniform float uElevation;

// uColorMultiplier
uniform float uColorMultiplier;

// vElevation
varying float vElevation;



void main() {
    
    // Mix surface color and depth color based on vElevation

    // vec3 mixColor = mix(uDepthColor, uSurfaceColor, (vElevation + uElevation) * (1.0 / uElevation));  
    // (vElevation + uElevation) * (1.0 / uElevation)
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 mixColor = mix(uDepthColor, uSurfaceColor, mixStrength);  

    // gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0);
    gl_FragColor = vec4(mixColor, 1.0);

}