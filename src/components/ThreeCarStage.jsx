import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCarStage({
  vehicle = null,
  vehicleId = 'maybach-s680',
  paintColor = '#070709',
  paintFinish = 'gloss',
  autoRotate = true,
  introDuration = 7000,
  headlightsOn = true,
  onRotateChange = null
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const carGroupRef = useRef(null);
  const bodyMaterialsRef = useRef([]);
  const lightsRef = useRef({});
  const animationFrameRef = useRef(null);

  // Interaction & inertia state
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [currentAngleDeg, setCurrentAngleDeg] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(autoRotate);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const activeId = vehicle?.id || vehicleId || 'maybach-s680';

  const isAutoSpinningRef = useRef(isAutoSpinning);
  useEffect(() => {
    isAutoSpinningRef.current = isAutoSpinning;
  }, [isAutoSpinning]);

  const onRotateChangeRef = useRef(onRotateChange);
  useEffect(() => {
    onRotateChangeRef.current = onRotateChange;
  }, [onRotateChange]);

  // Intro Auto-Spin Timer on page open
  useEffect(() => {
    setIsAutoSpinning(true);
    isAutoSpinningRef.current = true;
    setIsIntroActive(true);

    const timer = setTimeout(() => {
      setIsIntroActive(false);
      // After intro time, smoothly stop unless user requested auto-spin
      if (!userInteracted) {
        setIsAutoSpinning(false);
        isAutoSpinningRef.current = false;
      }
    }, introDuration);

    return () => clearTimeout(timer);
  }, [introDuration, userInteracted, activeId]);

  useEffect(() => {
    setIsAutoSpinning(autoRotate);
    isAutoSpinningRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0a0c);
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.038);

    // 2. Camera (Auto distance adjusted for portrait/mobile vs landscape/desktop)
    const isMobile = width < 640 || width / height < 1;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    const initialZ = isMobile ? 8.8 : 6.8;
    camera.position.set(0, 1.8, initialZ);
    camera.lookAt(0, 0.35, 0);
    cameraRef.current = camera;

    // 3. Renderer with luxury tone mapping and shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 9, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.4);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.3);
    fillLight.position.set(5, 2, -4);
    scene.add(fillLight);

    const floorBounce = new THREE.PointLight(0xfff7ed, 0.6, 12);
    floorBounce.position.set(0, 0.2, 0);
    scene.add(floorBounce);

    // Dynamic Headlight Projectors
    const leftHeadlight = new THREE.SpotLight(0xffffff, headlightsOn ? 3.5 : 0, 16, Math.PI / 7, 0.5, 1);
    leftHeadlight.position.set(-0.8, 0.6, 2.15);
    leftHeadlight.target.position.set(-0.9, 0.1, 8.0);
    scene.add(leftHeadlight);
    scene.add(leftHeadlight.target);

    const rightHeadlight = new THREE.SpotLight(0xffffff, headlightsOn ? 3.5 : 0, 16, Math.PI / 7, 0.5, 1);
    rightHeadlight.position.set(0.8, 0.6, 2.15);
    rightHeadlight.target.position.set(0.9, 0.1, 8.0);
    scene.add(rightHeadlight);
    scene.add(rightHeadlight.target);

    lightsRef.current = { leftHeadlight, rightHeadlight };

    // 5. Studio Stage Floor & Concentric Turntable Rings
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      roughness: 0.35,
      metalness: 0.22
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Concentric Gold Turntable Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });

    const outerRing = new THREE.Mesh(new THREE.RingGeometry(3.18, 3.22, 64), ringMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = 0.004;
    scene.add(outerRing);

    const innerRing = new THREE.Mesh(new THREE.RingGeometry(1.58, 1.62, 48), ringMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.004;
    scene.add(innerRing);

    // Contact Soft Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.6, 5.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowMesh = new THREE.Mesh(
      shadowGeo,
      new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity: 0.9, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.002;
    scene.add(shadowMesh);

    // 6. BUILD BESPOKE 3D VEHICLE ACCORDING TO MODEL ID
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;
    bodyMaterialsRef.current = [];

    // Distinct vehicle silhouette parameters
    const isSUV = activeId === 'gwagon-amg' || activeId === 'escalade-v';
    const isGwagon = activeId === 'gwagon-amg';
    const isPanamera = activeId === 'panamera-turbo';
    const isGhost = activeId === 'rolls-ghost';

    // Body Paint
    const effectiveFinish = isGwagon ? 'matte' : paintFinish;
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(paintColor),
      metalness: effectiveFinish === 'matte' ? 0.35 : 0.96,
      roughness: effectiveFinish === 'matte' ? 0.55 : 0.08,
      clearcoat: effectiveFinish === 'matte' ? 0.1 : 1.0,
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

    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: isGhost ? 0x2e2e34 : 0x1a1a1d,
      metalness: 0.95,
      roughness: 0.15
    });

    const ledWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ledRubyMat = new THREE.MeshBasicMaterial({ color: 0xef233c });

    // Calipers & Rims
    const caliperColor = isPanamera ? 0x84cc16 : isSUV ? 0xef233c : 0xd4af37;
    const caliperMat = new THREE.MeshStandardMaterial({ color: caliperColor, metalness: 0.85, roughness: 0.25 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.95, roughness: 0.15 });
    const rotorMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.9, roughness: 0.3 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85, metalness: 0.05 });

    // Chassis Lower Body
    const bodyWidth = isSUV ? 2.05 : isPanamera ? 1.95 : 1.92;
    const bodyHeight = isGwagon ? 0.75 : isSUV ? 0.65 : 0.44;
    const bodyLength = isGwagon ? 4.25 : isSUV ? 4.85 : 4.5;
    const bodyY = isSUV ? 0.55 : 0.44;

    const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength), carPaintMat);
    lowerBody.position.set(0, bodyY, 0);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // Hood / Bonnet
    const hoodLength = isSUV ? 1.55 : 1.4;
    const hoodHeight = isSUV ? 0.18 : 0.14;
    const hoodY = isSUV ? bodyY + bodyHeight / 2 + 0.08 : 0.62;
    const hoodZ = isSUV ? 1.45 : 1.35;
    const hood = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.95, hoodHeight, hoodLength), carPaintMat);
    hood.position.set(0, hoodY, hoodZ);
    hood.rotation.x = isGwagon ? 0 : isSUV ? -0.04 : -0.07;
    hood.castShadow = true;
    carGroup.add(hood);

    // Front Grille
    const grilleHeight = isGwagon ? 0.48 : isSUV ? 0.52 : 0.32;
    const grilleY = isSUV ? bodyY + 0.1 : 0.46;
    const grilleZ = (bodyLength / 2) + 0.02;
    const grille = new THREE.Mesh(new THREE.BoxGeometry(1.25, grilleHeight, 0.15), darkChromeMat);
    grille.position.set(0, grilleY, grilleZ);
    carGroup.add(grille);

    // Grille Emblem
    const emblemMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.15 });
    const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16), emblemMat);
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, grilleY + 0.06, grilleZ + 0.09);
    carGroup.add(emblem);

    // Front Splitter / Skid Plate
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.98, 0.08, 0.45), darkChromeMat);
    splitter.position.set(0, isSUV ? 0.32 : 0.22, (bodyLength / 2) - 0.05);
    carGroup.add(splitter);

    // Headlight DRL Projectors
    const drlY = isSUV ? bodyY + bodyHeight / 2 + 0.06 : 0.62;
    const leftDrl = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.2), ledWhiteMat);
    leftDrl.position.set(-bodyWidth * 0.35, drlY, grilleZ - 0.06);
    const rightDrl = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.2), ledWhiteMat);
    rightDrl.position.set(bodyWidth * 0.35, drlY, grilleZ - 0.06);
    carGroup.add(leftDrl, rightDrl);

    // Cabin / Glasshouse
    const cabinWidth = isSUV ? bodyWidth * 0.88 : 1.68;
    const cabinHeight = isGwagon ? 0.75 : isSUV ? 0.68 : isPanamera ? 0.46 : 0.52;
    const cabinLength = isSUV ? bodyLength * 0.58 : 2.5;
    const cabinY = bodyY + (bodyHeight / 2) + (cabinHeight / 2);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength), privacyGlassMat);
    cabin.position.set(0, cabinY, -0.15);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Shell
    const roof = new THREE.Mesh(new THREE.BoxGeometry(cabinWidth * 0.94, 0.07, cabinLength * 0.9), carPaintMat);
    roof.position.set(0, cabinY + (cabinHeight / 2) + 0.03, -0.15);
    roof.castShadow = true;
    carGroup.add(roof);

    // Roof Rails for SUVs
    if (isSUV) {
      const railGeo = new THREE.BoxGeometry(0.04, 0.04, cabinLength * 0.85);
      const leftRail = new THREE.Mesh(railGeo, darkChromeMat);
      leftRail.position.set(-cabinWidth * 0.45, cabinY + (cabinHeight / 2) + 0.08, -0.15);
      const rightRail = new THREE.Mesh(railGeo, darkChromeMat);
      rightRail.position.set(cabinWidth * 0.45, cabinY + (cabinHeight / 2) + 0.08, -0.15);
      carGroup.add(leftRail, rightRail);
    }

    // Rear Ducktail Lip Spoiler for Panamera
    if (isPanamera) {
      const ducktail = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.08, 0.35), carPaintMat);
      ducktail.position.set(0, 0.76, -2.18);
      ducktail.rotation.x = -0.15;
      carGroup.add(ducktail);
    }

    // Rear Monolithic Ruby LED Lightbar
    const rearLightbar = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.92, 0.06, 0.06), ledRubyMat);
    rearLightbar.position.set(0, bodyY + 0.22, -(bodyLength / 2) - 0.01);
    carGroup.add(rearLightbar);

    // Rear Diffuser
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.94, 0.22, 0.38), darkChromeMat);
    diffuser.position.set(0, isSUV ? 0.34 : 0.28, -(bodyLength / 2) + 0.05);
    carGroup.add(diffuser);

    // 4 Precision Wheels
    const wheelRadius = isSUV ? 0.42 : 0.36;
    const wheelZ = bodyLength * 0.31;
    const wheelX = bodyWidth * 0.5 + 0.01;
    const wheelY = isSUV ? 0.42 : 0.36;

    const wheelPositions = [
      [-wheelX, wheelY, wheelZ],
      [wheelX, wheelY, wheelZ],
      [-wheelX, wheelY, -wheelZ],
      [wheelX, wheelY, -wheelZ]
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      // Rubber Tire
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.26, 32), tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Alloy Rim
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius * 0.75, wheelRadius * 0.75, 0.27, 24), rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      // Spokes
      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, wheelRadius * 0.7, 0.275), rimMat);
        spoke.rotation.x = (s * Math.PI) / 2.5;
        wheelGroup.add(spoke);
      }

      // Brake Rotor
      const rotor = new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius * 0.58, wheelRadius * 0.58, 0.04, 24), rotorMat);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = x > 0 ? -0.06 : 0.06;
      wheelGroup.add(rotor);

      // Caliper
      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, wheelRadius * 0.38, 0.1), caliperMat);
      caliper.position.set(x > 0 ? -0.06 : 0.06, wheelRadius * 0.36, 0);
      wheelGroup.add(caliper);

      carGroup.add(wheelGroup);
    });

    carGroup.position.y = 0.02;
    // Initial angle: 3/4 beauty angle (35°)
    carGroup.rotation.y = (35 * Math.PI) / 180;
    scene.add(carGroup);

    // 7. Hand Drag & Touch Swipe Interaction Handlers
    const dom = renderer.domElement;

    const onPointerDown = (e) => {
      e.stopPropagation();
      isDraggingRef.current = true;
      setUserInteracted(true);
      setIsIntroActive(false);
      setIsAutoSpinning(false);
      isAutoSpinningRef.current = false;
      velocityRef.current = 0;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = performance.now();
      try {
        dom.setPointerCapture?.(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current || !carGroupRef.current) return;
      e.stopPropagation();
      const currentX = e.clientX;
      const currentY = e.clientY;
      const now = performance.now();

      const deltaX = currentX - lastMousePosRef.current.x;
      const deltaY = currentY - lastMousePosRef.current.y;
      const deltaTime = Math.max(1, now - lastTimeRef.current);

      // Calculate instantaneous drag velocity for release inertia
      velocityRef.current = deltaX / deltaTime;

      // Rotate Y axis (Full 360 degree horizontal spin with hand)
      carGroupRef.current.rotation.y += deltaX * 0.009;

      // Subtle tilt X axis (vertical angle pitch, clamped)
      const newPitch = carGroupRef.current.rotation.x + deltaY * 0.0035;
      carGroupRef.current.rotation.x = Math.max(-0.18, Math.min(0.28, newPitch));

      lastMousePosRef.current = { x: currentX, y: currentY };
      lastTimeRef.current = now;

      const rawDeg = ((carGroupRef.current.rotation.y * 180) / Math.PI) % 360;
      const normalizedDeg = Math.round(rawDeg < 0 ? rawDeg + 360 : rawDeg);
      setCurrentAngleDeg(normalizedDeg);
      if (onRotateChangeRef.current) onRotateChangeRef.current(normalizedDeg);
    };

    const onPointerUp = (e) => {
      if (!isDraggingRef.current) return;
      e.stopPropagation();
      isDraggingRef.current = false;
      try {
        dom.releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    // Wheel zoom
    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      const zoomDelta = e.deltaY * 0.005;
      camera.position.z = Math.max(5.2, Math.min(10.5, camera.position.z + zoomDelta));
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: true });

    // 8. Resize Handler
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

    // 9. Animation Loop with Turntable Spin & Inertia
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (carGroupRef.current) {
        // Continuous smooth auto-spin on page open or when auto-spin active
        if (isAutoSpinningRef.current && !isDraggingRef.current) {
          // Smooth turntable speed: ~0.012 rad/frame = spins full 360 in ~8.5 seconds
          carGroupRef.current.rotation.y += 0.012;
          const rawDeg = ((carGroupRef.current.rotation.y * 180) / Math.PI) % 360;
          const normalizedDeg = Math.round(rawDeg < 0 ? rawDeg + 360 : rawDeg);
          setCurrentAngleDeg(normalizedDeg);
          if (onRotateChangeRef.current) onRotateChangeRef.current(normalizedDeg);
        } else if (!isAutoSpinningRef.current && !isDraggingRef.current && Math.abs(velocityRef.current) > 0.02) {
          // Smooth inertia coasting after releasing hand drag
          carGroupRef.current.rotation.y += velocityRef.current * 8.0;
          velocityRef.current *= 0.93; // Friction decay
          const rawDeg = ((carGroupRef.current.rotation.y * 180) / Math.PI) % 360;
          const normalizedDeg = Math.round(rawDeg < 0 ? rawDeg + 360 : rawDeg);
          setCurrentAngleDeg(normalizedDeg);
          if (onRotateChangeRef.current) onRotateChangeRef.current(normalizedDeg);
        }

        // Suspension breathing effect
        carGroupRef.current.position.y = 0.02 + Math.sin(elapsedTime * 1.5) * 0.007;
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
      dom.removeEventListener('wheel', onWheel);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeId]);

  // Update headlights
  useEffect(() => {
    if (lightsRef.current.leftHeadlight && lightsRef.current.rightHeadlight) {
      lightsRef.current.leftHeadlight.intensity = headlightsOn ? 3.5 : 0;
      lightsRef.current.rightHeadlight.intensity = headlightsOn ? 3.5 : 0;
    }
  }, [headlightsOn]);

  // Update materials when color or finish changes
  useEffect(() => {
    bodyMaterialsRef.current.forEach((mat) => {
      mat.color.set(paintColor);
      mat.metalness = paintFinish === 'matte' ? 0.35 : 0.96;
      mat.roughness = paintFinish === 'matte' ? 0.55 : 0.08;
      mat.clearcoat = paintFinish === 'matte' ? 0.1 : 1.0;
    });
  }, [paintColor, paintFinish]);

  const snapToAngle = (degrees) => {
    if (!carGroupRef.current) return;
    setIsAutoSpinning(false);
    isAutoSpinningRef.current = false;
    setUserInteracted(true);
    setIsIntroActive(false);
    const rad = (degrees * Math.PI) / 180;
    carGroupRef.current.rotation.y = rad;
    carGroupRef.current.rotation.x = 0;
    setCurrentAngleDeg(degrees);
    if (onRotateChangeRef.current) onRotateChangeRef.current(degrees);
  };

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing touch-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* Intro Auto-Spin Notification Banner on Page Load */}
      {isIntroActive && isAutoSpinning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-xl border border-amber-400 text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
              360° Live Auto-Spin Active • Drag with Hand
            </span>
          </div>
        </div>
      )}

      {/* Floating 3D Angle Overlay */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-black/75 backdrop-blur-md text-amber-400 border border-white/10">
          3D Angle: {currentAngleDeg}°
        </span>
      </div>

      {/* Quick Snap Angles (Bottom Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15">
        {[
          { label: 'Front', deg: 0 },
          { label: '3/4', deg: 45 },
          { label: 'Side', deg: 90 },
          { label: 'Rear', deg: 180 }
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => snapToAngle(btn.deg)}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono text-neutral-300 hover:text-white hover:bg-white/10 transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
