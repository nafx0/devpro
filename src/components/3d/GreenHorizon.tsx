"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Group, Mesh } from "three";

function WindTurbine({ position, scale = 1, rotation = [0, 0, 0] }: { position: [number, number, number], scale?: number, rotation?: [number, number, number] }) {
    const bladesRef = useRef<Group>(null);

    useFrame((state, delta) => {
        if (bladesRef.current) {
            bladesRef.current.rotation.z += delta * 1; // Rotate blades
        }
    });

    return (
        <group position={position} scale={scale} rotation={rotation as [number, number, number]}>
            {/* Tower */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.05, 0.1, 4, 8]} />
                <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
            </mesh>

            {/* Nacelle */}
            <mesh position={[0, 4, 0.1]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.4]} />
                <meshStandardMaterial color="#E5E7EB" />
            </mesh>

            {/* Blades */}
            <group position={[0, 4, 0.35]} ref={bladesRef}>
                {[0, 120, 240].map((angle) => (
                    <group key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
                        <mesh position={[0, 1.2, 0]}>
                            <boxGeometry args={[0.1, 2.4, 0.05]} />
                            <meshStandardMaterial color="#F3F4F6" />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
}

function Landscape() {
    const meshRef = useRef<Mesh>(null);

    // Simple low poly terrain
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(30, 30, 15, 15);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            // Randomize z (height) slightly for low poly look
            // pos.setZ(i, Math.random() * 0.5); 
            // Better: Perlin noise or simple wave
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.5;
            pos.setZ(i, z);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    return (
        <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
            <mesh geometry={geometry} receiveShadow>
                <meshStandardMaterial
                    color="#F0FDF4"
                    flatShading
                    roughness={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Turbines scattered */}
            <WindTurbine position={[-4, -2, 1]} scale={0.8} rotation={[0.2, 0, 0]} />
            <WindTurbine position={[3, 1, 2]} scale={1.2} rotation={[0.1, 0.2, 0]} />
            <WindTurbine position={[6, -4, 0.5]} scale={0.6} rotation={[0, -0.2, 0]} />
            <WindTurbine position={[-6, 3, -1]} scale={0.9} rotation={[0.1, -0.1, 0]} />

            {/* Floating particles/clouds abstract */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[2, 5, 2]}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color="#4ADE80" transparent opacity={0.4} />
                </mesh>
            </Float>
        </group>
    );
}

export default function GreenHorizon() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-b from-oxygen-white to-[#F0FDF4]">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Ecological Lighting */}
                <ambientLight intensity={0.8} color="#ffffff" />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ADE80" />

                <Landscape />

                <Environment preset="city" />
                <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Canvas>
        </div>
    );
}
