import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from 'react';

function HospitalViewer({ object }) {
    let path = "./src/assets/hospital.glb"
    //var {scene} = useGLTF("./src/assets/hospital.glb")

    /*
    useEffect(() => {
        scene.traverse((child) => {
        if (child.isMesh) {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
        }
        });
    }, [scene]);*/

    if(object?.room === '302') path = "./src/assets/first_patient.glb"
    else if(object?.room === '305') path = "./src/assets/second_patient.glb"

    const {scene} = useGLTF(path)

    /*
    if(object === null) {scene = useGLTF("./src/assets/hospital.glb")}
    else if(object.room === '302') {scene = useGLTF("./src/assets/first_patient.glb")}
    else if(object.room === '302') {scene = useGLTF("./src/assets/second_patient.glb")}
    else {scene = useGLTF("./src/assets/hospital.glb")}
    */

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <Canvas
                shadows={true}
                camera={{ position: [25, 30, 0], fov: 50 }}
                style = {{ flex: 1, background: "#999999" }}
            >
                <ambientLight intensity={0.5}/>
                <directionalLight 
                    position={[1000, 1000, 500]} 
                    intensity={7} 
                    color="#ffe6b3" 
                    castShadow 
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />

                <primitive object={scene} scale={1} />

                <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
        </div>
    )
}

export default HospitalViewer