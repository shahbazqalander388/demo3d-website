import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Shield, Zap, Sparkles, RotateCw, Lightbulb, Camera, Check, Compass, Sliders } from 'lucide-react';

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);
  const [paintFinish, setPaintFinish] = useState('gloss'); // 'gloss', 'matte', 'metallic'
  const [lightingPreset, setLightingPreset] = useState('studio'); // 'studio', 'warm', 'dramatic'
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeCameraView, setActiveCameraView] = useState('front-three-quarter'); // 'front-three-quarter', 'side-profile', 'rear-angle'
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Three.js internal references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const carGroupRef = useRef(null);
  const bodyMaterialsRef = useRef([]);
  const lightsRef = useRef({});
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, lastX: 0 });
  const cameraTargetPos = useRef(new THREE.Vector3(0, 2.0, 7.2));
  const cameraLookAtPos = useRef(new THREE.Vector3(0, 0.4, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene with clean studio fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf6f7f9);
    scene.fog = new THREE.FogExp2(0xf6f7f9, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.copy(cameraTargetPos.current);
    camera.lookAt(cameraLookAtPos.current);
    cameraRef.current = camera;

    // 3. Renderer with soft PCF shadows and luxury studio tone-mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Configuration (Designed for pristine light automotive studios)
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Main Studio Overhead Softbox
    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    mainKeyLight.position.set(4, 9, 5);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.bias = -0.0001;
    mainKeyLight.shadow.camera.near = 0.5;
    mainKeyLight.shadow.camera.far = 25;
    mainKeyLight.shadow.camera.left = -5;
    mainKeyLight.shadow.camera.right = 5;
    mainKeyLight.shadow.camera.top = 5;
    mainKeyLight.shadow.camera.bottom = -5;
    mainKeyLight.shadow.radius = 3;
    scene.add(mainKeyLight);

    // Rim / Contour Silhouette Light (Gives the obsidian car its gorgeous outline)
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.8);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xf0f4f8, 1.2);
    fillLight.position.set(5, 3, -4);
    scene.add(fillLight);

    // Luxury Warm Ground Floor Bounce
    const floorBounce = new THREE.PointLight(0xfff7ed, 0.8, 10);
    floorBounce.position.set(0, 0.2, 0);
    scene.add(floorBounce);

    // Vehicle Headlight Spotlights
    const leftHeadlight = new THREE.SpotLight(0xffffff, 3.5, 12, Math.PI / 7, 0.5, 1);
    leftHeadlight.position.set(-0.82, 0.65, 2.15);
    leftHeadlight.target.position.set(-1.0, 0.1, 7.5);
    scene.add(leftHeadlight);
    scene.add(leftHeadlight.target);

    const rightHeadlight = new THREE.SpotLight(0xffffff, 3.5, 12, Math.PI / 7, 0.5, 1);
    rightHeadlight.position.set(0.82, 0.65, 2.15);
    rightHeadlight.target.position.set(1.0, 0.1, 7.5);
    scene.add(rightHeadlight);
    scene.add(rightHeadlight.target);

    lightsRef.current = {
      ambientLight,
      mainKeyLight,
      rimLight,
      fillLight,
      floorBounce,
      leftHeadlight,
      rightHeadlight
    };

    // 5. Studio Stage / Architectural Floor
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf5f6f8,
      roughness: 0.35,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ground Contact Shadow Radial Decal (Gives real visual weight underneath the car)
    const shadowGeo = new THREE.PlaneGeometry(3.6, 5.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(10, 10, 15, 0.55)');
    gradient.addColorStop(0.5, 'rgba(10, 10, 15, 0.25)');
    gradient.addColorStop(1, 'rgba(10, 10, 15, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowPlaneMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.002;
    scene.add(shadowMesh);

    // Architectural Minimalist Floor Grid & Concentric Rings
    const studioGrid = new THREE.GridHelper(24, 24, 0x09090b, 0xe2e8f0);
    studioGrid.position.y = 0.003;
    scene.add(studioGrid);

    const ringGeo = new THREE.RingGeometry(3.2, 3.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.005;
    scene.add(ringMesh);

    // 6. BUILD HIGH-END ALL-BLACK LUXURY SPORTS SEDAN
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;
    bodyMaterialsRef.current = [];

    // Metallic Obsidian Clearcoat Paint
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: 0x070709,
      metalness: 0.96,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.98,
    });
    bodyMaterialsRef.current.push(carPaintMat);

    // Privacy Limousine Glass
    const privacyGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      metalness: 0.9,
      roughness: 0.02,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.95,
      clearcoat: 1.0
    });

    // Dark Chrome / Satin Black Trim
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f22,
      metalness: 0.92,
      roughness: 0.18
    });

    // Front DRL White Xenon LED
    const ledWhiteMat = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    // Rear Monolithic Ruby LED Lightbar
    const ledRubyMat = new THREE.MeshBasicMaterial({
      color: 0xef233c
    });

    // Dark Gunmetal Forged Alloy Rim
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x151518,
      metalness: 0.95,
      roughness: 0.15
    });

    // Brembo Champagne Gold Caliper
    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25
    });

    // Drilled Brake Disc Steel
    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0x9ca3af,
      metalness: 0.9,
      roughness: 0.3
    });

    // Tire Rubber
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.05
    });

    // --- SCULPTED CAR BODY PARTS ---

    // 1. Lower Main Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(1.92, 0.44, 4.45);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, carPaintMat);
    lowerBody.position.set(0, 0.44, 0);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // 2. Sculpted Hood / Bonnet with Subtle Power Bulge
    const hoodGeo = new THREE.BoxGeometry(1.84, 0.14, 1.4);
    const hood = new THREE.Mesh(hoodGeo, carPaintMat);
    hood.position.set(0, 0.62, 1.35);
    hood.rotation.x = -0.07;
    hood.castShadow = true;
    carGroup.add(hood);

    // 3. Front Grille with Dark Chrome Surround
    const grilleSurroundGeo = new THREE.BoxGeometry(1.25, 0.32, 0.15);
    const grilleSurround = new THREE.Mesh(grilleSurroundGeo, darkChromeMat);
    grilleSurround.position.set(0, 0.46, 2.22);
    carGroup.add(grilleSurround);

    // Front Grille Mesh Slats
    const grilleMeshGeo = new THREE.BoxGeometry(1.15, 0.24, 0.05);
    const grilleMesh = new THREE.Mesh(grilleMeshGeo, new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.6 }));
    grilleMesh.position.set(0, 0.46, 2.27);
    carGroup.add(grilleMesh);

    // Discreet Emblem on Grille
    const emblemGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    const emblem = new THREE.Mesh(emblemGeo, new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.1 }));
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, 0.52, 2.31);
    carGroup.add(emblem);

    // 4. Aggressive Front Lower Aero Splitter
    const splitterGeo = new THREE.BoxGeometry(1.88, 0.08, 0.45);
    const splitter = new THREE.Mesh(splitterGeo, darkChromeMat);
    splitter.position.set(0, 0.22, 2.15);
    splitter.castShadow = true;
    carGroup.add(splitter);

    // 5. Dual LED Projector Headlight Pods with Crystal DRL Strip
    const leftDrlGeo = new THREE.BoxGeometry(0.55, 0.05, 0.2);
    const leftDrl = new THREE.Mesh(leftDrlGeo, ledWhiteMat);
    leftDrl.position.set(-0.65, 0.62, 2.15);
    carGroup.add(leftDrl);

    const rightDrlGeo = new THREE.BoxGeometry(0.55, 0.05, 0.2);
    const rightDrl = new THREE.Mesh(rightDrlGeo, ledWhiteMat);
    rightDrl.position.set(0.65, 0.62, 2.15);
    carGroup.add(rightDrl);

    // Crystal Projector Lenses
    const lensGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
    const leftLens = new THREE.Mesh(lensGeo, lensMat);
    leftLens.rotation.x = Math.PI / 2;
    leftLens.position.set(-0.68, 0.55, 2.22);
    carGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, lensMat);
    rightLens.rotation.x = Math.PI / 2;
    rightLens.position.set(0.68, 0.55, 2.22);
    carGroup.add(rightLens);

    // 6. Fastback Cabin / Glasshouse
    const cabinGeo = new THREE.BoxGeometry(1.68, 0.52, 2.5);
    const cabin = new THREE.Mesh(cabinGeo, privacyGlassMat);
    cabin.position.set(0, 0.88, -0.15);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Panoramic Roof Shell with Satin Obsidian Pillar Supports
    const roofGeo = new THREE.BoxGeometry(1.58, 0.07, 2.15);
    const roof = new THREE.Mesh(roofGeo, carPaintMat);
    roof.position.set(0, 1.14, -0.15);
    roof.castShadow = true;
    carGroup.add(roof);

    // Sleek Windshield Pillars (A-Pillars)
    const aPillarGeo = new THREE.BoxGeometry(0.08, 0.48, 0.12);
    const leftAPillar = new THREE.Mesh(aPillarGeo, carPaintMat);
    leftAPillar.position.set(-0.8, 0.88, 0.95);
    leftAPillar.rotation.x = 0.55;
    carGroup.add(leftAPillar);

    const rightAPillar = new THREE.Mesh(aPillarGeo, carPaintMat);
    rightAPillar.position.set(0.8, 0.88, 0.95);
    rightAPillar.rotation.x = 0.55;
    carGroup.add(rightAPillar);

    // 7. Aerodynamic Side Mirrors
    const mirrorStemGeo = new THREE.BoxGeometry(0.12, 0.04, 0.06);
    const mirrorHousingGeo = new THREE.BoxGeometry(0.24, 0.1, 0.14);

    const leftMirrorGroup = new THREE.Group();
    const leftMirrorStem = new THREE.Mesh(mirrorStemGeo, darkChromeMat);
    const leftMirrorHousing = new THREE.Mesh(mirrorHousingGeo, carPaintMat);
    leftMirrorHousing.position.set(-0.12, 0, 0);
    leftMirrorGroup.add(leftMirrorStem, leftMirrorHousing);
    leftMirrorGroup.position.set(-0.95, 0.86, 0.85);
    carGroup.add(leftMirrorGroup);

    const rightMirrorGroup = new THREE.Group();
    const rightMirrorStem = new THREE.Mesh(mirrorStemGeo, darkChromeMat);
    const rightMirrorHousing = new THREE.Mesh(mirrorHousingGeo, carPaintMat);
    rightMirrorHousing.position.set(0.12, 0, 0);
    rightMirrorGroup.add(rightMirrorStem, rightMirrorHousing);
    rightMirrorGroup.position.set(0.95, 0.86, 0.85);
    carGroup.add(rightMirrorGroup);

    // 8. Sculpted Side Skirts
    const leftSkirtGeo = new THREE.BoxGeometry(0.1, 0.14, 2.65);
    const leftSkirt = new THREE.Mesh(leftSkirtGeo, darkChromeMat);
    leftSkirt.position.set(-0.96, 0.28, 0);
    carGroup.add(leftSkirt);

    const rightSkirtGeo = new THREE.BoxGeometry(0.1, 0.14, 2.65);
    const rightSkirt = new THREE.Mesh(rightSkirtGeo, darkChromeMat);
    rightSkirt.position.set(0.96, 0.28, 0);
    carGroup.add(rightSkirt);

    // 9. Rear Decklid Ducktail Lip Spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.72, 0.08, 0.35);
    const spoiler = new THREE.Mesh(spoilerGeo, carPaintMat);
    spoiler.position.set(0, 0.74, -2.15);
    carGroup.add(spoiler);

    // 10. Monolithic Full-Width Rear LED Tail Lightbar
    const rearLightbarGeo = new THREE.BoxGeometry(1.78, 0.06, 0.06);
    const rearLightbar = new THREE.Mesh(rearLightbarGeo, ledRubyMat);
    rearLightbar.position.set(0, 0.69, -2.23);
    carGroup.add(rearLightbar);

    // 11. Rear Aerodynamic Diffuser & Dual Dark-Chrome Exhaust Tips
    const diffuserGeo = new THREE.BoxGeometry(1.82, 0.22, 0.38);
    const diffuser = new THREE.Mesh(diffuserGeo, darkChromeMat);
    diffuser.position.set(0, 0.28, -2.18);
    carGroup.add(diffuser);

    // Dual Exhaust Tips
    const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
    const leftExhaust = new THREE.Mesh(exhaustGeo, darkChromeMat);
    leftExhaust.rotation.x = Math.PI / 2;
    leftExhaust.position.set(-0.65, 0.25, -2.25);
    carGroup.add(leftExhaust);

    const rightExhaust = new THREE.Mesh(exhaustGeo, darkChromeMat);
    rightExhaust.rotation.x = Math.PI / 2;
    rightExhaust.position.set(0.65, 0.25, -2.25);
    carGroup.add(rightExhaust);

    // 12. 4 PRECISION WHEELS (FORGED ALLOY RIMS + ROTORS + GOLD CALIPERS)
    const wheelPositions = [
      [-0.96, 0.36, 1.35],  // Front Left
      [0.96, 0.36, 1.35],   // Front Right
      [-0.96, 0.36, -1.35], // Rear Left
      [0.96, 0.36, -1.35],  // Rear Right
    ];

    const wheelMeshes = [];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      // Rubber Tire
      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.25, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Forged Alloy Wheel Rim
      const rimGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.26, 24);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      // Spoke Details (Multi-Spoke Star)
      for (let s = 0; s < 5; s++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, 0.24, 0.265);
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        spoke.rotation.x = (s * Math.PI) / 2.5;
        wheelGroup.add(spoke);
      }

      // Brake Rotor Disc
      const rotorGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.04, 24);
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = x > 0 ? -0.06 : 0.06;
      wheelGroup.add(rotor);

      // Brembo Champagne Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.13, 0.1);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(x > 0 ? -0.06 : 0.06, 0.14, 0);
      wheelGroup.add(caliper);

      carGroup.add(wheelGroup);
      wheelMeshes.push(wheelGroup);
    });

    carGroup.position.y = 0.02;
    scene.add(carGroup);

    // 7. Mouse and Drag Interaction
    const handleMouseDown = (e) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;

      if (mouseRef.current.isDragging && carGroupRef.current) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        carGroupRef.current.rotation.y += deltaX * 0.008;
        mouseRef.current.lastX = e.clientX;
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Turntable Auto-Rotation
      if (carGroupRef.current) {
        if (autoRotate && !mouseRef.current.isDragging) {
          carGroupRef.current.rotation.y += 0.006;
          carGroupRef.current.rotation.x = mouseRef.current.y * 0.08;
        } else if (!autoRotate && !mouseRef.current.isDragging) {
          // Interactive subtle tilt towards cursor
          carGroupRef.current.rotation.x = mouseRef.current.y * 0.15;
        }

        // Suspension breathing effect
        carGroupRef.current.position.y = 0.02 + Math.sin(elapsedTime * 1.8) * 0.01;
      }

      // Smooth Camera Positioning transition
      camera.position.lerp(cameraTargetPos.current, 0.05);
      camera.lookAt(cameraLookAtPos.current);

      // Subtle dynamic camera parallax
      camera.position.x += mouseRef.current.x * 0.08;
      camera.position.y += mouseRef.current.y * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Handle Paint Finish Updates
  useEffect(() => {
    bodyMaterialsRef.current.forEach((mat) => {
      if (!mat) return;
      if (paintFinish === 'gloss') {
        mat.color.setHex(0x070709);
        mat.metalness = 0.96;
        mat.roughness = 0.08;
        mat.clearcoat = 1.0;
        mat.clearcoatRoughness = 0.04;
      } else if (paintFinish === 'matte') {
        mat.color.setHex(0x101013);
        mat.metalness = 0.45;
        mat.roughness = 0.52;
        mat.clearcoat = 0.15;
        mat.clearcoatRoughness = 0.2;
      } else if (paintFinish === 'metallic') {
        mat.color.setHex(0x0a0c10);
        mat.metalness = 0.98;
        mat.roughness = 0.18;
        mat.clearcoat = 0.95;
        mat.clearcoatRoughness = 0.08;
      }
    });
  }, [paintFinish]);

  // Handle Studio Lighting Presets
  useEffect(() => {
    if (!lightsRef.current.mainKeyLight) return;
    const { ambientLight, mainKeyLight, rimLight, fillLight, floorBounce } = lightsRef.current;

    if (lightingPreset === 'studio') {
      ambientLight.intensity = 1.4;
      ambientLight.color.setHex(0xffffff);
      mainKeyLight.intensity = 2.6;
      mainKeyLight.color.setHex(0xffffff);
      rimLight.intensity = 2.8;
      rimLight.color.setHex(0xffffff);
      fillLight.intensity = 1.2;
      floorBounce.color.setHex(0xfff7ed);
    } else if (lightingPreset === 'warm') {
      ambientLight.intensity = 1.2;
      ambientLight.color.setHex(0xfef3c7);
      mainKeyLight.intensity = 2.8;
      mainKeyLight.color.setHex(0xfde68a);
      rimLight.intensity = 3.2;
      rimLight.color.setHex(0xf59e0b);
      fillLight.intensity = 1.0;
      floorBounce.color.setHex(0xf59e0b);
    } else if (lightingPreset === 'dramatic') {
      ambientLight.intensity = 0.7;
      ambientLight.color.setHex(0xe2e8f0);
      mainKeyLight.intensity = 3.8;
      mainKeyLight.color.setHex(0xffffff);
      rimLight.intensity = 4.2;
      rimLight.color.setHex(0xffffff);
      fillLight.intensity = 0.4;
      floorBounce.color.setHex(0x94a3b8);
    }
  }, [lightingPreset]);

  // Handle Camera Presets
  const changeCameraView = (view) => {
    setActiveCameraView(view);
    if (view === 'front-three-quarter') {
      cameraTargetPos.current.set(0, 2.0, 7.2);
      cameraLookAtPos.current.set(0, 0.4, 0);
    } else if (view === 'side-profile') {
      cameraTargetPos.current.set(-6.8, 1.4, 0.2);
      cameraLookAtPos.current.set(0, 0.4, 0);
    } else if (view === 'rear-angle') {
      cameraTargetPos.current.set(4.2, 1.8, -5.8);
      cameraLookAtPos.current.set(0, 0.4, 0);
    }
  };

  // Toggle Xenon Beams
  useEffect(() => {
    if (!lightsRef.current.leftHeadlight) return;
    const { leftHeadlight, rightHeadlight } = lightsRef.current;
    leftHeadlight.visible = headlightsOn;
    rightHeadlight.visible = headlightsOn;
  }, [headlightsOn]);

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] rounded-3xl overflow-hidden border border-neutral-200/90 bg-[#f6f7f9] shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the vehicle"
      />

      {/* Top Left Studio Specification Badge */}
      <div className="absolute top-6 left-6 md:left-8 pointer-events-none select-none">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] tracking-[0.25em] font-mono uppercase font-bold text-neutral-800">
            3D Studio Viewport
          </span>
        </div>
        <div className="text-xs font-mono text-neutral-500 tracking-wider">
          Specification: Obsidian Executive V12 Spec // 621 hp
        </div>
      </div>

      {/* Interactive Tactical Hotspots */}
      <div className="absolute top-24 left-6 md:left-8 space-y-2.5 pointer-events-auto">
        {/* Hotspot 1: Armor */}
        <div
          onClick={() => setActiveHotspot(activeHotspot === 'armor' ? null : 'armor')}
          className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 shadow-sm hover:border-neutral-900 transition cursor-pointer"
        >
          <Shield className="w-3.5 h-3.5 text-neutral-900 group-hover:scale-110 transition" />
          <span className="text-xs font-mono tracking-wider text-neutral-800 font-medium">
            Ballistic Core <span className="text-amber-700 font-bold ml-1 text-[10px]">[CEN B6]</span>
          </span>
        </div>
        {activeHotspot === 'armor' && (
          <div className="p-4 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200 text-xs text-neutral-600 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-neutral-900 uppercase font-mono">Ballistic Monocoque</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono">Certified</span>
            </div>
            Reinforced multi-layer composite armor and multi-pane ballistic glass engineered for maximum kinetic dissipation and dignitary safety.
          </div>
        )}

        {/* Hotspot 2: Paint Finish */}
        <div
          onClick={() => setActiveHotspot(activeHotspot === 'finish' ? null : 'finish')}
          className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 shadow-sm hover:border-neutral-900 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition" />
          <span className="text-xs font-mono tracking-wider text-neutral-800 font-medium">
            Obsidian Clearcoat <span className="text-neutral-500 font-bold ml-1 text-[10px]">[Mirror]</span>
          </span>
        </div>
        {activeHotspot === 'finish' && (
          <div className="p-4 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200 text-xs text-neutral-600 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-neutral-900 uppercase font-mono">Triple-Coat Lacquer</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono">0.05% Refl</span>
            </div>
            Micro-pigmented deep black formulation hand-buffed with ceramic sealants for pristine optical clarity and scratch resistance.
          </div>
        )}
      </div>

      {/* Floating Precision Specs on Right */}
      <div className="absolute top-24 right-6 md:right-8 flex flex-col items-end gap-2.5 pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-sm text-right">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Acceleration</div>
            <div className="text-xs font-bold text-neutral-900 font-mono">0-60 MPH // 3.9s</div>
          </div>
          <span className="w-1.5 h-6 bg-neutral-900 rounded-full" />
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-sm text-right">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Cabin Acoustics</div>
            <div className="text-xs font-bold text-amber-700 font-mono">38 dB Sound Isolation</div>
          </div>
          <span className="w-1.5 h-6 bg-amber-600 rounded-full" />
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-sm text-right">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Mobilization Time</div>
            <div className="text-xs font-bold text-emerald-600 font-mono">&lt; 9.4 MIN DISPATCH</div>
          </div>
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
        </div>
      </div>

      {/* Bottom Interactive Studio Controls Dock */}
      <div className="absolute bottom-6 inset-x-4 md:inset-x-8 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-neutral-200/90 shadow-lg">
        {/* Left: Finish Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase text-neutral-500 mr-1 hidden sm:inline">
            Finish:
          </span>
          <button
            onClick={() => setPaintFinish('gloss')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
              paintFinish === 'gloss'
                ? 'bg-neutral-900 text-white font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-400" />
            Gloss Obsidian
          </button>
          <button
            onClick={() => setPaintFinish('matte')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
              paintFinish === 'matte'
                ? 'bg-neutral-900 text-white font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            Satin Matte
          </button>
          <button
            onClick={() => setPaintFinish('metallic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
              paintFinish === 'metallic'
                ? 'bg-neutral-900 text-white font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600" />
            Metallic Pearl
          </button>
        </div>

        {/* Center: Camera Angles */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-neutral-100 border border-neutral-200">
          <button
            onClick={() => changeCameraView('front-three-quarter')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
              activeCameraView === 'front-three-quarter'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Front 3/4
          </button>
          <button
            onClick={() => changeCameraView('side-profile')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
              activeCameraView === 'side-profile'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => changeCameraView('rear-angle')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
              activeCameraView === 'rear-angle'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Rear
          </button>
        </div>

        {/* Right: Lighting & Spin Toggles */}
        <div className="flex items-center gap-2">
          {/* Headlights Toggle */}
          <button
            onClick={() => setHeadlightsOn(!headlightsOn)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 border ${
              headlightsOn
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-200 hover:text-neutral-900'
            }`}
            title="Toggle Xenon Headlights"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Beams {headlightsOn ? 'ON' : 'OFF'}
          </button>

          {/* Studio Lighting Selector */}
          <button
            onClick={() =>
              setLightingPreset(
                lightingPreset === 'studio'
                  ? 'warm'
                  : lightingPreset === 'warm'
                  ? 'dramatic'
                  : 'studio'
              )
            }
            className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-1.5"
            title="Cycle Studio Lighting Mood"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span className="capitalize">{lightingPreset}</span>
          </button>

          {/* Auto Rotation Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 border ${
              autoRotate
                ? 'bg-amber-50 text-amber-900 border-amber-200 font-semibold'
                : 'bg-white text-neutral-600 border-neutral-200 hover:text-neutral-900'
            }`}
            title="Toggle 360 Turntable Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? 'Turntable' : 'Manual'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
