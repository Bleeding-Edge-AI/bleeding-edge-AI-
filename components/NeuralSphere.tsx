'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ParticleBrain() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const hoverRef = useRef<THREE.Vector3>(new THREE.Vector3(100, 100, 100)); // Start far away
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    const linesRef = useRef<THREE.LineSegments>(null);

    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 4 + Math.random() * 0.5; // Radius variation

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001; // Slow rotation

            // Update particles
            for (let i = 0; i < count; i++) {
                dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
        }

        // Interactive Lines Logic
        if (linesRef.current) {
            const connectDistance = 1.5;
            const linePositions = [];
            const localHover = hoverRef.current.clone().applyMatrix4(meshRef.current!.matrixWorld.clone().invert()); // Transform world hover to local space

            // Find particles near cursor
            for (let i = 0; i < count; i++) {
                const px = positions[i * 3];
                const py = positions[i * 3 + 1];
                const pz = positions[i * 3 + 2];

                const dx = px - localHover.x;
                const dy = py - localHover.y;
                const dz = pz - localHover.z;
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < connectDistance * connectDistance) {
                    // Determine color/intensity based on proximity (simulated via multiple lines to one point)
                    linePositions.push(px, py, pz);
                    linePositions.push(localHover.x, localHover.y, localHover.z);
                }
            }

            linesGeometry.setFromPoints(linePositions.map(p => {
                // We need Vector3s for setFromPoints, but we have flat array loop. 
                // Let's just usesetAttribute directly for performance usually, but THREE.BufferGeometry requires typed array
                return new THREE.Vector3(0, 0, 0); // Placeholder, doing manual attribute set below is better
            }));

            // Manual attribute update for performance
            const posArray = new Float32Array(linePositions);
            linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            linesRef.current.geometry.attributes.position.needsUpdate = true;
            // Optimization: Set drawRange
            linesRef.current.geometry.setDrawRange(0, linePositions.length / 3);
        }
    });

    return (
        <group
            onPointerMove={(e) => {
                e.stopPropagation();
                hoverRef.current.copy(e.point);
            }}
            onPointerOut={() => {
                hoverRef.current.set(100, 100, 100);
            }}
        >
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </instancedMesh>

            {/* Dynamic Lines Container */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#ff0000" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
}

export const NeuralSphere = () => {
    return (
        <div className="w-full h-[600px] bg-black relative">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <ParticleBrain />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 tracking-tighter mix-blend-difference">
                    NEURAL<br />CORE
                </h1>
            </div>
        </div>
    );
};
