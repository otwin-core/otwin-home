/* The controls, shared by the questions about a home and by a simulation:
 * the same thing is always set the same way.
 *
 *   Gauge      a temperature: a big figure over a violet track
 *   Slider     a number with a unit (m², kW, people, a year, € per kWh)
 *   Switch     off or on
 *   Segmented  three options or fewer, side by side
 *   OptionRow  more options, a row of labelled buttons
 */
import { useId, useRef } from "react";

export function Segmented({ options, value, onChange, name }) {
  return (
    <div className="segmented" role="radiogroup" data-name={name}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} data-value={o.value} className={value === o.value ? "on" : ""} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function OptionRow({ options, value, onChange, name }) {
  return (
    <div className="optrow" role="radiogroup" data-name={name}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} data-value={o.value} className={value === o.value ? "on" : ""} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* on/off; `options` are [off, on] when the value is a word, not a boolean */
export function Switch({ checked, onChange, label, name }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className={`switch ${checked ? "on" : ""}`} data-name={name} onClick={() => onChange(!checked)}>
      <span className="knob" />
      {label ? <span className="switch-label">{label}</span> : null}
    </button>
  );
}

export function Slider({ value, onChange, min, max, step = 1, unit = "", format, name, zeroLabel }) {
  const id = useId();
  const v = Number(value);
  const shown = format ? format(v) : zeroLabel && v === 0 ? zeroLabel : `${Number.isInteger(step) ? Math.round(v) : v}${unit ? ` ${unit}` : ""}`;
  return (
    <div className="slider" data-name={name}>
      <input id={id} type="range" min={min} max={max} step={step} value={v} onChange={(e) => onChange(Number(e.target.value))} />
      <output htmlFor={id} className="slider-value">
        {shown}
      </output>
    </div>
  );
}

/* A temperature: the figure first, big and monospaced, over a violet
   track. Drag or click along the track, or use the arrow keys. Same
   family as the sliders: no needle, no gradient. */
export function Gauge({ value, onChange, min = 16, max = 26, step = 0.5, name }) {
  const ref = useRef(null);
  const W = 260;
  const H = 92;
  const X0 = 16;
  const X1 = W - 16;
  const TY = 64;
  const v = Math.min(max, Math.max(min, Number(value)));
  const frac = (v - min) / (max - min);
  const tx = X0 + frac * (X1 - X0);
  const snap = (x) => Math.round(x / step) * step;
  const fromPoint = (clientX) => {
    const box = ref.current.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (((clientX - box.left) / box.width) * W - X0) / (X1 - X0)));
    onChange(Math.min(max, Math.max(min, snap(min + f * (max - min)))));
  };
  const onPointerDown = (e) => {
    e.preventDefault();
    ref.current.setPointerCapture(e.pointerId);
    fromPoint(e.clientX);
  };
  const onPointerMove = (e) => {
    if (e.buttons & 1) fromPoint(e.clientX);
  };
  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(Math.min(max, snap(v + step)));
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(Math.max(min, snap(v - step)));
  };
  return (
    <div className="gauge" data-name={name}>
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        aria-label={`${v} °C`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKey}
      >
        <text x={X0} y="34" fontSize="28" fontWeight="700" fill="#1d1d1f" fontFamily="ui-monospace, Menlo, monospace">
          {`${v.toFixed(step < 1 ? 1 : 0)} °C`}
        </text>
        <line x1={X0} x2={X1} y1={TY} y2={TY} stroke="#d2d2d7" strokeWidth="5" strokeLinecap="round" />
        <line x1={X0} x2={tx} y1={TY} y2={TY} stroke="#7a2ffc" strokeWidth="5" strokeLinecap="round" />
        <circle cx={tx} cy={TY} r="12" fill="#ffffff" stroke="#d2d2d7" strokeWidth="1.5" />
        <circle cx={tx} cy={TY} r="4.5" fill="#7a2ffc" />
        <text x={X0} y={TY + 24} fontSize="12" fill="#6e6e73">{`${min}°`}</text>
        <text x={X1} y={TY + 24} fontSize="12" fill="#6e6e73" textAnchor="end">{`${max}°`}</text>
      </svg>
    </div>
  );
}
