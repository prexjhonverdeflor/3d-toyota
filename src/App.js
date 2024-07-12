import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import styled from "styled-components";
import Navbar from './Navbar';
import Power from "./img/power.png";
import Speed from "./img/speed.png";



const CanvasContainer = styled.div`
  position: relative;
  width: 100vw; /* Adjust width as needed */
  height: 100vh; /* Adjust height as needed */
  z-index: 2; /* Adjust z-index as needed */
`;
const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -200px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const Title = styled.div`
  position: absolute;
  text-align: center;
  font-family: 'Arial', sans-serif; 
  font-size: 11rem;
  font-weight: 800;
  color: rgb(36, 36, 36);
`;

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 20px;
  font-size: 13px;
  width: 30%;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
`;


const SocialButton = styled.a`
  color: black;
  padding: 10px 20px;
  margin-right: 5px; /* Adjust spacing between buttons */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  z-index: 100;
  text-decoration: none; /* Remove underline from anchor tag */
`;

// Social component to render social media buttons in a row at the bottom-right corner
const Social = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row; 
  margin: 20px; /* Adjust margin as needed */
`;
const PowerImg = styled.div`
  position: absolute;
  left: 19rem;
  bottom: 8rem;
`;

const SpeedImg = styled.div`
  position: absolute;
  right: 13rem;
  top: 19rem;
`;




function CarShow() {
  return (
    <>
      <OrbitControls 
        autoRotate
        target={[0, -0.4, 0]}
        maxPolarAngle={1.40}
        minDistance={5}
        maxDistance={10}

      />

      <PerspectiveCamera makeDefault fov={20} position={[4, 0, 5]} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
      
        intensity={5}
        angle={1}
        penumbra={0.1}
        position={[5, 5, 5]}
        castShadow
        shadow-bias={1}
      />
      <spotLight
        intensity={5}
        angle={1}
        penumbra={0.1}
        position={[-5, -5, -10]}
        castShadow
        shadow-bias={1}
      />
   
      <FloatingGrid />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar/>
      <CanvasContainer>
      <Canvas shadows>
        <Suspense fallback={null}>
          <CarShow />
        </Suspense>
      </Canvas>
    </CanvasContainer>
     
      <HeadlineContainer>
          <Title id="text" >TRUENO</Title>
          
      </HeadlineContainer>

     
     <PowerImg>
        <img src={Power} style={{ width: '130px', height: 'auto', }}/>
     </PowerImg>

     <SpeedImg>
        <img src={Speed} style={{ width: '150px', height: 'auto', }}/>
     </SpeedImg>
      

      <Text>
        AE86は、トヨタが1983年から1987年にかけて製造したスポーツカーで、特にドリフトやモータースポーツの愛好家に愛されています。
        <hr style={{ borderTop: '4px solid #000', width: '100%' }} />
      </Text>

      <Social>
      <SocialButton href="https://www.facebook.com/preksdyan/" target="_blank" rel="noopener noreferrer">
        Facebook
      </SocialButton>
      <SocialButton href="https://www.instagram.com/prexverdeflor/" target="_blank" rel="noopener noreferrer">
        Instagram
      </SocialButton>
      <SocialButton href="https://www.linkedin.com/in/prex-jhon-verdeflor-586a46200/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </SocialButton>
    </Social>
    </>
  );
}

export default App;