import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCarStage({
  paintColor = '#070709',
  paintFinish = 'gloss',
  autoRotate = false,
  headlightsOn = true,
  onRotateChange = null
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const carGroupRef = useRef(null);
  const bodyMaterialsRef = useRef([]);
  const lightsRef = useRef({});
  const animationFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const [internalAutoRotate, setInternalAutoRotate] = useState(autoRotate);
  const [currentAngleDeg, setCurrentAngleDeg] = useState(0);

  useEffect(() => {
    setInternalAutoRotate(autoRotate);
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c0c0e);
    scene.fog = new THREE.FogExp2(0x0c0c0e, 0.04);

    // 2. Camera (Auto-distance for Mobile vs Desktop)
    const isMobile = width < 640 || width / height < 1;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    camera.position.set(0, 1.8, isMobile ? 8.8 : 6.8);
    camera.lookAt(0, 0.35, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.2);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    fillLight.position.set(5, 2, -4);
    scene.add(fillLight);

    const floorBounce = new THREE.PointLight(0xffffff, 0.6, 12);
    floorBounce.position.set(0, 0.2, 0);
    scene.add(floorBounce);

    // Headlight Spotlights
    const leftHeadlight = new THREE.SpotLight(0xffffff, headlightsOn ? 3.0 : 0, 15, Math.PI / 7, 0.5, 1);
    leftHeadlight.position.set(-0.8, 0.6, 2.15);
    leftHeadlight.target.position.set(-0.9, 0.1, 7.5);
    scene.add(leftHeadlight);
    scene.add(leftHeadlight.target);

    const rightHeadlight = new THREE.SpotLight(0xffffff, headlightsOn ? 3.0 : 0, 15, Math.PI / 7, 0.5, 1);
    rightHeadlight.position.set(0.8, 0.6, 2.15);
    rightHeadlight.target.position.set(0.9, 0.1, 7.5);
    scene.add(rightHeadlight);
    scene.add(rightHeadlight.target);

    lightsRef.current = { leftHeadlight, rightHeadlight };

    // 5. Studio Stage Floor
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x121216,
      roughness: 0.35,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Concentric Turntable Rings
    const ringGeo = new THREE.RingGeometry(3.18, 3.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.004;
    scene.add(ring);

    const innerRingGeo = new THREE.RingGeometry(1.6, 1.62, 48);
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.004;
    scene.add(innerRing);

    // Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.6, 5.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.002;
    scene.add(shadowMesh);

    // 6. BUILD HIGH-END OBSIDIAN VEHICLE GROUP
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;
    bodyMaterialsRef.current = [];

    // Metallic Obsidian Clearcoat Paint
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(paintColor),
      metalness: paintFinish === 'matte' ? 0.3 : 0.95,
      roughness: paintFinish === 'matte' ? 0.6 : 0.08,
      clearcoat: paintFinish === 'matte' ? 0.1 : 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.98
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

    // Dark Chrome Trim
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.92,
      roughness: 0.18
    });

    // Xenon White LED
    const ledWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    // Ruby Red LED Lightbar
    const ledRubyMat = new THREE.MeshBasicMaterial({ color: 0xef233c });

    // Rims & Tires
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.95, roughness: 0.15 });
    const caliperMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 });
    const rotorMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.9, roughness: 0.3 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85, metalness: 0.05 });

    // Chassis Lower Body
    const lowerBodyGeo = new THREE.BoxGeometry(1.92, 0.44, 4.45);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, carPaintMat);
    lowerBody.position.set(0, 0.44, 0);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // Hood / Bonnet
    const hoodGeo = new THREE.BoxGeometry(1.84, 0.14, 1.4);
    const hood = new THREE.Mesh(hoodGeo, carPaintMat);
    hood.position.set(0, 0.62, 1.35);
    hood.rotation.x = -0.07;
    hood.castShadow = true;
    carGroup.add(hood);

    // Front Grille
    const grilleGeo = new THREE.BoxGeometry(1.25, 0.32, 0.15);
    const grille = new THREE.Mesh(grilleGeo, darkChromeMat);
    grille.position.set(0, 0.46, 2.22);
    carGroup.add(grille);

    // Grille Gold Emblem
    const emblemGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    const emblem = new THREE.Mesh(emblemGeo, caliperMat);
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, 0.52, 2.31);
    carGroup.add(emblem);

    // Front Splitter
    const splitterGeo = new THREE.BoxGeometry(1.88, 0.08, 0.45);
    const splitter = new THREE.Mesh(splitterGeo, darkChromeMat);
    splitter.position.set(0, 0.22, 2.15);
    carGroup.add(splitter);

    // Headlights DRL Pods
    const drlGeo = new THREE.BoxGeometry(0.55, 0.05, 0.2);
    const leftDrl = new THREE.Mesh(drlGeo, ledWhiteMat);
    leftDrl.position.set(-0.65, 0.62, 2.15);
    const rightDrl = new THREE.Mesh(drlGeo, ledWhiteMat);
    rightDrl.position.set(0.65, 0.62, 2.15);
    carGroup.add(leftDrl, rightDrl);

    // Cabin Glasshouse
    const cabinGeo = new THREE.BoxGeometry(1.68, 0.52, 2.5);
    const cabin = new THREE.Mesh(cabinGeo, privacyGlassMat);
    cabin.position.set(0, 0.88, -0.15);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Shell
    const roofGeo = new THREE.BoxGeometry(1.58, 0.07, 2.15);
    const roof = new THREE.Mesh(roofGeo, carPaintMat);
    roof.position.set(0, 1.14, -0.15);
    roof.castShadow = true;
    carGroup.add(roof);

    // Side Mirrors
    const mirrorStemGeo = new THREE.BoxGeometry(0.12, 0.04, 0.06);
    const mirrorHousingGeo = new THREE.BoxGeometry(0.24, 0.1, 0.14);
    const leftMirrorGroup = new THREE.Group();
    leftMirrorGroup.add(new THREE.Mesh(mirrorStemGeo, darkChromeMat), new THREE.Mesh(mirrorHousingGeo, carPaintMat));
    leftMirrorGroup.position.set(-0.95, 0.86, 0.85);
    const rightMirrorGroup = new THREE.Group();
    rightMirrorGroup.add(new THREE.Mesh(mirrorStemGeo, darkChromeMat), new THREE.Mesh(mirrorHousingGeo, carPaintMat));
    rightMirrorGroup.position.set(0.95, 0.86, 0.85);
    carGroup.add(leftMirrorGroup, rightMirrorGroup);

    // Rear Lip Spoiler & Ruby Lightbar
    const spoilerGeo = new THREE.BoxGeometry(1.72, 0.08, 0.35);
    const spoiler = new THREE.Mesh(spoilerGeo, carPaintMat);
    spoiler.position.set(0, 0.74, -2.15);
    carGroup.add(spoiler);

    const rearLightbarGeo = new THREE.BoxGeometry(1.78, 0.06, 0.06);
    const rearLightbar = new THREE.Mesh(rearLightbarGeo, ledRubyMat);
    rearLightbar.position.set(0, 0.69, -2.23);
    carGroup.add(rearLightbar);

    // Rear Diffuser & Exhausts
    const diffuserGeo = new THREE.BoxGeometry(1.82, 0.22, 0.38);
    const diffuser = new THREE.Mesh(diffuserGeo, darkChromeMat);
    diffuser.position.set(0, 0.28, -2.18);
    carGroup.add(diffuser);

    // 4 Wheels
    const wheelPositions = [
      [-0.96, 0.36, 1.35],
      [0.96, 0.36, 1.35],
      [-0.96, 0.36, -1.35],
      [0.96, 0.36, -1.35],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.25, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rimGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.26, 24);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      for (let s = 0; s < 5; s++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, 0.24, 0.265);
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        spoke.rotation.x = (s * Math.PI) / 2.5;
        wheelGroup.add(spoke);
      }

      const rotorGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.04, 24);
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = x > 0 ? -0.06 : 0.06;
      wheelGroup.add(rotor);

      const caliperGeo = new THREE.BoxGeometry(0.08, 0.13, 0.1);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(x > 0 ? -0.06 : 0.06, 0.14, 0);
      wheelGroup.add(caliper);

      carGroup.add(wheelGroup);
    });

    carGroup.position.y = 0.02;
    scene.add(carGroup);

    // 7. Hand Drag Events (Touch & Pointer)
    const dom = renderer.domElement;

    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      dom.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current || !carGroupRef.current) return;
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      // Rotate Y axis (horizontal 360 degree spin)
      carGroupRef.current.rotation.y += deltaX * 0.008;

      // Subtle tilt X axis (vertical angle pitch, clamped)
      const newPitch = carGroupRef.current.rotation.x + deltaY * 0.004;
      carGroupRef.current.rotation.x = Math.max(-0.2, Math.min(0.3, newPitch));

      const rawDeg = ((carGroupRef.current.rotation.y * 180) / Math.PI) % 360;
      const normalizedDeg = Math.round(rawDeg < 0 ? rawDeg + 360 : rawDeg);
      setCurrentAngleDeg(normalizedDeg);
      if (onRotateChange) onRotateChange(normalizedDeg);
    };

    const onPointerUp = (e) => {
      isDraggingRef.current = false;
      dom.releasePointerCapture?.(e.pointerId);
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);

    // 8. Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      const isMob = w < 640 || w / h < 1;
      camera.position.z = isMob ? 8.8 : 6.8;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (carGroupRef.current) {
        if (internalAutoRotate && !isDraggingRef.current) {
          carGroupRef.current.rotation.y += 0.006;
          const rawDeg = ((carGroupRef.current.rotation.y * 180) / Math.PI) % 360;
          const normalizedDeg = Math.round(rawDeg < 0 ? rawDeg + 360 : rawDeg);
          setCurrentAngleDeg(normalizedDeg);
          if (onRotateChange) onRotateChange(normalizedDeg);
        }

        // Suspension breathing effect
        carGroupRef.current.position.y = 0.02 + Math.sin(elapsedTime * 1.6) * 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [internalAutoRotate]);

  // Update headlights
  useEffect(() => {
    if (lightsRef.current.leftHeadlight && lightsRef.current.rightHeadlight) {
      lightsRef.current.leftHeadlight.intensity = headlightsOn ? 3.0 : 0;
      lightsRef.current.rightHeadlight.intensity = headlightsOn ? 3.0 : 0;
    }
  }, [headlightsOn]);

  // Update materials when color or finish changes
  useEffect(() => {
    bodyMaterialsRef.current.forEach((mat) => {
      mat.color.set(paintColor);
      mat.metalness = paintFinish === 'matte' ? 0.3 : 0.95;
      mat.roughness = paintFinish === 'matte' ? 0.6 : 0.08;
      mat.clearcoat = paintFinish === 'matte' ? 0.1 : 1.0;
    });
  }, [paintColor, paintFinish]);

  const snapToAngle = (degrees) => {
    if (!carGroupRef.current) return;
    const rad = (degrees * Math.PI) / 180;
    carGroupRef.current.rotation.y = rad;
    carGroupRef.current.rotation.x = 0;
    setCurrentAngleDeg(degrees);
    if (onRotateChange) onRotateChange(degrees);
  };

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Angle Overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/70 backdrop-blur-md text-amber-400 border border-white/10">
          3D Angle: {currentAngleDeg}°
        </span>
      </div>

      {/* Quick Snap Angles */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
        {[
          { label: 'Front', deg: 0 },
          { label: '3/4', deg: 45 },
          { label: 'Side', deg: 90 },
          { label: 'Rear', deg: 180 }
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => snapToAngle(btn.deg)}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono text-neutral-300 hover:text-white hover:bg-white/10 transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
