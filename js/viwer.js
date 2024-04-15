const canvas = document.getElementById("renderCanvas"); // Get the canvas element

// 페이지 로드 시 캔버스 크기를 조정합니다.
resizeCanvas();

const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 
        Math.PI / 2, Math.PI / 4, 10, 
        new BABYLON.Vector3(0, 0, 0), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    // Our built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    BABYLON.SceneLoader.ImportMeshAsync("", "glb/", "AAA.glb", scene).then((result) => {
        // 여기서 result.meshes[0]는 불러온 .glb 파일의 루트 메시입니다.
        // 필요한 변환을 적용할 수 있습니다.
        const rootMesh = result.meshes[0];
        rootMesh.position.x = 0; // 예를 들어, x 위치를 조정합니다.
        rootMesh.position.y = 0; // y 위치를 조정합니다.
        rootMesh.position.z = 0; // z 위치를 조정합니다.
    });

    return scene;
};

const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// 화면 크기에 따라 캔버스 크기를 조정하는 함수를 정의합니다.
function resizeCanvas() {
    // 뷰포트의 너비와 높이를 가져옵니다.
    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}

// 캔버스 컨테이너의 크기를 가져옵니다.
var container = document.getElementById('babylon-viewer');

// 캔버스 크기를 컨테이너에 맞춥니다.
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

// 윈도우 크기가 변경될 때마다 캔버스 크기를 조정합니다.
window.addEventListener('resize', function () {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    engine.resize();
});

// 페이지 로드 시 캔버스 크기를 조정합니다.
resizeCanvas();
