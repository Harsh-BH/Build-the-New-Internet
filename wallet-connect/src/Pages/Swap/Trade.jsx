import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Trade.css';
import Malamal from '../../models/Malamal'; 
import Lamp from '../../models/Lamp';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/web';

const Background = () => {
    return (
        <Plane args={[100, 100]} position={[0, -20, -5]} rotation={[-Math.PI / 2, 0, 0.5]}>
            <meshStandardMaterial attach="material" color="#9e6634" />
        </Plane>
    );
};

const Trade = () => {
    const [props, set] = useSpring(() => ({
        transform: 'translate3d(0px, 0px, 0px)',
        config: { mass: 1, tension: 170, friction: 26 }
    }));

    const handleMouseMove = (event) => {
        const { clientX, clientY, innerWidth, innerHeight } = event;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 30;
        set({ transform: `translate3d(${x}px, ${y}px, 0px)` });
    };

    return (
        <div className="trade-container" onMouseMove={handleMouseMove}>
            <Navbar />
            <animated.div style={props}>
                <Canvas
                    shadows
                    camera={{ position: [0, 5, 10], fov: 45 }}
                    className="canvas-element"
                >
                    <ambientLight intensity={1} />
                    <directionalLight
                        position={[5, 10, 5]}
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
                    <directionalLight
                        position={[-5, 5, -5]}
                        intensity={3}
                        castShadow
                    />
                    <spotLight
                        position={[5, 10, 0]} 
                        angle={0.3} 
                        intensity={10} 
                        penumbra={1} 
                        castShadow
                        target-position={[2, 2, -5]}
                    />
                    <spotLight
                        position={[2, 5, 2]} 
                        angle={0.2} 
                        intensity={10} 
                        penumbra={1} 
                        castShadow
                    />
                    <Background />
                    <Malamal position={[2, 1, 0]} rotation={[-0.1, 5.2, 0]} scale={[0.6,0.6,0.6 ]} />

                    <Lamp position={[5.5, 0.4, 0]} rotation={[-0.1, 0.4, 0]} scale={[0.6,0.6,0.6 ]} />
               
               

                    <OrbitControls />
                </Canvas>
            </animated.div>
        </div>
    );
};

export default Trade;