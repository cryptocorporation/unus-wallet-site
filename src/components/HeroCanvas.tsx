"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Soft blue/cloud aurora over white
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }
  float blob(vec2 p, vec2 c, float r){
    return smoothstep(r, 0.0, length(p - c));
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uResolution.x / uResolution.y;
    p += (uMouse - 0.5) * 0.10;

    float t = uTime * 0.05;

    // Monochrome stops — match the app's white + gray aesthetic
    vec3 white  = vec3(1.0);
    vec3 paper  = vec3(0.961);   // #f5f5f5
    vec3 silver = vec3(0.831);   // #d4d4d4
    vec3 stone  = vec3(0.620);   // #9e9e9e
    vec3 ink    = vec3(0.165);   // #2a2a2a
    vec3 cream  = white;
    vec3 peach  = paper;
    vec3 coral  = silver;
    vec3 plum   = stone;
    vec3 amber  = paper;
    vec3 mist   = paper;
    vec3 brand  = silver;
    vec3 deep   = ink;
    vec3 cloud  = paper;

    vec2 c1 = vec2(-0.55 + 0.20*sin(uTime*0.20),  0.30 + 0.15*cos(uTime*0.18));
    vec2 c2 = vec2( 0.55 + 0.15*cos(uTime*0.22), -0.20 + 0.18*sin(uTime*0.25));
    vec2 c3 = vec2( 0.10 + 0.30*sin(uTime*0.15),  0.50 + 0.10*cos(uTime*0.30));
    vec2 c4 = vec2(-0.20 + 0.18*cos(uTime*0.28), -0.55 + 0.10*sin(uTime*0.22));
    vec2 c5 = vec2( 0.65 + 0.15*sin(uTime*0.17), -0.55 + 0.12*cos(uTime*0.21));

    float b1 = blob(p, c1, 0.65);
    float b2 = blob(p, c2, 0.65);
    float b3 = blob(p, c3, 0.55);
    float b4 = blob(p, c4, 0.55);
    float b5 = blob(p, c5, 0.55);

    vec3 col = white;
    col = mix(col, paper,  b1 * 0.85);
    col = mix(col, silver, b2 * 0.55);
    col = mix(col, paper,  b3 * 0.85);
    col = mix(col, stone,  b4 * 0.30);
    col = mix(col, silver, b5 * 0.45);

    float field = fbm(p * 1.4 + vec2(t, t * 0.7));
    col = mix(col, silver, smoothstep(0.55, 0.92, field) * 0.20);

    float vig = smoothstep(2.0, 0.0, length(p));
    col = mix(white, col, vig);

    float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.014;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [size.width, size.height]
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    const m = matRef.current.uniforms.uMouse.value as THREE.Vector2;
    m.x += (x * 0.5 + 0.5 - m.x) * 0.04;
    m.y += (y * 0.5 + 0.5 - m.y) * 0.04;
    matRef.current.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 100, position: [0, 0, 5] }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      className="absolute! inset-0"
    >
      <ShaderPlane />
    </Canvas>
  );
}
