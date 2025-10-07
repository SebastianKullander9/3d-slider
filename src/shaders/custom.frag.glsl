uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uSeed;

varying vec2 vUv;

// Simplified 2D noise function
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Reduced to 2 octaves (was 3) - 33% faster
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for(int i = 0; i < 2; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 uv = vUv * 3.0;
    vec2 seedOffset = vec2(uSeed * 0.001, uSeed * 0.0015); // Reduced seed multiplier

    // Reduced from 3 layers to 2 - significant performance gain
    float n1 = fbm(uv + vec2(uTime * 0.1, uTime * 0.05) + seedOffset);
    float n2 = fbm(uv + vec2(uTime * 0.05, -uTime * 0.15) + seedOffset * 2.0);

    // Combine layers
    float noise = fbm(uv + vec2(n1 * 0.5, n2 * 0.8) + seedOffset * 0.5);

    // Simplified distortion
    noise += fbm(uv * 2.0 + uTime * 0.2) * 0.3;

    // Use constant smoothstep range instead of time-varying (less calculations)
    float t = smoothstep(0.3, 0.7, noise);

    vec3 color = mix(uColor1, uColor2, t);
    gl_FragColor = vec4(color, 1.0);
}