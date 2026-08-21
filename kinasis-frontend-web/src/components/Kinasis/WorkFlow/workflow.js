import { ref, reactive } from 'vue';

const CURVATURE_FACTOR = 0.6;
const MAX_CURVATURE = 120;
const BASE_DURATION = 1400;
const PAUSE_DURATION = 300;
const RESIZE_DEBOUNCE = 80;

const steps = [
  { text: '01<br>Requisitos', height: 140 },
  { text: '02<br>Planificación<br>y Diseño', height: 180 },
  { text: '03<br>Desarrollo<br>y Pruebas', height: 220 },
  { text: '04<br>Despliegue', height: 260 }
];

const canvasRef = ref(null);
const svgRef = ref(null);

const inView = reactive({
  steps: false,
  flow: false,
  patterns: false
});

const cachedBoxes = {
  prod: null,
  mj: null,
  dev: null,
  qa: null
};

const getBox = (canvas, name) => {
  const existing = canvas.querySelector(`.${name}`);
  if (existing && cachedBoxes[name] !== existing) {
    cachedBoxes[name] = existing;
  }
  return existing;
};

const debounce = (fn, wait) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

const connections = [
  { from: 'prod', fromEdge: 'right', to: 'mj', toEdge: 'top' },
  { from: 'mj', fromEdge: 'bottom', to: 'dev', toEdge: 'right' },
  { from: 'dev', fromEdge: 'left', to: 'qa', toEdge: 'bottom' },
  { from: 'qa', fromEdge: 'top', to: 'prod', toEdge: 'left' }
];

const getRelativeEdge = (el, edge, canvasRect) => {
  const rect = el.getBoundingClientRect();
  const midX = (rect.left + rect.right) / 2;
  const midY = (rect.top + rect.bottom) / 2;

  switch (edge) {
    case 'top': return { x: midX - canvasRect.left, y: rect.top - canvasRect.top };
    case 'right': return { x: rect.right - canvasRect.left, y: midY - canvasRect.top };
    case 'bottom': return { x: midX - canvasRect.left, y: rect.bottom - canvasRect.top };
    case 'left': return { x: rect.left - canvasRect.left, y: midY - canvasRect.top };
    default: return { x: 0, y: 0 };
  }
};

const safeGetPoint = (path, len, t) => {
  if (!path || typeof path.getPointAtLength !== 'function') return null;
  try {
    return path.getPointAtLength(Math.min(len, Math.max(0, t)));
  } catch {
    return null;
  }
};

const updateArrows = () => {
  const canvas = canvasRef.value;
  const svg = svgRef.value;
  if (!canvas || !svg) return;

  const boxes = {
    prod: getBox(canvas, 'prod'),
    mj: getBox(canvas, 'mj'),
    dev: getBox(canvas, 'dev'),
    qa: getBox(canvas, 'qa')
  };

  if (Object.values(boxes).some(b => !b)) return;

  const canvasRect = canvas.getBoundingClientRect();

  svg.querySelectorAll('.arrow').forEach(p => p.remove());

  connections.forEach(conn => {
    const start = getRelativeEdge(boxes[conn.from], conn.fromEdge, canvasRect);
    const end = getRelativeEdge(boxes[conn.to], conn.toEdge, canvasRect);

    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const curvature = Math.min(distance * 0.6, 120);

    const cp1 = { ...start };
    const cp2 = { ...end };

    if (conn.fromEdge === 'right') cp1.x += curvature;
    if (conn.fromEdge === 'left') cp1.x -= curvature;
    if (conn.fromEdge === 'top') cp1.y -= curvature;
    if (conn.fromEdge === 'bottom') cp1.y += curvature;

    if (conn.toEdge === 'right') cp2.x += curvature;
    if (conn.toEdge === 'left') cp2.x -= curvature;
    if (conn.toEdge === 'top') cp2.y -= curvature;
    if (conn.toEdge === 'bottom') cp2.y += curvature;

    const clamp = n => Math.min(500, Math.max(0, n));
    cp1.x = clamp(cp1.x); cp1.y = clamp(cp1.y);
    cp2.x = clamp(cp2.x); cp2.y = clamp(cp2.y);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'arrow');
    path.setAttribute('d', `M${start.x} ${start.y} C${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`);
    path.setAttribute('stroke', 'var(--primary-color)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'none');
    path.style.strokeLinecap = 'round';
    path.style.strokeLinejoin = 'round';
    svg.appendChild(path);
  });
};

let observer = null;
let resizeObserver = null;

let arrowAnimHandles = [];
let arrowMarkers = [];
let arrowAnimating = false;

