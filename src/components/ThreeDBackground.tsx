import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generates random positions on a sphere surface
function ParticleCloud() {
    const ref = useRef<THREE.Points>(null!);

    const positions = useMemo(() => {
        const count = 800;
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.2 + Math.random() * 0.8;
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.04;
        ref.current.rotation.x = Math.sin(t * 0.015) * 0.12;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#c5a065"
                size={0.012}
                sizeAttenuation
                depthWrite={false}
                opacity={0.7}
            />
        </Points>
    );
}

interface ThreeDBackgroundProps {
    className?: string;
}

/**
 * Subtle 3D golden particle cloud – lazy-loaded, desktop-only.
 * Used as an atmospheric overlay on the hero/CTA sections.
 */
export const ThreeDBackground = ({ className }: ThreeDBackgroundProps) => {
    return (
        <div
            className={className}
            aria-hidden="true"
            style={{ pointerEvents: "none" }}
        >
            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 60 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.5} />
                <ParticleCloud />
            </Canvas>
        </div>
    );
};
