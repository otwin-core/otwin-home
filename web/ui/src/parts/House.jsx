/* The home card: the month of this home, drawn on ink.
 *
 * One dark card. The house is a single continuous stroke in the Otwin
 * green, eaves included; everything inside is white and monospaced
 * figures, and the green returns only on what matters: the conditioning
 * energy and the bill's total. The fuels come in from the left on thin
 * lines; the bill sits on a raised panel to the right. See DESIGN.md.
 */
import { useState } from "react";

import { useT } from "../i18n";

const W = 880;
const INK = "#1d1d1f";
const PANEL = "#2a2a31";
const HAIR = "#3f3f47";
const FAINT = "#5c5c64";
const MUT = "#98989f";
const TXT = "#f5f5f7";
const GREEN = "#c6ff3d";
const VIOLET = "#a07bff";

const USE_COLOUR = {
  heating: GREEN,
  cooling: GREEN,
  "hot water": "#e8e8ed",
  appliances: "#b0b0b8",
  cooking: "#8a8a92",
  always_on: "#606068",
};

/* ---------------------------------------------------------- pictograms
 * The fuel glyphs, small and white, drawn around (0,0); `s` scales. */
function Bolt({ s = 1, c = TXT }) {
  return <polygon points="3,-13 -7,2 -1,2 -3,13 7,-3 1,-3" fill={c} transform={`scale(${s})`} />;
}
function Flame({ s = 1, c = TXT }) {
  return (
    <path
      d="M0,-13 C4,-7 9,-4 9,3 A9,9 0 0 1 -9,3 C-9,-2 -5,-5 -3,-9 C-2,-6 -1,-4 1,-3 C2,-6 2,-9 0,-13 Z"
      fill={c}
      transform={`scale(${s})`}
    />
  );
}
function Drop({ s = 1, c = TXT }) {
  return <path d="M0,-13 C4,-6 9,-2 9,4 A9,9 0 0 1 -9,4 C-9,-2 -4,-6 0,-13 Z" fill={c} transform={`scale(${s})`} />;
}
const FUEL_GLYPH = { electricity: Bolt, gas: Flame, water: Drop };

/* the machines, one thin stroke each */
function Fan({ c = TXT }) {
  return (
    <g stroke={c} fill="none" strokeWidth="2" strokeLinecap="round">
      <circle r="11" />
      <circle r="2.4" fill={c} stroke="none" />
      {[90, 210, 330].map((deg) => (
        <line key={deg} x1="0" y1="-4" x2="0" y2="-8.5" transform={`rotate(${deg})`} />
      ))}
    </g>
  );
}
function Coil({ c = TXT }) {
  return <polyline points="-10,0 -7,-6 -3.5,6 0,-6 3.5,6 7,-6 10,0" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />;
}
function FlameRing({ c = TXT }) {
  return <Flame s={0.8} c={c} />;
}

/* the thermometer, one stroke: capsule, stem, bulb */
function Thermo({ c = TXT }) {
  return (
    <g stroke={c} strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M -3.4 -13 a 3.4 3.4 0 0 1 6.8 0 V 1.5 a 6.8 6.8 0 1 1 -6.8 0 Z" />
      <line x1="0" y1="-7" x2="0" y2="3" strokeWidth="2.2" />
      <circle cy="7" r="2.8" fill={c} stroke="none" />
    </g>
  );
}

/* --------------------------------------------------------------- pieces */
function Ring({ x, y, r = 20, dim = false, children }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={dim ? 0.4 : 1}>
      <circle r={r} fill="none" stroke={FAINT} strokeWidth="2" />
      {children}
    </g>
  );
}

function Input({ y, fuel, value, used, wallX }) {
  const Glyph = FUEL_GLYPH[fuel];
  return (
    <g data-flow={fuel} opacity={used ? 1 : 0.45}>
      <Ring x={64} y={y}>
        <Glyph s={1} />
      </Ring>
      <text x={96} y={y + 6} fontSize="17" fontWeight="600" fill={TXT} fontFamily="ui-monospace, Menlo, monospace">
        {value}
      </text>
      <line x1={210} x2={wallX - 10} y1={y} y2={y} stroke={FAINT} strokeWidth="1.6" strokeDasharray={used ? undefined : "4 5"} />
      <circle cx={wallX - 8} cy={y} r="3" fill={used ? TXT : FAINT} />
    </g>
  );
}

