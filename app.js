import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const palette = ['#ffcece', '#ffc1c8', '#ffe3b0', '#8ed6ff'];
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reduceMotion = reducedMotionQuery.matches;
let exploreMode = false;

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'strict',
  themeVariables: {
    fontFamily: 'Inter, system-ui, sans-serif',
    primaryTextColor: '#172033',
    lineColor: '#172033',
    clusterBkg: '#ffffff',
    clusterBorder: '#172033'
  }
});

try {
  await mermaid.run({ querySelector: '.mermaid' });
} catch (error) {
  console.warn('Mermaid rendering failed:', error);
}

const canvas = document.querySelector('#world-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x070b14, 0.022);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 250);
camera.position.set(0, 3.2, 13);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;

scene.add(new THREE.HemisphereLight(0xddeeff, 0x0b1020, 2.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(5, 8, 10);
scene.add(keyLight);

const world = new THREE.Group();
scene.add(world);

const stops = [
  { name: 'Welcome', color: '#8ed6ff', pos: new THREE.Vector3(0, 0, 0), camera: new THREE.Vector3(0, 3.2, 13) },
  { name: 'Foundations', color: palette[0], pos: new THREE.Vector3(-4.5, -1.2, -10), camera: new THREE.Vector3(-1.8, 2.4, -1.5) },
  { name: 'AI Systems', color: palette[1], pos: new THREE.Vector3(4.2, 1.3, -23), camera: new THREE.Vector3(1.7, 3.0, -14.2) },
  { name: 'Quality + Safety', color: palette[2], pos: new THREE.Vector3(-4.1, 0.8, -36), camera: new THREE.Vector3(-1.3, 2.6, -27.2) },
  { name: 'Production + Governance', color: palette[3], pos: new THREE.Vector3(4.0, -0.4, -49), camera: new THREE.Vector3(1.4, 2.5, -40.1) },
  { name: 'Hands-on Lab', color: '#ffffff', pos: new THREE.Vector3(0, 0, -62), camera: new THREE.Vector3(0, 2.7, -53.5) }
];

function createGlowTexture(color) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.2, color);
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

const interactive = [];
const landmarkGroup = new THREE.Group();
world.add(landmarkGroup);

stops.slice(1, 5).forEach((stop, index) => {
  const group = new THREE.Group();
  group.position.copy(stop.pos);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35 + index * 0.08, 2),
    new THREE.MeshPhysicalMaterial({
      color: stop.color,
      roughness: 0.28,
      metalness: 0.05,
      transmission: 0.08,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
      emissive: new THREE.Color(stop.color),
      emissiveIntensity: 0.12
    })
  );
  core.userData = { label: `${String(index + 1).padStart(2, '0')} — ${stop.name}`, stop: index + 1 };
  group.add(core);
  interactive.push(core);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.15, 0.035, 10, 140),
    new THREE.MeshBasicMaterial({ color: stop.color, transparent: true, opacity: 0.68 })
  );
  ring.rotation.x = Math.PI / 2.5;
  group.add(ring);

  const ring2 = ring.clone();
  ring2.rotation.set(Math.PI / 3.8, Math.PI / 2, 0.35);
  ring2.scale.setScalar(1.25);
  group.add(ring2);

  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: createGlowTexture(stop.color),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  sprite.scale.set(7.5, 7.5, 1);
  group.add(sprite);

  for (let i = 0; i < 10; i += 1) {
    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.06 + (i % 3) * 0.025, 12, 12),
      new THREE.MeshBasicMaterial({ color: stop.color })
    );
    const angle = (i / 10) * Math.PI * 2;
    const radius = 2.7 + (i % 4) * 0.35;
    satellite.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.7) * 1.6, Math.sin(angle) * radius * 0.5);
    group.add(satellite);
  }

  landmarkGroup.add(group);
});

const pathCurve = new THREE.CatmullRomCurve3(stops.map(s => s.pos));
const path = new THREE.Mesh(
  new THREE.TubeGeometry(pathCurve, 220, 0.018, 6, false),
  new THREE.MeshBasicMaterial({ color: 0x8ed6ff, transparent: true, opacity: 0.35 })
);
world.add(path);

const starCount = 1400;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i += 1) {
  starPositions[i * 3] = (Math.random() - 0.5) * 42;
  starPositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
  starPositions[i * 3 + 2] = -Math.random() * 78 + 10;
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.62, depthWrite: false })
);
world.add(stars);

const grid = new THREE.GridHelper(110, 70, 0x23304c, 0x131d31);
grid.position.y = -5.2;
grid.position.z = -30;
grid.material.transparent = true;
grid.material.opacity = 0.32;
world.add(grid);

