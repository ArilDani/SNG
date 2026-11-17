import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import nebulaImg from '../assets/blackhole-nebula.jpg';

export default function BlackHoleCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let isVisible = true;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Orthographic Camera for Fullscreen Lensing & Suction Quad
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mouse & physics tracking
    const mouse = {
      targetX: 0.5,
      targetY: 0.5,
      currentX: 0.5,
      currentY: 0.5,
      vx: 0,
      vy: 0,
      pulse: 0
    };

    // Gravitational Inward Suction & Lensing Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture;
      uniform float u_hasTexture;
      uniform vec2 u_resolution;
      uniform vec2 u_blackhole;
      uniform float u_time;
      uniform float u_radius;
      uniform float u_pulse;
      varying vec2 vUv;

      // 2D Simplex-like noise for cosmic gas filaments
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = p * 2.2;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        float aspect = u_resolution.x / u_resolution.y;

        // Aspect-corrected space
        vec2 st = vec2(uv.x * aspect, uv.y);
        vec2 bh = vec2(u_blackhole.x * aspect, u_blackhole.y);

        // Vector from current pixel towards the black hole center
        vec2 toCenter = bh - st;
        float dist = length(toCenter);

        // Black hole event horizon radius + interaction pulse
        float r = u_radius + u_pulse * 0.02;

        // 1. Inside Event Horizon (Pure Black Singularity Void - NO white ring)
        if (dist < r) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        // 2. Gravitational Inward Suction Vortex
        // As distance approaches r, matter accelerates and is sucked inward
        float suctionPower = pow(r / dist, 1.75);
        vec2 dirToCenter = normalize(toCenter);
        vec2 tangentDir = vec2(-dirToCenter.y, dirToCenter.x);

        // Continuous inward spiral flow
        float inwardSpeed = u_time * 0.35;
        float angle = atan(toCenter.y, toCenter.x);

        // Tangential spiral swirl + direct inward radial drag
        vec2 radialSuction = dirToCenter * (suctionPower * 0.075);
        vec2 spiralSwirl = tangentDir * (suctionPower * 0.055 * (1.0 + sin(angle * 2.0 + u_time) * 0.2));

        // Pulsing gravitational pull wave on click
        if (u_pulse > 0.01) {
          float pulseWave = sin((dist - r) * 30.0 - u_time * 10.0) * u_pulse * 0.02;
          radialSuction += dirToCenter * pulseWave;
        }

        // Warp the texture UVs inward towards the singularity
        vec2 warpedUv = uv + (radialSuction + spiralSwirl) / vec2(aspect, 1.0);

        // Chromatic gravitational dispersion (light bending wavelengths)
        float ca = exp(-(dist - r) * 20.0) * 0.008;
        vec4 baseColor;
        if (u_hasTexture > 0.5) {
          float rCol = texture2D(u_texture, warpedUv + dirToCenter * ca).r;
          float gCol = texture2D(u_texture, warpedUv).g;
          float bCol = texture2D(u_texture, warpedUv - dirToCenter * ca).b;
          baseColor = vec4(rCol, gCol, bCol, 1.0);
        } else {
          float neb = fbm(st * 1.5 + vec2(u_time * 0.02, 0.0));
          vec3 cosmic = mix(vec3(0.02, 0.02, 0.06), vec3(0.18, 0.12, 0.4), neb);
          baseColor = vec4(cosmic, 1.0);
        }

        // 3. Cosmic Infall Gas & Spiral Accretion Filaments
        // Matter heating and stretching into filaments as it gets sucked into the black hole
        // (Natural nebula gas colors: deep violet, electric blue, NO solid white ring!)
        float spiralCoords = angle * 2.0 + inwardSpeed * 3.0 + dist * 10.0;
        float filamentNoise = fbm(vec2(spiralCoords, dist * 8.0 - inwardSpeed * 2.0));
        float filamentIntensity = pow(r / dist, 3.2) * pow(filamentNoise, 1.5) * 0.55;

        vec3 gasColors = mix(vec3(0.4, 0.25, 0.85), vec3(0.2, 0.55, 0.95), filamentNoise);
        baseColor.rgb += gasColors * filamentIntensity;

        // 4. Clean Event Horizon Edge - Gravitational shadow falloff
        // Natural darkening directly at the rim as photons fall past the photon sphere
        float edgeDamping = smoothstep(r, r + 0.008, dist);
        baseColor.rgb *= mix(0.75, 1.0, edgeDamping);

        gl_FragColor = baseColor;
      }
    `;

    const lensingMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_texture: { value: null },
        u_hasTexture: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_blackhole: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0.0 },
        u_radius: { value: 0.12 },
        u_pulse: { value: 0.0 }
      },
      depthWrite: false,
      depthTest: false
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo, lensingMaterial);
    scene.add(quadMesh);

    // Load Clean Texture (Inpainted without static black hole)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      nebulaImg,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        lensingMaterial.uniforms.u_texture.value = tex;
        lensingMaterial.uniforms.u_hasTexture.value = 1.0;
      },
      undefined,
      (err) => {
        console.warn('Nebula texture load error, using procedural fallback:', err);
      }
    );

    // Mouse & Pointer Tracking
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouse.targetX = THREE.MathUtils.clamp(x, 0.08, 0.92);
      mouse.targetY = THREE.MathUtils.clamp(y, 0.08, 0.92);
    };

    const handlePointerDown = () => {
      mouse.pulse = 1.0;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0.5;
      mouse.targetY = 0.5;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      lensingMaterial.uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Visibility Observer
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth damped lerp for mouse follower
      const prevX = mouse.currentX;
      const prevY = mouse.currentY;

      // Gentle cosmic idle orbit when cursor is resting
      const idleX = Math.sin(elapsedTime * 0.45) * 0.03;
      const idleY = Math.cos(elapsedTime * 0.65) * 0.02;

      const targetX = mouse.targetX + idleX;
      const targetY = mouse.targetY + idleY;

      mouse.currentX += (targetX - mouse.currentX) * 0.065;
      mouse.currentY += (targetY - mouse.currentY) * 0.065;

      mouse.vx = mouse.currentX - prevX;
      mouse.vy = mouse.currentY - prevY;

      // Pulse decay
      mouse.pulse += (0 - mouse.pulse) * 0.08;

      // Update shader uniforms
      lensingMaterial.uniforms.u_time.value = elapsedTime;
      lensingMaterial.uniforms.u_blackhole.value.set(mouse.currentX, mouse.currentY);
      lensingMaterial.uniforms.u_pulse.value = mouse.pulse;

      // Subtle organic breathing
      const breath = Math.sin(elapsedTime * 1.5) * 0.003;
      lensingMaterial.uniforms.u_radius.value = 0.12 + breath;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerleave', handlePointerLeave);
      observer.disconnect();

      quadGeo.dispose();
      lensingMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="black-hole-3d-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
}
