import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function HospitalViewer() {
    const {scene} = useGLTF("./src/assets/hospital.glb")

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <Canvas
                shadows={true}
                camera={{ position: [3, 3, 3], fov: 50 }}
                style = {{ flex: 1, background: "#666666" }}
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