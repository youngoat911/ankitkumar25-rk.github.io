"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Lightbulb, RotateCcw } from "lucide-react";

interface Tractor3DProps {
  autoRotateSpeed?: number;
  initialScale?: number;
  interactive?: boolean;
}

export default function Tractor3D({
  autoRotateSpeed = 0.5,
  initialScale = 1.0,
  interactive = true,
}: Tractor3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const headlightsOnRef = useRef(true);
  const headlightsRef = useRef<{
    left: THREE.SpotLight;
    right: THREE.SpotLight;
    material: THREE.MeshStandardMaterial;
  } | null>(null);
  const resetCameraRef = useRef<(() => void) | null>(null);

  const toggleHeadlights = () => {
    const next = !headlightsOnRef.current;
    headlightsOnRef.current = next;
    setHeadlightsOn(next);

    if (headlightsRef.current) {
      const { left, right, material } = headlightsRef.current;
      left.intensity = next ? 5.0 : 0;
      right.intensity = next ? 5.0 : 0;
      material.color.set(next ? 0xffffff : 0x333333);
      material.emissiveIntensity = next ? 0.8 : 0;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let w = container.clientWidth || 800;
    let h = container.clientHeight || 500;

    const scene = new THREE.Scene();

    // ── CAMERA ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    const defaultCamPos = new THREE.Vector3(7.5, 3.2, 7.5);
    camera.position.copy(defaultCamPos);
    const lookTarget = new THREE.Vector3(0, 1.0, 0);
    camera.lookAt(lookTarget);

    resetCameraRef.current = () => {
      camera.position.copy(defaultCamPos);
      camera.lookAt(lookTarget);
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ── LIGHTING ──────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    dirLight.position.set(10, 18, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    backLight.position.set(-10, 8, -10);
    scene.add(backLight);

    // Warm engine underglow
    const engineGlow = new THREE.PointLight(0xf59e0b, 1.2, 8);
    engineGlow.position.set(0, 1.2, 0);
    scene.add(engineGlow);

    // ── MATERIALS ─────────────────────────────────────────────────────────────
    const Mat = (color: number, roughness = 0.35, metalness = 0.5) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });

    const mOrange = Mat(0xf97316, 0.3, 0.6); // HMT 5911 body orange
    const mYellow = Mat(0xfbbf24, 0.25, 0.5); // Grille yellow
    const mChrome = Mat(0xe5e7eb, 0.1, 0.95); // Silencer / exhaust chrome
    const mDark = Mat(0x18181b, 0.7, 0.1); // Engine chassis block
    const mTire = Mat(0x18181b, 0.95, 0.05); // Rubber tires
    const mGlass = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xfef08a,
      emissiveIntensity: headlightsOnRef.current ? 0.8 : 0,
    });
    if (!headlightsOnRef.current) mGlass.color.set(0x333333);

    // ── TRACTOR ROOT GROUP ───────────────────────────────────────────────────
    const tractorGroup = new THREE.Group();
    const isMobile = w < 768;
    const computedScale = (isMobile ? 0.75 : 1.05) * initialScale;
    tractorGroup.scale.setScalar(computedScale);
    tractorGroup.position.set(0, -0.4, 0);
    scene.add(tractorGroup);

    // Helper builder
    const addMesh = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      tractorGroup.add(mesh);
      return mesh;
    };

    // 1. Heavy Chassis Foundation
    addMesh(new THREE.BoxGeometry(4.4, 0.6, 1.8), mDark, 0, 0.9, 0);
    addMesh(new THREE.BoxGeometry(0.3, 0.45, 2.5), mDark, 2.2, 0.75, 0);

    // 2. Engine Bonnet & Hood
    addMesh(new THREE.BoxGeometry(1.6, 1.1, 1.5), mOrange, 0.6, 1.55, 0);
    addMesh(new THREE.BoxGeometry(0.6, 1.1, 1.5), mYellow, 1.65, 1.55, 0); // Front radiator nose
    addMesh(new THREE.BoxGeometry(0.08, 0.9, 1.3), mDark, 1.95, 1.55, 0); // Front radiator grille

    // 3. Headlights & Beams
    const headlightGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
    headlightGeo.rotateZ(Math.PI / 2);
    addMesh(headlightGeo, mGlass, 2.0, 1.6, 0.42);
    addMesh(headlightGeo, mGlass, 2.0, 1.6, -0.42);

    // Dynamic Spotlights projecting forward
    const spotLeft = new THREE.SpotLight(0xfffbeb, headlightsOnRef.current ? 5.0 : 0, 18, Math.PI / 5, 0.35, 1);
    spotLeft.position.set(2.1, 1.6, 0.42);
    const targetLeft = new THREE.Object3D();
    targetLeft.position.set(10, 0, 0.42);
    tractorGroup.add(targetLeft);
    spotLeft.target = targetLeft;
    tractorGroup.add(spotLeft);

    const spotRight = new THREE.SpotLight(0xfffbeb, headlightsOnRef.current ? 5.0 : 0, 18, Math.PI / 5, 0.35, 1);
    spotRight.position.set(2.1, 1.6, -0.42);
    const targetRight = new THREE.Object3D();
    targetRight.position.set(10, 0, -0.42);
    tractorGroup.add(targetRight);
    spotRight.target = targetRight;
    tractorGroup.add(spotRight);

    headlightsRef.current = { left: spotLeft, right: spotRight, material: mGlass };

    // 4. Operator Cabin & Protective Canopy
    const cabin = new THREE.Group();
    cabin.position.set(-1.0, 1.2, 0);
    tractorGroup.add(cabin);

    // Four Canopy Roll-bar Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.07, 0.07, 2.1, 12);
    [
      [-0.8, 0.65],
      [0.8, 0.65],
      [-0.8, -0.65],
      [0.8, -0.65],
    ].forEach(([px, pz]) => {
      const p = new THREE.Mesh(pillarGeo, mChrome);
      p.position.set(px, 1.05, pz);
      cabin.add(p);
    });

    // Canopy Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.14, 1.6), mOrange);
    roof.position.y = 2.1;
    cabin.add(roof);

    // Driver Seat
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.8), mDark);
    seat.position.set(-0.2, 0.25, 0);
    cabin.add(seat);

    // Steering Wheel & Column
    const steering = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.045, 8, 20), mDark);
    steering.position.set(0.55, 0.75, 0);
    steering.rotation.set(0.5, Math.PI / 2, 0);
    cabin.add(steering);

    // 5. Exhaust Stack & Silencer Flap
    const exhaustGroup = new THREE.Group();
    exhaustGroup.position.set(1.1, 2.1, 0.45);
    tractorGroup.add(exhaustGroup);

    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 12), mChrome);
    pipe.position.y = 0.9;
    exhaustGroup.add(pipe);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 12), mChrome);
    cap.position.set(0.08, 1.8, 0);
    cap.rotation.z = 0.5;
    exhaustGroup.add(cap);

    // 6. Giant Rear Wheels (HMT Heavy Tread Cleats)
    const rearWheelGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.85, 28);
    rearWheelGeo.rotateX(Math.PI / 2);
    const rearHubGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.88, 16);
    rearHubGeo.rotateX(Math.PI / 2);
    const lugGeo = new THREE.BoxGeometry(0.14, 0.12, 0.38);

    const buildRearWheel = (px: number, py: number, pz: number) => {
      const wg = new THREE.Group();
      wg.position.set(px, py, pz);
      tractorGroup.add(wg);
      wg.add(new THREE.Mesh(rearWheelGeo, mTire));
      wg.add(new THREE.Mesh(rearHubGeo, mOrange));

      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        const r = 1.28;
        const lugL = new THREE.Mesh(lugGeo, mTire);
        lugL.position.set(Math.sin(a) * r, Math.cos(a) * r, 0.2);
        lugL.rotation.set(a, 0, Math.PI * 0.22);
        wg.add(lugL);

        const lugR = new THREE.Mesh(lugGeo, mTire);
        lugR.position.set(Math.sin(a) * r, Math.cos(a) * r, -0.2);
        lugR.rotation.set(a, 0, -Math.PI * 0.22);
        wg.add(lugR);
      }
      return wg;
    };

    const rearWheelL = buildRearWheel(-1.15, 1.15, 1.25);
    const rearWheelR = buildRearWheel(-1.15, 1.15, -1.25);

    // 7. Front Steer Wheels
    const frontWheelGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.45, 24);
    frontWheelGeo.rotateX(Math.PI / 2);
    const frontHubGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.48, 14);
    frontHubGeo.rotateX(Math.PI / 2);

    const buildFrontWheel = (px: number, py: number, pz: number) => {
      const wg = new THREE.Group();
      wg.position.set(px, py, pz);
      tractorGroup.add(wg);
      wg.add(new THREE.Mesh(frontWheelGeo, mTire));
      wg.add(new THREE.Mesh(frontHubGeo, mChrome));
      return wg;
    };

    const frontWheelL = buildFrontWheel(1.4, 0.62, 1.05);
    const frontWheelR = buildFrontWheel(1.4, 0.62, -1.05);

    // 8. Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(8, 5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.05;
    tractorGroup.add(shadowPlane);

    // ── SMOKE PARTICLES ───────────────────────────────────────────────────────
    const particles: { mesh: THREE.Mesh; vel: THREE.Vector3; life: number; max: number }[] = [];
    const smokeGeo = new THREE.SphereGeometry(0.12, 6, 6);

    const spawnSmoke = () => {
      const tipPos = new THREE.Vector3();
      cap.getWorldPosition(tipPos);
      tipPos.y += 0.15;
      for (let i = 0; i < 2; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x52525b,
          transparent: true,
          opacity: 0.5,
        });
        const mesh = new THREE.Mesh(smokeGeo, mat);
        mesh.position.copy(tipPos);
        mesh.scale.setScalar(0.4 + Math.random() * 0.7);
        scene.add(mesh);
        particles.push({
          mesh,
          vel: new THREE.Vector3(
            -0.02 - Math.random() * 0.04,
            0.05 + Math.random() * 0.06,
            (Math.random() - 0.5) * 0.03
          ),
          life: 0,
          max: 28 + Math.random() * 18,
        });
      }
    };

    // ── MOUSE / TOUCH DRAG ORBIT CONTROLS ─────────────────────────────────────
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.5;
    let targetRotationX = 0;
    let angularVelY = 0;
    let angularVelX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
      angularVelY = 0;
      angularVelX = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !interactive) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      angularVelY = deltaX * 0.007;
      angularVelX = deltaY * 0.004;

      targetRotationY += angularVelY;
      targetRotationX = Math.max(-0.4, Math.min(0.5, targetRotationX + angularVelX));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // ── ANIMATION LOOP ────────────────────────────────────────────────────────
    let reqId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      reqId = requestAnimationFrame(animate);
      lastTime = now;

      // Inertia & Auto-Rotation
      if (!isDragging) {
        angularVelY *= 0.94;
        angularVelX *= 0.94;
        targetRotationY += angularVelY + autoRotateSpeed * 0.008;
      }

      // Smooth Lerp Rotation
      tractorGroup.rotation.y += (targetRotationY - tractorGroup.rotation.y) * 0.12;
      tractorGroup.rotation.x += (targetRotationX - tractorGroup.rotation.x) * 0.12;

      // Gentle Engine Idle Vibration
      const idleTime = now * 0.02;
      tractorGroup.position.y = -0.4 + Math.sin(idleTime) * 0.012;
      cap.rotation.z = 0.5 + Math.sin(idleTime * 1.5) * 0.08; // flapping exhaust flap!

      // Slowly roll wheels when auto-rotating
      const wheelRoll = autoRotateSpeed * 0.012;
      rearWheelL.rotation.z -= wheelRoll;
      rearWheelR.rotation.z -= wheelRoll;
      frontWheelL.rotation.z -= wheelRoll * 1.8;
      frontWheelR.rotation.z -= wheelRoll * 1.8;

      // Spawn puffing smoke
      if (Math.random() < 0.28) {
        spawnSmoke();
      }

      // Update Smoke Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.mesh.position.add(pt.vel);
        pt.life++;
        pt.mesh.scale.multiplyScalar(1.03);
        (pt.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0.5 * (1 - pt.life / pt.max),
          0
        );
        if (pt.life >= pt.max) {
          scene.remove(pt.mesh);
          (pt.mesh.material as THREE.Material).dispose();
          particles.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    // ── RESIZE LISTENER ───────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const isMob = w < 768;
      tractorGroup.scale.setScalar((isMob ? 0.75 : 1.05) * initialScale);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      smokeGeo.dispose();
      particles.forEach((pt) => (pt.mesh.material as THREE.Material).dispose());
      headlightsRef.current = null;
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [autoRotateSpeed, initialScale, interactive]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={toggleHeadlights}
          aria-pressed={headlightsOn}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
            headlightsOn
              ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white"
          }`}
          title="Toggle High Beams"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          <span>{headlightsOn ? "Beams: ON" : "Beams: OFF"}</span>
        </button>

        <button
          onClick={() => resetCameraRef.current?.()}
          className="p-1.5 rounded bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
          title="Reset Camera View"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Floating Drag Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
        <span className="px-3 py-1 rounded-full bg-black/70 border border-neutral-800 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          ⇄ Click &amp; Drag to rotate 360°
        </span>
      </div>
    </div>
  );
}