/* one fuel's bar and, under it, its uses */
function FuelBar({ fuel, rows, y, kwh, barId }) {
  const total = rows.reduce((s, r) => s + r.kwh, 0) || 1;
  const Glyph = FUEL_GLYPH[fuel];
  let acc = 0;
  const x0 = 352;
  const width = 232;
  return (
    <g data-bar={fuel}>
      <g transform={`translate(${332} ${y + 6})`}>
        <Glyph s={0.8} c={MUT} />
      </g>
      <clipPath id={barId}>
        <rect x={x0} y={y} width={width} height="10" rx="5" />
      </clipPath>
      <rect x={x0} y={y} width={width} height="10" rx="5" fill={HAIR} />
      <g clipPath={`url(#${barId})`}>
        {rows.map((r) => {
          const x = x0 + (acc / total) * width;
          acc += r.kwh;
          return <rect key={r.use} x={x} y={y} width={Math.max((r.kwh / total) * width, 0)} height="10" fill={USE_COLOUR[r.use] || FAINT} />;
        })}
      </g>
      {rows.map((r, i) => {
        const x = 336 + (i % 2) * 130;
        const yy = y + 32 + Math.floor(i / 2) * 26;
        return (
          <g key={r.use} data-use={r.use}>
            <circle cx={x} cy={yy - 4} r="5" fill={USE_COLOUR[r.use] || FAINT} />
            <text x={x + 12} y={yy} fontSize="11" fontWeight="600" fill={TXT}>
              {r.label}
            </text>
            <text x={x + 12} y={yy + 13} fontSize="11" fill={MUT} fontFamily="ui-monospace, Menlo, monospace">
              {kwh(r.kwh)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------- the house */
export function House({ flows, band, caption }) {
  const { t, n } = useT();
  const [info, setInfo] = useState(false);
  if (!flows) return null;
  const kwh = (v) => t("kwh", { kwh: n(v) });
  const eur = (v) => t("eur", { eur: n(v) });
  const period = flows.period || {};
  const bill = flows.bill || {};
  const machine =
    flows.heater === "gas" ? ["gas", FlameRing] : flows.heater === "heat_pump" ? ["heat_pump", Fan] : flows.heater === "electric" ? ["electric", Coil] : null;
  const Machine = machine ? machine[1] : null;
  const conditioning = flows.conditioning || [];
  const fuels = Object.entries(flows.by_fuel || {}).filter(([, rows]) => rows.some((r) => r.kwh > 0.5));
  const labelOf = (use) => {
    for (const [, rows] of Object.entries(flows.by_fuel || {})) {
      const hit = rows.find((r) => r.use === use);
      if (hit && hit.label) return hit.label;
    }
    return "";
  };
  const hasGas = flows.gas_kwh > 0;

  // the layout grows with the bars inside the house
  let y = 262;
  const bars = fuels.map(([fuel, rows]) => {
    const block = { fuel, rows: rows.filter((r) => r.kwh > 0.5), y };
    y += 32 + Math.ceil(block.rows.length / 2) * 26 + 12;
    return block;
  });
  const bottom = Math.max(420, y + 6);
  const H = bottom + 86;
  const billRows = [
    ["electricity", bill.electricity, bill.electricity ? kwh(bill.electricity.kwh) : ""],
    ...(bill.gas ? [["gas", bill.gas, kwh(bill.gas.kwh)]] : []),
    ["water", bill.water, bill.water ? t("m3", { m3: n(bill.water.m3, 1) }) : ""],
  ].filter(([, part]) => part);
  const billHeight = 56 + billRows.length * 48 + 52;

  // the house: one stroke, eaves included
  const WALL_L = 318;
  const WALL_R = 602;

  return (
    <figure className="house" data-band={band}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t("house_title")}>
        {/* the ink card */}
        <rect x="0" y="0" width={W} height={H} rx="18" fill={INK} />

        {/* top left: the month and the outdoor temperature */}
        <g data-flow="outdoor">
          <text x="40" y="64" fontSize="20" fontWeight="700" fill={TXT}>
            {period.label || ""}
          </text>
          {period.periods > 1 ? (
            <text x="40" y="82" fontSize="11" fill={MUT}>
              {t("avg_of", { n: period.periods })}
            </text>
          ) : null}
          <g transform="translate(47 112)">
            <Thermo c={MUT} />
          </g>
          <text x="64" y="117" fontSize="15" fontWeight="600" fill={TXT} fontFamily="ui-monospace, Menlo, monospace">
            {period.outdoor_c != null ? `${n(period.outdoor_c, 1)} °C` : ""}
          </text>
        </g>

        {/* the inputs */}
        <Input y={190} fuel="electricity" value={kwh(flows.electricity_kwh)} used={flows.electricity_kwh > 0} wallX={WALL_L} />
        <Input y={265} fuel="gas" value={hasGas ? kwh(flows.gas_kwh) : "—"} used={hasGas} wallX={WALL_L} />
        <Input y={340} fuel="water" value={t("m3", { m3: n(flows.water_m3, 1) })} used wallX={WALL_L} />

        {/* the house: one green stroke, roof with its eaves, then the walls */}
        <path d="M292 166 L460 56 L628 166" fill="none" stroke={GREEN} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={`M${WALL_L} 158 L${WALL_L} ${bottom} L${WALL_R} ${bottom} L${WALL_R} 158`}
          fill="none"
          stroke={GREEN}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* under the roof: the indoor temperature */}
        <g data-flow="indoor">
          <g transform="translate(432 122)">
            <Thermo c={TXT} />
          </g>
          <text x="449" y="127" fontSize="15" fontWeight="600" fill={TXT} fontFamily="ui-monospace, Menlo, monospace">
            {period.indoor_c != null ? `${n(period.indoor_c, 1)} °C` : ""}
          </text>
        </g>

        {/* inside: the machine and what conditioning the rooms cost */}
        {machine ? (
          <g data-machine={machine[0]}>
            <Ring x={356} y={200} r={19}>
              <Machine />
            </Ring>
            <text x="388" y="192" fontSize="12" fontWeight="600" fill={MUT}>
              {t(`machine_${machine[0]}`)}
              {flows.heater_kw ? ` · ${t("kw", { kw: n(flows.heater_kw, 1) })}` : ""}
            </text>
          </g>
        ) : (
          <text x="340" y="192" fontSize="12" fontWeight="600" fill={MUT}>
            {t("machine_none")}
          </text>
        )}
        <g data-flow="conditioning">
          {conditioning.length ? (
            conditioning.map((c, i) => {
              const yy = 216 + i * 24;
              return (
                <g key={c.kind}>
                  <text x={388} y={yy} fontSize={conditioning.length > 1 ? 16 : 21} fontWeight="700" fill={GREEN} fontFamily="ui-monospace, Menlo, monospace">
                    {kwh(c.kwh)}
                  </text>
                  <text x={558} y={yy} fontSize="11" fill={MUT} textAnchor="end">
                    {labelOf(c.kind)}
                  </text>
                </g>
              );
            })
          ) : (
            <text x="388" y="216" fontSize="21" fontWeight="700" fill={TXT} fontFamily="ui-monospace, Menlo, monospace">
              —
            </text>
          )}
          {/* the info button: the detail behind the number */}
          <g
            className="info"
            role="button"
            tabIndex={0}
            aria-label={t("details")}
            onClick={() => setInfo((v) => !v)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setInfo((v) => !v)}
            transform="translate(574 206)"
            style={{ cursor: "pointer" }}
          >
            <circle r="11" fill={info ? TXT : "none"} stroke={info ? TXT : MUT} strokeWidth="1.8" />
            <text y="4" fontSize="12" fontWeight="700" textAnchor="middle" fill={info ? INK : MUT}>
              i
            </text>
          </g>
        </g>

        {/* inside: one bar per fuel, its uses under it */}
        {bars.map((b, i) => (
          <FuelBar key={b.fuel} fuel={b.fuel} rows={b.rows} y={b.y} kwh={kwh} barId={`bar-${i}`} />
        ))}

        {/* beside the house: the monthly bill */}
        <g data-flow="bill">
          <rect x="644" y="56" width="204" height={billHeight} rx="12" fill={PANEL} />
          <text x="662" y="86" fontSize="12" fontWeight="600" fill={MUT}>
            {t("monthly_bill")}
          </text>
          {billRows.map(([fuel, part, amount], i) => {
            const Glyph = FUEL_GLYPH[fuel];
            const yy = 118 + i * 48;
            return (
              <g key={fuel} data-bill={fuel}>
                <g transform={`translate(${668} ${yy - 4})`}>
                  <Glyph s={0.75} c={TXT} />
                </g>
                <text x={690} y={yy} fontSize="17" fontWeight="600" fill={TXT} fontFamily="ui-monospace, Menlo, monospace">
                  {eur(part.eur)}
                </text>
                <text x={690} y={yy + 16} fontSize="11" fill={part.exact ? MUT : VIOLET}>
                  {amount}
                  {part.exact ? "" : ` · ${t("estimated")}`}
                </text>
              </g>
            );
          })}
          <line x1="662" x2="830" y1={56 + billHeight - 46} y2={56 + billHeight - 46} stroke={HAIR} strokeWidth="1.5" />
          <text x="662" y={56 + billHeight - 20} fontSize="12" fontWeight="600" fill={MUT}>
            {t("bill_total")}
          </text>
          <text x="830" y={56 + billHeight - 18} fontSize="21" fontWeight="700" textAnchor="end" fill={GREEN} fontFamily="ui-monospace, Menlo, monospace">
            {eur(bill.total_eur || 0)}
          </text>
        </g>

        {/* the caption, on the card */}
        <text x="40" y={H - 28} fontSize="11.5" fill={MUT}>
          {caption}
        </text>
      </svg>
      {info ? (
        <div className="house-info" data-info="open">
          <p className="tile-label">{t("details")}</p>
          <dl className="summary">
            {[
              ["detail_heat_made", flows.heat_kwh != null ? kwh(flows.heat_kwh) : "—"],
              ["detail_other_heat", kwh(flows.gains_kwh || 0)],
              ["detail_loss_rate", `${t("w_per_k", { w: n(flows.loss_w_per_k) })} · ${t("kw", { kw: n(flows.loss_kw, 1) })}`],
              ["detail_loss", kwh(flows.loss_kwh)],
              ["detail_fabric", kwh(flows.loss_fabric_kwh)],
              ["detail_radiation", kwh(flows.loss_radiation_kwh || 0)],
              ["detail_air", kwh(flows.loss_air_kwh)],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt>{t(k)}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="small">{t("detail_note")}</p>
        </div>
      ) : null}
    </figure>
  );
}
