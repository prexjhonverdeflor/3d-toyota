import React from 'react';
import { useProgress } from '@react-three/drei';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 10;
  color: black;
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
`;

function Preloader() {
  const { progress } = useProgress();
  return (
    <LoaderContainer>
      <div>Loading... {progress.toFixed(2)}%</div>
    </LoaderContainer>
  );
}

export default Preloader;