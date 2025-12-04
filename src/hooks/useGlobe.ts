import { Country, countryCapitals, CountryResults } from "@/types";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface UseGlobeProps {
  countries: CountryResults[];
  setActiveCountry: (id: number | null) => void;
  activeCountry: number | null;
}

export function useGlobe({
  countries,
  setActiveCountry,
  activeCountry,
}: UseGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const pointsRef = useRef<THREE.Group[]>([]);
  const activatePointRef = useRef<null | ((p: THREE.Group) => void)>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const initialTargetRef = useRef<THREE.Vector3 | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const resetCameraRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (!canvasRef.current || !countries?.length) return;

    const canvas = canvasRef.current;

    // === SCENE ===
    const scene = new THREE.Scene();
    scene.background = null;

    // === CAMERA ===
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2.5, 0.4, 1.5);

    cameraRef.current = camera;
    initialCameraPosRef.current = camera.position.clone();

    // === RENDERER ===
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // === LIGHT ===
    const light = new THREE.DirectionalLight(0xb5b5b5, 1);
    light.position.set(2, 2, 2);
    scene.add(light);

    // === GLOBE ===
    const geometry = new THREE.SphereGeometry(1.14, 64, 64);
    const texture = new THREE.TextureLoader().load("/textures/earth.jpg");
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // === CONTROLS ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    controlsRef.current = controls;
    initialTargetRef.current = controls.target.clone();

    // === DATA ===
    const points: THREE.Group[] = [];
    pointsRef.current = points;

    let hoveredPoint: THREE.Group | null = null;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function latLongToVector3(lat: number, lon: number, radius: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // ===== POINT WITH GLOW =====
    function addPoint(lat: number, lon: number, countryId: number) {
      const GLOW_SIZE = 1.15; // glow-size ← тут регулюй розмір світла глобально

      // було 1.16 + 0.01 → підняв трохи вище
      const pos = latLongToVector3(lat, lon, 1.16 + 0.03); // ↑ вверх

      // === MAIN SPHERE ===
      const geo = new THREE.SphereGeometry(0.03, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(geo, mat);

      sphere.position.copy(pos); // ↑ тепер вона трохи вище поверхні

      // === GLOW SHADER (small, concentrated, oriented to surface normal) ===
      // Reduced radius (half of previous) -> 0.045
      const glowGeo = new THREE.CircleGeometry(0.05, 32);

      const glowMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(0xffffff) },
          uOpacity: { value: 0.45 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 uColor;
          uniform float uOpacity;

          void main(){
            // center at (0.5,0.5) -> concentrated under the point
            vec2 p = vUv - vec2(0.5);
            float d = length(p);

            // concentrate glow: sharp center, fast falloff
            float alpha = 1.0 - smoothstep(0.0, 0.5, d);
            // apply a tighter curve so glow is smaller than the sphere
            alpha = pow(alpha, 1.8);

            gl_FragColor = vec4(uColor, alpha * uOpacity);
          }
        `,
      });

      const glow = new THREE.Mesh(glowGeo, glowMat);

      // Orient glow so it's flush with the sphere surface and centered under the point.
      // Circle's normal is +Z by default -> align it to the point's normal vector.
      const normal = pos.clone().normalize();
      const basis = new THREE.Vector3(0, 0, 1); // circle faces +Z
      const q = new THREE.Quaternion().setFromUnitVectors(basis, normal);
      glow.quaternion.copy(q);

      // Place barely above the surface along normal so it looks like "on the surface"
      const surfaceDistance = 1.14; // globe radius
      glow.position.copy(
        normal.clone().multiplyScalar(surfaceDistance + 0.0005)
      );

      // Glow scale kept small and same for active/inactive
      glow.scale.set(GLOW_SIZE, GLOW_SIZE, 1);

      // === GROUP ===
      const group = new THREE.Group();
      group.add(glow);
      group.add(sphere);

      group.userData = {
        countryId,
        isActive: false,
        sphere,
        glow,
        defaultColor: 0xffffff,
        activeColor: 0x00ff00,
        hoverColor: 0xffffff,
      };

      scene.add(group);
      points.push(group);
    }

    countries.forEach((c) => {
      const coords = countryCapitals[c.name as Country];
      if (coords) addPoint(coords.lat, coords.lon, c.id);
    });

    // === INTERACTION ===
    function onMouseMove(e: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    function focusCameraOn(target: THREE.Vector3) {
      const startPos = camera.position.clone();
      const endPos = target.clone().normalize().multiplyScalar(2.5);
      let t = 0;

      const animate = () => {
        t += 0.02;
        const k = Math.min(t / 0.8, 1);
        camera.position.lerpVectors(startPos, endPos, k);
        controls.target.lerp(target, k);
        controls.update();
        if (k < 1) requestAnimationFrame(animate);
      };
      animate();
    }

    function resetCamera() {
      if (
        !cameraRef.current ||
        !controlsRef.current ||
        !initialCameraPosRef.current ||
        !initialTargetRef.current
      )
        return;

      const cam = cameraRef.current;
      const controls = controlsRef.current;

      const startPos = cam.position.clone();
      const startTarget = controls.target.clone();
      const endPos = initialCameraPosRef.current.clone();
      const endTarget = initialTargetRef.current.clone();

      let t = 0;
      const animate = () => {
        t += 0.02;
        const k = Math.min(t / 0.8, 1);
        cam.position.lerpVectors(startPos, endPos, k);
        controls.target.lerpVectors(startTarget, endTarget, k);
        controls.update();
        if (k < 1) requestAnimationFrame(animate);
      };
      animate();
    }

    // Helper: deactivate all points (resets sphere color and glow uniforms)
    function deactivateAll() {
      points.forEach((p) => {
        p.userData.isActive = false;
        p.userData.sphere.material.color.set(p.userData.defaultColor);
        // reset glow uniforms/scale to base
        const gm = p.userData.glow.material as THREE.ShaderMaterial;
        if (gm && gm.uniforms) {
          gm.uniforms.uOpacity.value = 0.45;
          gm.uniforms.uColor.value = new THREE.Color(0xffffff);
        }
        p.userData.glow.scale.set(1, 1, 1);
      });
    }

    // === ACTIVATE / TOGGLE POINT ===
function activatePoint(point: THREE.Group) {
  const countryId = point.userData.countryId as number;

  // Якщо клікаємо по вже активній → скидаємо
  if (activeCountry === countryId) {
    deactivateAll();
    resetCamera();
    setActiveCountry(null);
    return;
  }

  // Деактивуємо всі
  deactivateAll();

  // Активуємо цю
  point.userData.isActive = true;
  point.userData.sphere.material.color.set(point.userData.activeColor);

  const gm = point.userData.glow.material as THREE.ShaderMaterial;
  if (gm?.uniforms) {
    gm.uniforms.uOpacity.value = 0.45;
    gm.uniforms.uColor.value = new THREE.Color(0xffffff);
  }

  focusCameraOn(point.userData.sphere.position);

  setActiveCountry(countryId);
}


    activatePointRef.current = activatePoint;
    resetCameraRef.current = resetCamera;

    // CLICK FIX ↓ ================================
    function onClick() {
      if (!hoveredPoint) return;
      activatePoint(hoveredPoint); // тепер клік працює
    }
    window.addEventListener("click", onClick);

    // === LOOP ===
    function loop() {
      requestAnimationFrame(loop);

      raycaster.setFromCamera(mouse, camera);

      // FIX: шукаємо тільки сфери і glow, але правильно визначимо групу через parent
      const intersects = raycaster.intersectObjects(scene.children, true);

      // спочатку скидаємо всі що не active
      points.forEach((p) => {
        if (!p.userData.isActive) {
          p.userData.sphere.material.color.set(p.userData.defaultColor);
          const gm = p.userData.glow.material as THREE.ShaderMaterial;
          gm.uniforms.uOpacity.value = 0.45;
          gm.uniforms.uColor.value = new THREE.Color(0xffffff);
        }
      });

      // ---------------- HOVER FIX ----------------
      if (intersects.length > 0) {
        let obj = intersects[0].object;

        // FIX: шукаємо group вгору по parent-дереву
        while (
          obj &&
          !points.includes(obj as any) &&
          !points.includes(obj.parent as any)
        ) {
          obj = obj.parent as THREE.Object3D;
        }

        const group = points.includes(obj as THREE.Group)
          ? (obj as THREE.Group)
          : (obj?.parent as THREE.Group);

        if (group && !group.userData.isActive) {
          group.userData.sphere.material.color.set(group.userData.hoverColor);
        }

        hoveredPoint = group; // FIX
        renderer.domElement.style.cursor = "pointer";
      } else {
        hoveredPoint = null; // FIX
        renderer.domElement.style.cursor = "default";
      }

      // --------------------------------------------------------

      points.forEach((p) => {
        const glowMesh = p.userData.glow as THREE.Mesh;
        const spherePos = p.userData.sphere.position.clone();
        const normal = spherePos.clone().normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          normal
        );
        glowMesh.quaternion.copy(q);
      });

      renderer.render(scene, camera);
    }

    loop();

    // === RESIZE ===
    function onResize() {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [countries, setActiveCountry]);

  // === ACTIVE COUNTRY CONTROL ===
  useEffect(() => {
    if (!pointsRef.current.length) return;

    if (activeCountry === null) {
      resetCameraRef.current?.();
      // deactivate all points (reset sphere colors and glows)
      pointsRef.current.forEach((p) => {
        p.userData.isActive = false;
        p.userData.sphere.material.color.set(p.userData.defaultColor);
        p.userData.glow.scale.set(1, 1, 1);
        const gm = p.userData.glow.material as THREE.ShaderMaterial;
        if (gm && gm.uniforms) {
          gm.uniforms.uOpacity.value = 0.45;
          gm.uniforms.uColor.value = new THREE.Color(0xffffff);
        }
      });
      return;
    }

    const point = pointsRef.current.find(
      (p) => p.userData.countryId === activeCountry
    );

    if (point) activatePointRef.current?.(point);
  }, [activeCountry]);

  return canvasRef;
}
