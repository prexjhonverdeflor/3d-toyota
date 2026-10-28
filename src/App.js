import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import "./style.css";
import { Car } from "./Car";
import Navbar from "./Navbar";

const PAINTS = [
  { name: "White", value: "#f1f0eb" },
  { name: "Silver", value: "#b9bdc0" },
  { name: "Light gray", value: "#85898c" },
  { name: "Charcoal", value: "#45484a" },
  { name: "Black", value: "#181a1c" },
  { name: "Dark green", value: "#263c32" },
  { name: "Dark red", value: "#692a30" },
  { name: "Dark blue", value: "#293d54" },
];

function CarScene({ paint, onCarLoaded, autoRotate }) {
  const isMobile = useThree((state) => state.size.width <= 640);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={isMobile ? 36 : 25}
        position={
          isMobile
            ? [8.6717, 1.179, 0]
            : [2.6625, 0, 0]
        }
      />
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        enableDamping
        dampingFactor={0.08}
        target={[0, 0, 0]}
        minDistance={isMobile ? 8.8 : 4.8}
        maxDistance={isMobile ? 11.5 : 9}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={Math.PI / 3.8}
      />
      <Environment
        files={`${process.env.PUBLIC_URL}studio_small_05_1k.hdr`}
      />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.75} />
      <pointLight position={[-4, 1, 2]} intensity={0.45} color="#9b2930" />
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[80, 80]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      <Car color={paint} onLoad={onCarLoaded} />
    </>
  );
}

function ColorSelector({ selectedPaint, onSelect }) {
  return (
    <fieldset className="color-selector" id="colors">
      <legend className="color-heading">Body paint</legend>
      <span className="selected-paint" aria-live="polite">
        {selectedPaint.name}
      </span>
      <div className="swatch-list" role="group" aria-label="Choose body paint">
        {PAINTS.map((paint) => (
          <button
            className="swatch-button"
            type="button"
            key={paint.name}
            aria-label={`${paint.name} body paint`}
            aria-pressed={selectedPaint.name === paint.name}
            title={paint.name}
            onClick={() => onSelect(paint)}
          >
            <span
              className="swatch"
              style={{ "--swatch-color": paint.value }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function App() {
  const [selectedPaint, setSelectedPaint] = useState(PAINTS[0]);
  const [carLoaded, setCarLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { progress } = useProgress();
  const onCarLoaded = useCallback(() => setCarLoaded(true), []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-wordmark" aria-hidden="true">
            TOYOTA
          </div>
          <div className="hero-kanji" aria-hidden="true">
            藤原とうふ店
          </div>
          <div className="hero-stage" aria-hidden="true">
            <Canvas
              shadows
              dpr={[1, 1.25]}
              frameloop={reducedMotion ? "demand" : "always"}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: ACESFilmicToneMapping,
                toneMappingExposure: 1.15,
                shadowMap: { enabled: true, type: PCFSoftShadowMap },
              }}
            >
              <Suspense fallback={null}>
                <CarScene
                  paint={selectedPaint.value}
                  onCarLoaded={onCarLoaded}
                  autoRotate={!reducedMotion}
                />
              </Suspense>
            </Canvas>
          </div>
          <div className="hero-copy">
            <p className="hero-overline">1983—1987&nbsp; / &nbsp;SPRINTER TRUENO</p>
            <h1 id="hero-title">
              AE86<span>Hachi-roku, unmistakable by design.</span>
            </h1>
          </div>
          <ColorSelector
            selectedPaint={selectedPaint}
            onSelect={setSelectedPaint}
          />
          {!carLoaded && (
            <div className="loading-screen" role="status" aria-live="polite">
              <span className="loading-title">Preparing the AE86</span>
              <span className="loading-track">
                <span
                  style={{
                    transform: `scaleX(${Math.max(progress, 6) / 100})`,
                  }}
                />
              </span>
            </div>
          )}
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="story-intro">
            <p className="section-label">A driver's car</p>
            <h2 id="story-title">Light on its feet.<br />Clear in its purpose.</h2>
          </div>
          <p className="story-copy">
            The fifth-generation Corolla made a lasting case for balance:
            front-engine, rear-wheel drive, and a compact shape that puts the
            road ahead of the numbers.
          </p>
          <dl className="spec-list">
            <div className="spec-item">
              <dt>Production</dt>
              <dd>1983—1987</dd>
            </div>
            <div className="spec-item">
              <dt>Engine</dt>
              <dd>4A-GE · 1.6 L</dd>
            </div>
            <div className="spec-item">
              <dt>Layout</dt>
              <dd>Front engine · rear drive</dd>
            </div>
          </dl>
        </section>
      </main>
      <footer className="site-footer">
        <a
          className="model-credit"
          href="https://sketchfab.com/3d-models/toyota-ae86-sprinter-trueno-zenki-a5737bf3cc9b4179a6e5ebe173ff70d9"
          target="_blank"
          rel="noreferrer"
        >
          3D model by Martin Trafas · CC BY 4.0
        </a>
        <nav className="social-links" aria-label="Social links">
          <a
            href="https://www.facebook.com/preksdyan/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/prexverdeflor/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/prex-jhon-verdeflor-586a46200/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
