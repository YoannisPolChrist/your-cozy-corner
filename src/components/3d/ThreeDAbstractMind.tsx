import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshTransmissionMaterial, Float, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

const DUMMY = new THREE.Object3D();

export const AbstractMind = () => {
    const coreRef = useRef<THREE.Mesh>(null);
    const wireframeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (coreRef.current) {
            coreRef.current.rotation.x = t * 0.1;
            coreRef.current.rotation.y = t * 0.15;
            // "Breathing" effect
            const scale = 1 + Math.sin(t * 1.5) * 0.05;
            coreRef.current.scale.set(scale, scale, scale);
        }

        if (wireframeRef.current) {
            wireframeRef.current.rotation.x = -t * 0.05;
            wireframeRef.current.rotation.y = -t * 0.08;
            wireframeRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                {/* Outer wireframe shell representing structure / logic */}
                <Icosahedron ref={wireframeRef} args={[2.2, 1]}>
                    <meshBasicMaterial
                        color="#BFA67F" // Gold accent
                        wireframe
                        transparent
                        opacity={0.15}
                    />
                </Icosahedron>

                {/* Inner solid core representing emotion / subconscious */}
                <Icosahedron ref={coreRef} args={[1.5, 2]}>
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={2}
                        chromaticAberration={0.05}
                        anisotropy={0.1}
                        distortion={0}
                        distortionScale={0}
                        temporalDistortion={0}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor="#1E5F74" // Inner dark teal
                        color="#FFFFFF"
                        transmission={0.9}
                        roughness={0.1}
                    />
                </Icosahedron>

                {/* Central energetic spark */}
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color="#BFA67F" />
                    <pointLight color="#BFA67F" intensity={5} distance={10} decay={2} />
                </mesh>
            </Float>
        </group>
    );
};
