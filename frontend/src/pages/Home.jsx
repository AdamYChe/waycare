import HospitalViewer from "../components/HospitalViewer";

function Home() {
    return (
        <>
            <div style={{width: '100vw', height: '100vh'}}>
                <h1>Home</h1>
                <div style={{width: '66.6667%', aspectRatio: '16/9'}}>
                    <HospitalViewer/>
                </div>
            </div>
        </>
    )
}

export default Home;