const chapters = [...document.querySelectorAll('.chapter')];
const railLinks = [...document.querySelectorAll('[data-stop-link]')];
let activeStop = 0;
let scrollProgress = 0;
let pointerX = 0;
let pointerY = 0;

function updateStoryState() {
  const viewportCenter = window.innerHeight * 0.5;
  let bestIndex = 0;
  let bestDistance = Infinity;

  chapters.forEach((chapter, index) => {
    const rect = chapter.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  activeStop = Math.min(bestIndex, stops.length - 1);
  chapters.forEach((chapter, index) => chapter.classList.toggle('is-active', index === activeStop));
  railLinks.forEach((link) => link.classList.toggle('active', Number(link.dataset.stopLink) === activeStop));

  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

function cameraTargetFromScroll() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const pageProgress = Math.min(0.9999, Math.max(0, window.scrollY / maxScroll));
  const scaled = pageProgress * (stops.length - 1);
  const a = Math.floor(scaled);
  const b = Math.min(stops.length - 1, a + 1);
  const t = THREE.MathUtils.smootherstep(scaled - a, 0, 1);
  return stops[a].camera.clone().lerp(stops[b].camera, t);
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(2, 2);
const tooltip = document.querySelector('#node-tooltip');

function onPointerMove(event) {
  pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  mouse.x = pointerX;
  mouse.y = -pointerY;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(interactive, false);
  if (hits.length) {
    document.body.style.cursor = 'pointer';
    tooltip.hidden = false;
    tooltip.textContent = `${hits[0].object.userData.label} — click to jump here`;
    tooltip.style.left = `${Math.min(window.innerWidth - 260, event.clientX + 16)}px`;
    tooltip.style.top = `${Math.min(window.innerHeight - 70, event.clientY + 16)}px`;
  } else {
    document.body.style.cursor = '';
    tooltip.hidden = true;
  }
}

function onPointerDown() {
  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(interactive, false)[0];
  if (hit) {
    const target = chapters[hit.object.userData.stop];
    target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }
}

window.addEventListener('pointermove', onPointerMove, { passive: true });
window.addEventListener('pointerdown', onPointerDown, { passive: true });
window.addEventListener('scroll', updateStoryState, { passive: true });

const clock = new THREE.Clock();
function animate() {
  const elapsed = clock.getElapsedTime();
  const target = cameraTargetFromScroll();
  const cameraEase = reduceMotion ? 1 : 0.055;
  camera.position.lerp(target, cameraEase);

  const lookAt = new THREE.Vector3(
    exploreMode ? pointerX * 3.2 : pointerX * 0.6,
    exploreMode ? -pointerY * 2.4 : -pointerY * 0.3,
    camera.position.z - 10
  );
  camera.lookAt(lookAt);

  if (!reduceMotion) {
    landmarkGroup.children.forEach((group, index) => {
      group.rotation.y = elapsed * (0.08 + index * 0.012);
      group.rotation.x = Math.sin(elapsed * 0.35 + index) * 0.08;
      const core = group.children[0];
      core.scale.setScalar(1 + Math.sin(elapsed * 1.2 + index) * 0.025);
    });
    stars.rotation.y = elapsed * 0.004;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
}
window.addEventListener('resize', resize);

const motionToggle = document.querySelector('#motion-toggle');
function syncMotionButton() {
  motionToggle.textContent = reduceMotion ? 'Enable motion' : 'Reduce motion';
  motionToggle.setAttribute('aria-pressed', String(reduceMotion));
}
motionToggle?.addEventListener('click', () => {
  reduceMotion = !reduceMotion;
  syncMotionButton();
});
syncMotionButton();

const exploreToggle = document.querySelector('#explore-toggle');
exploreToggle?.addEventListener('click', () => {
  exploreMode = !exploreMode;
  document.body.classList.toggle('explore-mode', exploreMode);
  exploreToggle.setAttribute('aria-pressed', String(exploreMode));
  exploreToggle.textContent = exploreMode ? 'Exit 3D' : 'Explore 3D';
});

for (const box of document.querySelectorAll('[data-progress]')) {
  const key = `ai-research:${box.dataset.progress}`;
  box.checked = localStorage.getItem(key) === 'done';
  box.addEventListener('change', () => {
    if (box.checked) localStorage.setItem(key, 'done');
    else localStorage.removeItem(key);
  });
}

updateStoryState();
animate();

window.setTimeout(() => {
  document.querySelector('#loading-screen')?.classList.add('is-hidden');
}, 500);
