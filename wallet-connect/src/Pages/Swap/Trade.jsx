import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Trade.css';
import Malamal from '../../models/Malamal'; 
import Lamp from '../../models/Lamp';
import Truck from '../../models/Truck';
import { Plane } from '@react-three/drei';
import { useSpring } from '@react-spring/web';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConnectButton } from '../../config/Web3ModalProvider';
import Submarine from '../../models/submarine';
import WalletDashboard from './WalletDashboard';
import BikeLoader from '../../components/Loader/BikeLoader';

const Background = () => {
  return (
    <Plane args={[100, 100]} position={[0, -23, -5]} rotation={[-Math.PI / 2, 0, 0.5]}>
      <meshStandardMaterial attach="material" color="#9e6634" />
    </Plane>
  );
};

const Trade = () => {
  const [props, set] = useSpring(() => ({
    transform: 'translate3d(0px, 0px, 0px)',
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const [loading, setLoading] = useState(true);

  const handleMouseMove = (event) => {
    const { clientX, clientY, innerWidth, innerHeight } = event;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    set({ transform: `translate3d(${x}px, ${y}px, 0px)` });
  };

  useEffect(() => {
    document.body.classList.add('buy-page-body');
    return () => {
      document.body.classList.remove('buy-page-body');
    };
  }, []);

  useEffect(() => {
    const showLoaderForMinTime = async () => {
      const start = Date.now();
      const timeElapsed = Date.now() - start;
      const remainingTime = Math.max(4000 - timeElapsed, 0);
      setTimeout(() => setLoading(false), remainingTime);
    };

    showLoaderForMinTime();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <BikeLoader />
        </div>
      ) : (
        <div className="trade-page">
          <Navbar />
          <section className="trade-container" onMouseMove={handleMouseMove}>
            <div className="text">
              <h1>
                Seamless <span className="swap">SWAP</span>
              </h1>
              <br />
              <h1>
                Effortless <span className="swap">TRADE</span>
              </h1>
              <p>Hassle-Free!</p>
            </div>

            <Link className="learn-button" to={'/blog'}>
              <b>Learn How to Swap</b>
            </Link>

            <div className="canvas-container">
              <Canvas
                shadows
                camera={{ position: [0, 5, 10], fov: 45 }}
                className="canvas-element"
                onCreated={({ gl }) => {
                  setLoading(false); // Hide loader when Canvas is created
                  gl.setSize(window.innerWidth, window.innerHeight); // Resize canvas
                }}
              >
                <ambientLight intensity={1} />
                <directionalLight
                  position={[0, 10, 5]}
                  intensity={6}
                  castShadow
                  shadow-mapSize-width={4096}
                  shadow-mapSize-height={4096}
                  shadow-camera-far={50}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <directionalLight position={[-5, 5, -5]} intensity={3} castShadow />
                <spotLight
                  position={[5, 10, 0]}
                  angle={0.3}
                  intensity={10}
                  penumbra={1}
                  castShadow
                  target-position={[2, 2, -5]}
                />
                <spotLight position={[2, 5, 2]} angle={0.2} intensity={10} penumbra={1} castShadow />
                <group position={[0, -0.5, 0]}>
                  <Background />
                  <Malamal position={[2, 1, 0]} rotation={[-0.1, 5.2, 0]} scale={[0.6, 0.6, 0.6]} />
                  <Lamp position={[5.5, 0.4, 0]} rotation={[-0.1, 0.4, 0]} scale={[0.6, 0.6, 0.6]} />
                  <Truck position={[5.8, 0.8, 0]} rotation={[-0.1, 0.4, 0]} scale={[0.6, 0.6, 0.6]} />
                </group>
              </Canvas>
            </div>
          </section>

          <section className="bitcoin-swap-section">
            <div className="flex-column-container">
              <div className="wallet-dashboard-container">
                <WalletDashboard /> {/* Place the WalletDashboard component here */}
              </div>
              <div className="swap-container pixelated-3d">
                <div className="tooltip-text">Click For Swapping!</div>
                <ConnectButton />
                <Canvas
                  shadows
                  camera={{ position: [0, 5, 10], fov: 45 }}
                  className="canvas-element"
                  onCreated={({ gl }) => {
                    setLoading(false);
                    gl.setSize(window.innerWidth, window.innerHeight);
                  }}
                >
                  <ambientLight intensity={1} />
                  <directionalLight
                    position={[0, 10, 5]}
                    intensity={6}
                    castShadow
                    shadow-mapSize-width={4096}
                    shadow-mapSize-height={4096}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                  />
                  <directionalLight position={[-5, 5, -5]} intensity={3} castShadow />
                  <spotLight
                    position={[5, 10, 0]}
                    angle={0.3}
                    intensity={10}
                    penumbra={1}
                    castShadow
                    target-position={[2, 2, -5]}
                  />
                  <spotLight position={[2, 5, 2]} angle={0.2} intensity={10} penumbra={1} castShadow />
                  <group position={[0, -0.5, 0]}>
                    <Submarine position={[-3.5, 2, 0]} rotation={[-0.15, 3, 0]} scale={[0.6, 0.9, 0.6]} />
                  </group>
                </Canvas>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Trade;
