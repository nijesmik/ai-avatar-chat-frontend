import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons";

import { blinkEyes } from "../lib/avatar";
import { addLight, rotateChild } from "../lib/three";

const WIDTH = 640;
const HEIGHT = 480;
const ASPECT = WIDTH / HEIGHT;

export const useAvatar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(-1);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, ASPECT, 0.1, 100);
    camera.position.set(0, 1.75, 0.8);
    camera.rotation.x = -0.07;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(WIDTH, HEIGHT);

    addLight(scene, [0, 0.3, 1], 4);
    addLight(scene, [1, -0.5, 1], 1);
    addLight(scene, [-1, -0.5, 1], 1);

    const loader = new GLTFLoader();
    loader.load("/avatar.glb", (gltf) => {
      const model = gltf.scene.children[0];
      scene.add(model);
      console.debug("glb:", model);

      rotateChild(model, "LeftArm", "x", Math.PI / 2);
      rotateChild(model, "RightArm", "x", Math.PI / 2);

      const avatar = model.getObjectByName("Wolf3D_Avatar") as SkinnedMesh;
      blinkEyes(avatar, animationRef);
    });

    const animate = () => {
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    return () => {
      if (animationRef.current !== -1) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { canvasRef };
};
