import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Octahedron, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export const CompassNeedle = () => {
    const groupRef = useRef<THREE.Group>(null);
    const needleRef = useRef<THREE.Mesh>(null);
    const outerRingRef = useRef<THREE.Mesh>(null);

    const mouse = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (outerRingRef.current) {
            outerRingRef.current.rotation.z = t * 0.2;
            outerRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
        }

        if (needleRef.current) {
            mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.pointer.x * Math.PI) / 4, 0.05);
            mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.pointer.y * Math.PI) / 4, 0.05);

            needleRef.current.rotation.y = mouse.current.x + Math.sin(t * 1.2) * 0.05;
            needleRef.current.rotation.x = -mouse.current.y + Math.cos(t * 0.8) * 0.05;
            needleRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef} dispose={null}>
            <Float
                speed={2.5}
                rotationIntensity={0.2}
                floatIntensity={0.5}
            >
                <mesh ref={outerRingRef}>
                    <torusGeometry args={[2.5, 0.05, 16, 64]} />
                    <MeshDistortMaterial
                        color="#BFA67F"
                        metalness={0.9}
                        roughness={0.1}
                        clearcoat={0.1}
                        distort={0.1}
                        speed={2}
                    />
                </mesh>

                <Octahedron ref={needleRef} args={[1.5, 0]}>
                    <meshPhysicalMaterial
                        color="#1E5F74"
                        metalness={0.7}
                        roughness={0.2}
                        transmission={0.5}
                        thickness={1}
                        envMapIntensity={2}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </Octahedron>

                <mesh position={[0, 1.6, 0]}>
                    <coneGeometry args={[0.2, 0.5, 4]} />
                    <meshPhysicalMaterial
                        color="#BFA67F"
                        metalness={1}
                        roughness={0.2}
                        emissive="#BFA67F"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            </Float>
        </group>
    );
};
