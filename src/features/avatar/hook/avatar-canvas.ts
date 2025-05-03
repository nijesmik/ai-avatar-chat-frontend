"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { addLight } from "../lib/three";

export const useAvatarCanvas = (size?: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());

  useEffect(() => {
    const renderSize = size || Math.min(800, window.innerWidth) * 0.8;
    const scene = sceneRef.current;
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.75, 0.8);
    camera.rotation.x = -0.07;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    renderer.setSize(renderSize, renderSize);

    addLight(scene, [0, 0.3, 1], 3.8);
    addLight(scene, [1, -0.5, 0.5], 1);
    addLight(scene, [-1, -0.5, 0.5], 1);

    const animate = () => {
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
    };
  }, []);

  return { canvasRef, sceneRef };
};
