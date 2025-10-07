uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uSeed;

varying vec2 vUv;

  // Simplified 2D noise function (cheaper than Perlin)
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // smoothstep

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

  // Fractal noise for more organic look
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    // 3 octaves for good detail without being too expensive
    for(int i = 0; i < 3; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    // Create multiple layers of movement for lava lamp effect
    vec2 uv = vUv * 3.0;

    // Create a vec2 seed offset for proper 2D variation
    vec2 seedOffset = vec2(uSeed, uSeed * 1.5);

    // Add different "seeds" to each layer for variation
    // Layer 1: Slow horizontal drift with seed offset
    float n1 = fbm(uv + vec2(uTime * 0.1, uTime * 0.05) + seedOffset);

    // Layer 2: Vertical rise with different seed
    float n2 = fbm(uv + vec2(uTime * 0.05, -uTime * 0.15) + seedOffset * 2.0);

    // Layer 3: Circular motion for more chaos
    float angle = uTime * 0.3;
    vec2 circular = vec2(cos(angle), sin(angle)) * 0.5;
    float n3 = fbm(uv + circular + seedOffset * 3.0);

    // Combine layers with offset and the circular layer
    float noise = fbm(uv + vec2(n1 * 0.5, n2 * 0.8) + n3 * 0.3 + seedOffset * 0.5);

    // Add some distortion for blob-like movement with seed
    noise += fbm(uv * 2.0 + uTime * 0.2 + seedOffset * 4.0) * 0.3;

    // Vary the smoothstep range over time for changing patterns
    float rangeMin = 0.3 + sin(uTime * 0.1 + uSeed * 0.01) * 0.1;
    float rangeMax = 0.7 + cos(uTime * 0.15 + uSeed * 0.01) * 0.1;
    float t = smoothstep(rangeMin, rangeMax, noise);

    // Mix between two colors
    vec3 color = mix(uColor1, uColor2, t);

    gl_FragColor = vec4(color, 1.0);
}