const animatePathLoop = (svg, path) => {
  let pathLen = 0;
  try {
    pathLen = Math.ceil(path.getTotalLength());
  } catch {
    pathLen = 0;
  }

  path.style.strokeDasharray = pathLen;
  path.style.strokeDashoffset = pathLen;
  path.style.transition = 'none';

  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marker.setAttribute('r', '5');
  marker.setAttribute('class', 'arrow-marker');
  marker.setAttribute('fill', 'var(--primary-color)');
  marker.style.fill = 'var(--primary-color)';
  marker.style.transform = 'translate(-50%, -50%)';
  marker.style.willChange = 'transform';
  svg.appendChild(marker);
  arrowMarkers.push(marker);

  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const t = Math.min(1, elapsed / BASE_DURATION);

    if (pathLen > 0) {
      path.style.strokeDashoffset = Math.round(pathLen * (1 - t));
    }

    const point = safeGetPoint(path, pathLen, pathLen * t);

    if (point) {
      const pointNext = safeGetPoint(path, pathLen, pathLen * Math.min(1, t + 0.01));
      const angle = pointNext ? Math.atan2(pointNext.y - point.y, pointNext.x - point.x) * (180 / Math.PI) : 0;
      marker.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle}deg)`;
      marker.style.opacity = '1';
    } else {
      marker.style.opacity = '0';
    }

    if (t < 1) {
      path.setAttribute('marker-end', 'none');
      const id = requestAnimationFrame(step);
      arrowAnimHandles.push(id);
    } else {
      path.setAttribute('marker-end', 'url(#arrowhead)');
      setTimeout(() => {
        start = null;
        if (pathLen > 0) path.style.strokeDashoffset = pathLen;
        path.setAttribute('marker-end', 'none');
        marker.style.opacity = '0';
        const id = requestAnimationFrame(step);
        arrowAnimHandles.push(id);
      }, PAUSE_DURATION);
    }
  };

  const id = requestAnimationFrame(step);
  arrowAnimHandles.push(id);
};

const startArrowAnimations = () => {
  if (arrowAnimating) return;
  const svg = svgRef.value;
  if (!svg) return;
  arrowAnimating = true;

  const paths = Array.from(svg.querySelectorAll('.arrow'));
  if (!paths.length) return;

  stopArrowAnimations();

  paths.forEach(p => {
    p.style.strokeLinecap = 'round';
    p.style.strokeLinejoin = 'round';
    p.style.transition = 'stroke-dashoffset 0.3s linear';
    animatePathLoop(svg, p);
  });
};

const stopArrowAnimations = () => {
  arrowAnimating = false;
  arrowAnimHandles.forEach(id => cancelAnimationFrame(id));
  arrowAnimHandles = [];

  arrowMarkers.forEach(m => {
    if (m && m.parentNode) m.parentNode.removeChild(m);
  });
  arrowMarkers = [];

  const svg = svgRef.value;
  if (svg) {
    svg.querySelectorAll('.arrow').forEach(p => {
      const len = Math.ceil(p.getTotalLength ? p.getTotalLength() : 0);
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
  }
};

const initObserver = () => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const key = entry.target.dataset.step;
        if (!key) return;

        Object.assign(inView, { ...inView, [key]: entry.isIntersecting });

        if (key === 'flow') {
          if (entry.isIntersecting) {
            setTimeout(() => {
              updateArrows();
              startArrowAnimations();
            }, RESIZE_DEBOUNCE);
          } else {
            stopArrowAnimations();
          }
        }

        if (key === 'steps' && entry.isIntersecting) {
          setTimeout(() => updateArrows(), RESIZE_DEBOUNCE);
        }
      });
    },
    { threshold: 0.45 }
  );

  document.querySelectorAll('.workflow-section').forEach(el => observer.observe(el));
};

const scheduleUpdate = debounce(() => {
  if (svgRef.value) updateArrows();
}, RESIZE_DEBOUNCE);

const initFlow = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  resizeObserver = new ResizeObserver(scheduleUpdate);
  resizeObserver.observe(canvas);
  window.addEventListener('resize', scheduleUpdate);

  setTimeout(updateArrows, 0);
};

const setupWorkflow = () => {
  initObserver();
  initFlow();
};

const cleanupWorkflow = () => {
  observer?.disconnect();
  resizeObserver?.disconnect();
  window.removeEventListener('resize', scheduleUpdate);
  stopArrowAnimations();
};

export {
  steps,
  canvasRef,
  svgRef,
  inView,
  setupWorkflow,
  cleanupWorkflow
};