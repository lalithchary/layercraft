// LayerCraft - 3D STL/OBJ Viewer using Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let scene, camera, renderer, controls, currentMesh;

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileNameEl = document.getElementById('fileName');
const fileSizeEl = document.getElementById('fileSize');
const removeFileBtn = document.getElementById('removeFile');
const viewerContainer = document.getElementById('viewer-container');
const viewerCanvas = document.getElementById('viewerCanvas');
const viewerHint = document.getElementById('viewerHint');
const dimensionsOverlay = document.getElementById('dimensionsOverlay');
const modelDimensions = document.getElementById('modelDimensions');

// Hidden form fields
const hiddenFileName = document.getElementById('hiddenFileName');
const hiddenFileSize = document.getElementById('hiddenFileSize');
const hiddenDimensions = document.getElementById('hiddenDimensions');

// Initialize Three.js scene
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0F);

    // Camera
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
    camera.position.set(100, 100, 100);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: viewerCanvas,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x00E5FF, 0.3);
    backLight.position.set(-100, -50, -100);
    scene.add(backLight);

    // Grid
    const gridHelper = new THREE.GridHelper(200, 20, 0x1E293B, 0x1E293B);
    scene.add(gridHelper);

    // Start render loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function resizeViewer() {
    if (!viewerContainer.classList.contains('hidden')) {
        const width = viewerContainer.clientWidth;
        const height = viewerContainer.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
}

function loadSTL(arrayBuffer) {
    const loader = new STLLoader();
    const geometry = loader.parse(arrayBuffer);
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x00E5FF,
        specular: 0x222222,
        shininess: 60,
        flatShading: false
    });

    if (currentMesh) {
        scene.remove(currentMesh);
    }

    currentMesh = new THREE.Mesh(geometry, material);
    currentMesh.castShadow = true;
    currentMesh.receiveShadow = true;

    // Center the model
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    currentMesh.position.sub(center);

    // Move up so it sits on grid
    const yOffset = (boundingBox.max.y - boundingBox.min.y) / 2;
    currentMesh.position.y += yOffset;

    scene.add(currentMesh);

    // Fit camera to object
    fitCameraToObject(boundingBox, center);

    // Display dimensions
    const sizeX = (boundingBox.max.x - boundingBox.min.x).toFixed(1);
    const sizeY = (boundingBox.max.y - boundingBox.min.y).toFixed(1);
    const sizeZ = (boundingBox.max.z - boundingBox.min.z).toFixed(1);
    const dimText = `${sizeX} × ${sizeY} × ${sizeZ} mm`;
    modelDimensions.textContent = `Dimensions: ${dimText}`;
    hiddenDimensions.value = dimText;
}

function loadOBJ(text) {
    const loader = new OBJLoader();
    const object = loader.parse(text);

    if (currentMesh) {
        scene.remove(currentMesh);
    }

    // Apply material to all meshes in the object
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material = new THREE.MeshPhongMaterial({
                color: 0x00E5FF,
                specular: 0x222222,
                shininess: 60
            });
            child.castShadow = true;
        }
    });

    currentMesh = object;

    // Center
    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const yOffset = (box.max.y - box.min.y) / 2;
    object.position.y += yOffset;

    scene.add(currentMesh);
    fitCameraToObject(box, center);

    const sizeX = (box.max.x - box.min.x).toFixed(1);
    const sizeY = (box.max.y - box.min.y).toFixed(1);
    const sizeZ = (box.max.z - box.min.z).toFixed(1);
    const dimText = `${sizeX} × ${sizeY} × ${sizeZ} mm`;
    modelDimensions.textContent = `Dimensions: ${dimText}`;
    hiddenDimensions.value = dimText;
}

function fitCameraToObject(boundingBox, center) {
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 2;

    camera.position.set(distance * 0.7, distance * 0.5, distance * 0.7);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
}

function handleFile(file) {
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    const validFormats = ['stl', 'obj', '3mf'];

    if (!validFormats.includes(extension)) {
        alert('Unsupported format. Please upload STL, OBJ, or 3MF files.');
        return;
    }

    if (file.size > 50 * 1024 * 1024) {
        alert('File too large. Maximum size is 50MB.');
        return;
    }

    // Show file info
    fileInfo.classList.remove('hidden');
    fileNameEl.textContent = file.name;
    fileSizeEl.textContent = formatFileSize(file.size);
    hiddenFileName.value = file.name;
    hiddenFileSize.value = formatFileSize(file.size);

    // Initialize scene if not done
    if (!scene) {
        initScene();
    }

    // Show viewer
    viewerContainer.classList.remove('hidden');
    viewerHint.classList.remove('hidden');

    // Resize after showing
    setTimeout(resizeViewer, 100);

    // Load file
    const reader = new FileReader();

    if (extension === 'stl') {
        reader.onload = function(e) {
            loadSTL(e.target.result);
        };
        reader.readAsArrayBuffer(file);
    } else if (extension === 'obj') {
        reader.onload = function(e) {
            loadOBJ(e.target.result);
        };
        reader.readAsText(file);
    } else if (extension === '3mf') {
        // 3MF is a zip-based format — show message that preview isn't supported but file is accepted
        viewerContainer.classList.add('hidden');
        viewerHint.classList.add('hidden');
        modelDimensions.textContent = '3MF preview not available — file accepted for quoting';
        hiddenDimensions.value = '3MF file (dimensions calculated on review)';
    }
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function resetViewer() {
    fileInfo.classList.add('hidden');
    viewerContainer.classList.add('hidden');
    viewerHint.classList.add('hidden');
    hiddenFileName.value = '';
    hiddenFileSize.value = '';
    hiddenDimensions.value = '';

    if (currentMesh && scene) {
        scene.remove(currentMesh);
        currentMesh = null;
    }

    fileInput.value = '';
}

// Event Listeners
if (uploadArea) {
    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });
}

if (removeFileBtn) {
    removeFileBtn.addEventListener('click', resetViewer);
}

// Handle window resize
window.addEventListener('resize', resizeViewer);
