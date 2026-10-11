/** 画布共用工具：DPR 适配 + 直角坐标投影。 */
export interface Scale {
  x2px: (x: number) => number;
  y2px: (y: number) => number;
  px2x: (px: number) => number;
  w: number;
  h: number;
}

export interface ViewBox { xmin: number; xmax: number; ymin: number; ymax: number; }

export function fitCanvas(canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; w: number; h: number } | null {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return null;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { ctx, w, h };
}

export function makeScale(box: ViewBox, w: number, h: number, pad = 0): Scale {
  const x2px = (x: number) => pad + ((x - box.xmin) / (box.xmax - box.xmin)) * (w - 2 * pad);
  const y2px = (y: number) => h - pad - ((y - box.ymin) / (box.ymax - box.ymin)) * (h - 2 * pad);
  return { x2px, y2px, px2x: (px: number) => box.xmin + ((px - pad) / (w - 2 * pad)) * (box.xmax - box.xmin), w, h };
}

export function drawAxes(ctx: CanvasRenderingContext2D, s: Scale, box: ViewBox, xStep = 1, yStep = 1): void {
  ctx.strokeStyle = 'var(--line, #ddd)';
  ctx.strokeStyle = 'rgba(70,70,90,.14)';
  ctx.fillStyle = 'rgba(70,70,90,.55)';
  ctx.lineWidth = 1;
  ctx.font = '10px ui-monospace, monospace';
  ctx.textAlign = 'center';
  const x0 = s.x2px(0), y0 = s.y2px(0);
  for (let x = Math.ceil(box.xmin / xStep) * xStep; x <= box.xmax + 1e-9; x += xStep) {
    const px = s.x2px(x);
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, s.h); ctx.stroke();
    if (Math.abs(x) > 1e-9) ctx.fillText(formatTick(x), px, Math.min(Math.max(y0 + 14, 12), s.h - 4));
  }
  ctx.textAlign = 'right';
  for (let y = Math.ceil(box.ymin / yStep) * yStep; y <= box.ymax + 1e-9; y += yStep) {
    const py = s.y2px(y);
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(s.w, py); ctx.stroke();
    if (Math.abs(y) > 1e-9) ctx.fillText(formatTick(y), Math.min(Math.max(x0 - 5, 26), s.w - 2), py + 3);
  }
  ctx.strokeStyle = 'rgba(70,70,90,.45)';
  ctx.beginPath();
  if (box.ymin <= 0 && box.ymax >= 0) { ctx.moveTo(0, y0); ctx.lineTo(s.w, y0); }
  if (box.xmin <= 0 && box.xmax >= 0) { ctx.moveTo(x0, 0); ctx.lineTo(x0, s.h); }
  ctx.stroke();
}

function formatTick(v: number): string {
  const r = Math.round(v * 100) / 100;
  return String(r);
}

export function plotFunction(ctx: CanvasRenderingContext2D, s: Scale, f: (x: number) => number, xmin = s.px2x(0), xmax = s.px2x(s.w)): void {
  ctx.beginPath();
  let pen = false;
  const steps = Math.max(200, Math.round(s.w));
  for (let i = 0; i <= steps; i++) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = f(x);
    if (!Number.isFinite(y) || Math.abs(y) > 1e6) { pen = false; continue; }
    const py = s.y2px(y);
    if (py < -2000 || py > 4000) { pen = false; continue; }
    if (!pen) { ctx.moveTo(s.x2px(x), py); pen = true; } else ctx.lineTo(s.x2px(x), py);
  }
  ctx.stroke();
}

export function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
