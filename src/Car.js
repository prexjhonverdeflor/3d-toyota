import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = `${process.env.PUBLIC_URL}models/toyota/scene.gltf`;

export function Car({ color, onLoad }) {
  const { scene } = useGLTF(MODEL_URL);

  const car = useMemo(() => {
    const clone = scene.clone(true);
    clone.scale.setScalar(0.005);
    clone.position.set(0, -0.335, 0);

    clone.traverse((object) => {
      if (!object.isMesh) return;

      object.castShadow = true;
      object.receiveShadow = true;
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => material.clone())
        : object.material.clone();

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      materials.forEach((material) => {
        if ("envMapIntensity" in material) material.envMapIntensity = 1.15;
      });
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    car.traverse((object) => {
      if (
        !object.isMesh ||
        !/^CarBody_Primary_/.test(object.name)
      ) {
        return;
      }

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      materials.forEach((material) => {
        if (material.name === "Primary") material.color?.set(color);
      });
    });
  }, [car, color]);

  useEffect(() => {
    onLoad();
  }, [car, onLoad]);

  return <primitive object={car} dispose={null} />;
}

useGLTF.preload(MODEL_URL);
