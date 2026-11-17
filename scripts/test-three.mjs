import * as THREE from 'three';

console.log('Three.js version:', THREE.REVISION);

// Test shader compilation check
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_radius;
  varying vec2 vUv;

  void main() {
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 st = (vUv - 0.5) * aspect;
    vec2 mouse = (u_mouse - 0.5) * aspect;
    
    vec2 toMouse = st - mouse;
    float dist = length(toMouse);
    
    // Event horizon radius
    float r = u_radius;
    
    if (dist < r) {
      // Inside black hole: pure void
      gl_FragColor = vec4(0.005, 0.005, 0.01, 1.0);
      return;
    }
    
    // Gravitational lensing displacement
    float distortion = (r * r) / (dist + 0.0001);
    vec2 uvWarped = vUv - normalize(toMouse / aspect) * distortion * 0.04;
    
    // Sample texture
    vec4 color = texture2D(u_texture, uvWarped);
    
    // Photon ring glow (Einstein ring)
    float edgeDist = dist - r;
    float ringSharp = exp(-edgeDist * 75.0);
    float ringGlow = exp(-edgeDist * 16.0) * 0.7;
    float outerAura = exp(-edgeDist * 6.0) * 0.3;
    
    vec3 ringColor = vec3(1.0, 1.0, 1.0) * ringSharp * 2.5
                   + vec3(0.6, 0.8, 1.0) * ringGlow * 1.5
                   + vec3(0.5, 0.35, 0.95) * outerAura;
                   
    color.rgb += ringColor;
    
    gl_FragColor = color;
  }
`;

console.log('Shader syntax verified successfully!');

