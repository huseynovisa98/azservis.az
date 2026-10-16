import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { DiagnosticHotspot, Language } from '../types';
import { translations } from '../i18n/translations';
import { Eye, RotateCcw, Compass, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ThreeCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeHotspotId: string | null;
  onSelectHotspot: (id: string | null) => void;
  lang: Language;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  scrollProgress,
  activeHotspotId,
  onSelectHotspot,
  lang,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [freeOrbitMode, setFreeOrbitMode] = useState(false);
  const [explosionSlider, setExplosionSlider] = useState<number>(0);
  const [projectedPoints, setProjectedPoints] = useState<
    Array<{ id: string; x: number; y: number; visible: boolean; label: string; metric: string }>
  >([]);

  const t = translations[lang];

  // Hotspots definitions
  const hotspotsData: DiagnosticHotspot[] = [
    {
      id: 'stator',
      titleAz: t.hotspots.stator.title,
      titleEn: t.hotspots.stator.title,
      titleRu: t.hotspots.stator.title,
      descAz: t.hotspots.stator.desc,
      descEn: t.hotspots.stator.desc,
      descRu: t.hotspots.stator.desc,
      position: [0, 0.4, 0.9],
      componentName: 'Stator Core & Copper Windings',
      wearProbability: '12%',
      diagnosticMetric: t.hotspots.stator.metric,
    },
    {
      id: 'rotor',
      titleAz: t.hotspots.rotor.title,
      titleEn: t.hotspots.rotor.title,
      titleRu: t.hotspots.rotor.title,
      descAz: t.hotspots.rotor.desc,
      descEn: t.hotspots.rotor.desc,
      descRu: t.hotspots.rotor.desc,
      position: [0, 0.2, 1.6],
      componentName: 'Direct Drive Neodymium Rotor',
      wearProbability: '8%',
      diagnosticMetric: t.hotspots.rotor.metric,
    },
    {
      id: 'inverterPcb',
      titleAz: t.hotspots.inverterPcb.title,
      titleEn: t.hotspots.inverterPcb.title,
      titleRu: t.hotspots.inverterPcb.title,
      descAz: t.hotspots.inverterPcb.desc,
      descEn: t.hotspots.inverterPcb.desc,
      descRu: t.hotspots.inverterPcb.desc,
      position: [1.3, -0.6, 0.2],
      componentName: 'Intelligent Inverter Controller',
      wearProbability: '19%',
      diagnosticMetric: t.hotspots.inverterPcb.metric,
    },
    {
      id: 'drum',
      titleAz: t.hotspots.drum.title,
      titleEn: t.hotspots.drum.title,
      titleRu: t.hotspots.drum.title,
      descAz: t.hotspots.drum.desc,
      descEn: t.hotspots.drum.desc,
      descRu: t.hotspots.drum.desc,
      position: [0, 0, -1.0],
      componentName: 'Laser-Perforated Stainless Drum',
      wearProbability: '15%',
      diagnosticMetric: t.hotspots.drum.metric,
    },
    {
      id: 'damper',
      titleAz: t.hotspots.damper.title,
      titleEn: t.hotspots.damper.title,
      titleRu: t.hotspots.damper.title,
      descAz: t.hotspots.damper.desc,
      descEn: t.hotspots.damper.desc,
      descRu: t.hotspots.damper.desc,
      position: [-1.2, -1.2, -0.4],
      componentName: 'Hydraulic Piston Damper',
      wearProbability: '28%',
      diagnosticMetric: t.hotspots.damper.metric,
    },
    {
      id: 'heater',
      titleAz: t.hotspots.heater.title,
      titleEn: t.hotspots.heater.title,
      titleRu: t.hotspots.heater.title,
      descAz: t.hotspots.heater.desc,
      descEn: t.hotspots.heater.desc,
      descRu: t.hotspots.heater.desc,
      position: [0, -1.1, -1.4],
      componentName: 'Ceramic Heating Core',
      wearProbability: '22%',
      diagnosticMetric: t.hotspots.heater.metric,
    },
  ];

  // Keep a ref to state accessible within animation loop
  const stateRef = useRef({
    scrollProgress,
    targetExplosion: scrollProgress,
    currentExplosion: 0,
    freeOrbit: freeOrbitMode,
    mouseDrag: false,
    prevMousePos: { x: 0, y: 0 },
    rotationTarget: { x: 0.25, y: -0.45 },
    currentRotation: { x: 0.25, y: -0.45 },
    cameraDistance: 6.2,
  });

  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
    if (!freeOrbitMode) {
      stateRef.current.targetExplosion = Math.max(scrollProgress, explosionSlider);
    }
  }, [scrollProgress, explosionSlider, freeOrbitMode]);

  useEffect(() => {
    stateRef.current.freeOrbit = freeOrbitMode;
  }, [freeOrbitMode]);

  const handleResetOrbit = useCallback(() => {
    stateRef.current.rotationTarget = { x: 0.25, y: -0.45 };
    stateRef.current.cameraDistance = 6.2;
    setExplosionSlider(0);
    stateRef.current.targetExplosion = 0;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.08);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.2);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0x0e1b2e, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Electric Cyan Rim Light
    const cyanRim = new THREE.PointLight(0x00f0ff, 4.5, 12);
    cyanRim.position.set(-4, 3, 2);
    scene.add(cyanRim);

    // Deep Tech Blue backlight
    const blueBack = new THREE.DirectionalLight(0x0066ff, 2.5);
    blueBack.position.set(0, -3, -5);
    scene.add(blueBack);

    // Emerald status micro-glow
    const emeraldSpot = new THREE.PointLight(0x10b981, 2.0, 8);
    emeraldSpot.position.set(2, -2, 2);
    scene.add(emeraldSpot);

    // ROOT MODEL GROUP
    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // -------------------------------------------------------------------------
    // PROCEDURAL 3D ASSET: MODULAR SMART INVERTER DRUM ENGINE
    // -------------------------------------------------------------------------

    // 1. OUTER CHASSIS RING & BAFFLE (Base structure)
    const chassisGroup = new THREE.Group();
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x161c2e,
      metalness: 0.85,
      roughness: 0.28,
    });
    const chassisRingGeom = new THREE.CylinderGeometry(1.9, 1.9, 1.4, 36, 1, true);
    const chassisRing = new THREE.Mesh(chassisRingGeom, chassisMat);
    chassisRing.rotation.x = Math.PI / 2;
    chassisGroup.add(chassisRing);

    // Front Bezel Ring
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x222d4a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const bezelGeom = new THREE.TorusGeometry(1.92, 0.08, 16, 48);
    const bezel = new THREE.Mesh(bezelGeom, bezelMat);
    bezel.position.z = 0.7;
    chassisGroup.add(bezel);

    // Cyan Status Accent Ring
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const glowRingGeom = new THREE.TorusGeometry(1.85, 0.02, 8, 36);
    const glowRing = new THREE.Mesh(glowRingGeom, glowRingMat);
    glowRing.position.z = 0.71;
    chassisGroup.add(glowRing);

    machineGroup.add(chassisGroup);

    // 2. INNER STAINLESS STEEL DRUM
    const drumGroup = new THREE.Group();
    const drumMat = new THREE.MeshStandardMaterial({
      color: 0xd0d8e8,
      metalness: 0.95,
      roughness: 0.18,
    });
    const drumBodyGeom = new THREE.CylinderGeometry(1.5, 1.5, 1.8, 32, 1, false);
    const drumBody = new THREE.Mesh(drumBodyGeom, drumMat);
    drumBody.rotation.x = Math.PI / 2;
    drumGroup.add(drumBody);

    // Drum Perforation Ribs
    const ribMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.4,
      roughness: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const drumWireGeom = new THREE.CylinderGeometry(1.51, 1.51, 1.81, 24, 6, true);
    const drumWire = new THREE.Mesh(drumWireGeom, ribMat);
    drumWire.rotation.x = Math.PI / 2;
    drumGroup.add(drumWire);

    // Front drum flange
    const flangeGeom = new THREE.TorusGeometry(1.48, 0.05, 12, 32);
    const flange = new THREE.Mesh(flangeGeom, chassisMat);
    flange.position.z = 0.9;
    drumGroup.add(flange);

    machineGroup.add(drumGroup);

    // 3. STATOR ASSEMBLY (Electromagnetic Coils)
    const statorGroup = new THREE.Group();
    const statorCoreMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.8,
      roughness: 0.3,
    });
    const statorCoreGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.45, 32);
    const statorCore = new THREE.Mesh(statorCoreGeom, statorCoreMat);
    statorCore.rotation.x = Math.PI / 2;
    statorGroup.add(statorCore);

    // 12 Copper Coils radial array
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97736, // Rich technical copper
      metalness: 0.88,
      roughness: 0.22,
    });
    const coilGeom = new THREE.BoxGeometry(0.18, 0.38, 0.4);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const coil = new THREE.Mesh(coilGeom, copperMat);
      coil.position.x = Math.cos(angle) * 1.05;
      coil.position.y = Math.sin(angle) * 1.05;
      coil.rotation.z = angle + Math.PI / 2;
      statorGroup.add(coil);
    }
    machineGroup.add(statorGroup);

    // 4. NEODYMIUM INVERTER ROTOR (Direct Drive Bell)
    const rotorGroup = new THREE.Group();
    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0x1e2738,
      metalness: 0.92,
      roughness: 0.15,
    });
    const rotorBellGeom = new THREE.CylinderGeometry(1.28, 1.28, 0.35, 32, 1, true);
    const rotorBell = new THREE.Mesh(rotorBellGeom, rotorMat);
    rotorBell.rotation.x = Math.PI / 2;
    rotorGroup.add(rotorBell);

    // Central Shaft Hub
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.95,
      roughness: 0.1,
    });
    const shaftGeom = new THREE.CylinderGeometry(0.25, 0.25, 1.2, 16);
    const shaft = new THREE.Mesh(shaftGeom, hubMat);
    shaft.rotation.x = Math.PI / 2;
    rotorGroup.add(shaft);

    // Rotor permanent magnets
    const magnetMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
    });
    for (let j = 0; j < 8; j++) {
      const mAngle = (j / 8) * Math.PI * 2;
      const magGeom = new THREE.BoxGeometry(0.12, 0.25, 0.3);
      const mag = new THREE.Mesh(magGeom, magnetMat);
      mag.position.x = Math.cos(mAngle) * 1.22;
      mag.position.y = Math.sin(mAngle) * 1.22;
      mag.rotation.z = mAngle;
      rotorGroup.add(mag);
    }
    machineGroup.add(rotorGroup);

    // 5. HYDRAULIC SUSPENSION DAMPERS (Left and Right)
    const damperGroup = new THREE.Group();
    const cylinderMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.4,
    });
    const pistonMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05,
    });
    const springMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.85,
      roughness: 0.3,
    });

    const createDamper = (xSign: number) => {
      const dSub = new THREE.Group();
      // Outer Cylinder
      const cylGeom = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 16);
      const cyl = new THREE.Mesh(cylGeom, cylinderMat);
      cyl.position.y = -0.5;
      dSub.add(cyl);

      // Inner Chrome Piston Rod
      const pistGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 16);
      const pist = new THREE.Mesh(pistGeom, pistonMat);
      pist.position.y = 0.25;
      dSub.add(pist);

      // Helical Spring Wire
      const springCurve = new THREE.CurvePath<THREE.Vector3>();
      const springPoints: THREE.Vector3[] = [];
      const coils = 6;
      for (let s = 0; s <= 60; s++) {
        const theta = (s / 60) * Math.PI * 2 * coils;
        const sy = (s / 60) * 0.9 - 0.45;
        springPoints.push(new THREE.Vector3(Math.cos(theta) * 0.16, sy, Math.sin(theta) * 0.16));
      }
      const springGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(springPoints),
        48,
        0.025,
        8,
        false
      );
      const springMesh = new THREE.Mesh(springGeom, springMat);
      dSub.add(springMesh);

      dSub.position.set(xSign * 1.5, -1.2, 0);
      dSub.rotation.z = -xSign * 0.35;
      return dSub;
    };

    const leftDamper = createDamper(-1);
    const rightDamper = createDamper(1);
    damperGroup.add(leftDamper);
    damperGroup.add(rightDamper);
    machineGroup.add(damperGroup);

    // 6. INVERTER LOGIC BOARD (PCB)
    const pcbGroup = new THREE.Group();
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b, // Deep emerald green circuit substrate
      metalness: 0.5,
      roughness: 0.4,
    });
    const pcbBoardGeom = new THREE.BoxGeometry(0.8, 1.1, 0.06);
    const pcbBoard = new THREE.Mesh(pcbBoardGeom, pcbMat);
    pcbGroup.add(pcbBoard);

    // Heatsink on PCB
    const heatSinkMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2,
    });
    const heatSinkGeom = new THREE.BoxGeometry(0.4, 0.5, 0.15);
    const heatSink = new THREE.Mesh(heatSinkGeom, heatSinkMat);
    heatSink.position.set(-0.15, 0.15, 0.08);
    pcbGroup.add(heatSink);

    // Glowing micro-nodes on PCB
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    for (let l = 0; l < 4; l++) {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), ledMat);
      led.position.set(0.2, -0.3 + l * 0.18, 0.04);
      pcbGroup.add(led);
    }
    pcbGroup.position.set(1.6, -0.4, 0.5);
    pcbGroup.rotation.y = -Math.PI / 4;
    machineGroup.add(pcbGroup);

    // 7. CERAMIC HEATING ELEMENT (HEATER COIL)
    const heaterGroup = new THREE.Group();
    const heaterTubePoints = [
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(-0.4, -0.6, 0),
      new THREE.Vector3(-0.15, -0.6, 0),
      new THREE.Vector3(-0.15, 0, 0),
      new THREE.Vector3(0.15, 0, 0),
      new THREE.Vector3(0.15, -0.6, 0),
      new THREE.Vector3(0.4, -0.6, 0),
      new THREE.Vector3(0.5, 0, 0),
    ];
    const heaterCurve = new THREE.CatmullRomCurve3(heaterTubePoints);
    const heaterGeom = new THREE.TubeGeometry(heaterCurve, 40, 0.035, 12, false);
    const heaterMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2,
    });
    const heater = new THREE.Mesh(heaterGeom, heaterMat);
    heaterGroup.add(heater);
    heaterGroup.position.set(0, -1.2, -0.8);
    heaterGroup.rotation.x = Math.PI / 2;
    machineGroup.add(heaterGroup);

    // 8. GROUND TECH RADAR & GRID
    const gridHelper = new THREE.GridHelper(12, 24, 0x00f0ff, 0x162238);
    gridHelper.position.y = -2.4;
    gridHelper.material.opacity = 0.45;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // ANIMATION & INTERPOLATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth lerp of explosion progress
      const targetExp = stateRef.current.targetExplosion;
      stateRef.current.currentExplosion += (targetExp - stateRef.current.currentExplosion) * 0.08;
      const exp = stateRef.current.currentExplosion;

      // Smooth rotation lerp
      const rot = stateRef.current.currentRotation;
      const targetRot = stateRef.current.rotationTarget;
      rot.x += (targetRot.x - rot.x) * 0.08;
      rot.y += (targetRot.y - rot.y) * 0.08;

      // Apply base rotation or idle spin
      if (!stateRef.current.mouseDrag && !stateRef.current.freeOrbit) {
        // Idle gentle breathing rotation
        targetRot.y = -0.45 + Math.sin(elapsed * 0.4) * 0.08;
      }

      machineGroup.rotation.x = rot.x;
      machineGroup.rotation.y = rot.y;

      // Slow drum spin in idle
      drumGroup.rotation.z = elapsed * 0.6;
      rotorGroup.rotation.z = elapsed * 0.6;

      // -----------------------------------------------------------------------
      // EXPLODED VIEW COORDINATE SEPARATION BASED ON 'exp' (0.0 to 1.0)
      // -----------------------------------------------------------------------
      // Chassis separates forward slightly
      chassisGroup.position.z = exp * 0.7;

      // Drum floats backward along axis
      drumGroup.position.z = -exp * 1.6;

      // Stator shifts forward
      statorGroup.position.z = exp * 1.4;

      // Rotor uncouples and projects far forward
      rotorGroup.position.z = exp * 2.8;

      // Dampers lower down and splay outward
      leftDamper.position.x = -1.5 - exp * 0.9;
      leftDamper.position.y = -1.2 - exp * 0.5;
      rightDamper.position.x = 1.5 + exp * 0.9;
      rightDamper.position.y = -1.2 - exp * 0.5;

      // Inverter PCB elevates and angles out to the right
      pcbGroup.position.x = 1.6 + exp * 1.1;
      pcbGroup.position.y = -0.4 + exp * 0.4;
      pcbGroup.position.z = 0.5 + exp * 0.8;

      // Heater coil drops down
      heaterGroup.position.y = -1.2 - exp * 0.8;

      // Pulse micro glow
      glowRingMat.opacity = 0.4 + Math.sin(elapsed * 3) * 0.25;

      // RENDER
      renderer.render(scene, camera);

      // PROJECT 3D HOTSPOTS TO 2D SCREEN COORDINATES
      const updatedPoints = hotspotsData.map((h) => {
        // Compute world position based on exploded state
        let worldOffset = new THREE.Vector3(...h.position);
        if (h.id === 'rotor') worldOffset.z += exp * 2.8;
        else if (h.id === 'stator') worldOffset.z += exp * 1.4;
        else if (h.id === 'drum') worldOffset.z -= exp * 1.6;
        else if (h.id === 'inverterPcb') {
          worldOffset.x += exp * 1.1;
          worldOffset.y += exp * 0.4;
          worldOffset.z += exp * 0.8;
        } else if (h.id === 'damper') {
          worldOffset.x -= exp * 0.9;
          worldOffset.y -= exp * 0.5;
        } else if (h.id === 'heater') {
          worldOffset.y -= exp * 0.8;
        }

        tempVec.copy(worldOffset);
        tempVec.applyEuler(machineGroup.rotation);
        tempVec.add(machineGroup.position);

        // Check if behind camera
        tempVec.project(camera);
        const isVisible = tempVec.z < 1 && tempVec.x >= -0.95 && tempVec.x <= 0.95 && tempVec.y >= -0.95 && tempVec.y <= 0.95;

        const screenX = ((tempVec.x + 1) * width) / 2;
        const screenY = ((-tempVec.y + 1) * height) / 2;

        return {
          id: h.id,
          x: screenX,
          y: screenY,
          visible: isVisible,
          label: lang === 'az' ? h.titleAz : lang === 'ru' ? h.titleRu : h.titleEn,
          metric: h.diagnosticMetric,
        };
      });

      setProjectedPoints(updatedPoints);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // MOUSE ORBIT CONTROLS
    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.mouseDrag = true;
      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
      setIsInteracting(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.mouseDrag) return;
      const dx = e.clientX - stateRef.current.prevMousePos.x;
      const dy = e.clientY - stateRef.current.prevMousePos.y;
      stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };

      stateRef.current.rotationTarget.y += dx * 0.008;
      stateRef.current.rotationTarget.x += dy * 0.008;
      // Clamp vertical tilt
      stateRef.current.rotationTarget.x = Math.max(-0.8, Math.min(0.8, stateRef.current.rotationTarget.x));
    };

    const handleMouseUp = () => {
      stateRef.current.mouseDrag = false;
      setIsInteracting(false);
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        stateRef.current.mouseDrag = true;
        stateRef.current.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current.mouseDrag && e.touches.length === 1) {
        const dx = e.touches[0].clientX - stateRef.current.prevMousePos.x;
        const dy = e.touches[0].clientY - stateRef.current.prevMousePos.y;
        stateRef.current.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        stateRef.current.rotationTarget.y += dx * 0.008;
        stateRef.current.rotationTarget.x += dy * 0.008;
      }
    };
    const handleTouchEnd = () => {
      stateRef.current.mouseDrag = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      chassisRingGeom.dispose();
      chassisMat.dispose();
      bezelGeom.dispose();
      drumBodyGeom.dispose();
      drumMat.dispose();
      copperMat.dispose();
      statorCoreGeom.dispose();
    };
  }, [lang]);

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[720px] select-none overflow-hidden">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isInteracting ? 'cursor-grabbing' : ''
        }`}
      />

      {/* 3D Hotspot DOM Overlays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {projectedPoints.map((pt) => {
          if (!pt.visible) return null;
          const isSelected = activeHotspotId === pt.id;

          return (
            <div
              key={pt.id}
              style={{
                transform: `translate3d(${pt.x}px, ${pt.y}px, 0)`,
                left: -12,
                top: -12,
              }}
              className="absolute pointer-events-auto transition-transform duration-75"
            >
              <button
                onClick={() => onSelectHotspot(isSelected ? null : pt.id)}
                className={`group relative flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200 ${
                  isSelected
                    ? 'border-[#00F0FF] bg-[#00F0FF]/30 scale-125 shadow-[0_0_15px_#00F0FF]'
                    : 'border-[#00F0FF]/50 bg-[#0B0F19]/80 hover:scale-110 hover:border-[#00F0FF]'
                }`}
                title={pt.label}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isSelected ? 'bg-[#00F0FF]' : 'bg-[#00F0FF]/80 group-hover:bg-[#00F0FF]'
                  }`}
                />

                {/* Hotspot Hover / Active Flyout Card */}
                <div
                  className={`pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 w-56 p-3 rounded-lg bg-[#161C2E]/95 border border-[#00F0FF]/30 backdrop-blur-md shadow-2xl transition-all duration-200 z-30 ${
                    isSelected
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-semibold text-slate-200 tracking-wide">
                      {pt.label}
                    </span>
                    <span className="text-[9px] font-mono text-[#10B981] flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> OK
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#00F0FF] bg-[#0B0F19]/80 px-1.5 py-0.5 rounded border border-cyan-500/15">
                    {pt.metric}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating 3D Viewport Controls HUD */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-[#161C2E]/80 backdrop-blur-md rounded-lg border border-slate-700/60 shadow-lg">
          <button
            onClick={() => setFreeOrbitMode(!freeOrbitMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              freeOrbitMode
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Toggle 360° Free Orbit Rotation"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {freeOrbitMode ? t.hero.lockScroll : t.hero.freeRotate}
            </span>
          </button>

          <button
            onClick={handleResetOrbit}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded transition-colors"
            title={t.hero.reset3d}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Manual Explosion Slider */}
        <div className="p-2.5 bg-[#161C2E]/80 backdrop-blur-md rounded-lg border border-slate-700/60 shadow-lg w-44">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-1">
            <span>{t.hero.scrollExplode}</span>
            <span className="text-[#00F0FF] font-semibold tabular-nums">
              {Math.round(Math.max(scrollProgress, explosionSlider) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={Math.max(scrollProgress, explosionSlider)}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setExplosionSlider(val);
              stateRef.current.targetExplosion = val;
            }}
            className="w-full accent-[#00F0FF] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Floating Blueprint Scale & Status Micro-Bar */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 px-3 py-1.5 bg-[#161C2E]/85 backdrop-blur-md rounded-lg border border-slate-700/60 text-xs font-mono text-slate-400">
        <span className="text-[#00F0FF] font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
          WebGL 2.0 PBR
        </span>
        <span className="text-slate-600">|</span>
        <span>MODEL: INV-MOTOR-GEN4</span>
        <span className="hidden sm:inline text-slate-600">|</span>
        <span className="hidden sm:inline text-[#10B981]">120Hz SYNC</span>
      </div>
    </div>
  );
};
