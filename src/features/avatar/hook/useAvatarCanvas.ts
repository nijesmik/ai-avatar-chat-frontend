"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons";

import { useAvatarStore } from "@/features/avatar/store";

import { blinkEyes } from "../lib/avatar";
import { addLight, rotateChild } from "../lib/three";

export const useAvatarCanvas = (avatarURL: string = "/avatar.glb") => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blinkAnimationRef = useRef<number>(-1);
  const visemeAnimationRef = useRef<number>(-1);

  useEffect(() => {
    const size = Math.min(800, window.innerWidth) * 0.8;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.75, 0.8);
    camera.rotation.x = -0.07;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    renderer.setSize(size, size);

    addLight(scene, [0, 0.3, 1], 3.8);
    addLight(scene, [1, -0.5, 0.5], 1);
    addLight(scene, [-1, -0.5, 0.5], 1);

    const loader = new GLTFLoader();
    loader.load(avatarURL, (gltf) => {
      const model = gltf.scene.children[0];
      scene.add(model);
      console.debug("glb:", model);

      rotateChild(model, "LeftArm", "x", Math.PI / 2.2);
      rotateChild(model, "RightArm", "x", Math.PI / 2.2);

      const avatar = model.getObjectByName("Wolf3D_Avatar") as SkinnedMesh;
      blinkEyes(avatar, blinkAnimationRef);

      const { initialize } = useAvatarStore.getState();
      initialize({ avatar, visemeAnimationRef });
    });

    const animate = () => {
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    return () => {
      if (blinkAnimationRef.current !== -1) {
        cancelAnimationFrame(blinkAnimationRef.current);
      }
      if (visemeAnimationRef.current !== -1) {
        cancelAnimationFrame(visemeAnimationRef.current);
      }
    };
  }, []);

  return { canvasRef };
};
