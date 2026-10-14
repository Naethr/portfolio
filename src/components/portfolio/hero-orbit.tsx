import {
  siNextdotjs,
  siReact,
  siRubyonrails,
  siTypescript,
  siPostgresql,
} from "simple-icons";

const stackNodes = [
  { name: "React", x: 167, y: 225, path: siReact.path },
  { name: "Next.js", x: 390, y: 127, path: siNextdotjs.path },
  { name: "Rails", x: 501, y: 325, path: siRubyonrails.path },
  { name: "TypeScript", x: 208, y: 493, path: siTypescript.path },
  { name: "SQL", x: 426, y: 495, path: siPostgresql.path },
];

export function HeroOrbit() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="hero-orbit-svg"
      viewBox="0 0 640 640"
      fill="none"
    >
      <g className="hero-orbit-turn">
        <circle cx="320" cy="320" r="289" className="hero-orbit-dotted" />
        <path d="M320 20v26m0 548v26M20 320h26m548 0h26" className="hero-orbit-cardinals" />
      </g>

      <circle cx="320" cy="320" r="244" className="hero-orbit-fine" />
      <circle cx="320" cy="320" r="173" className="hero-orbit-fine hero-orbit-inner-ring" />
      <ellipse cx="320" cy="320" rx="246" ry="118" transform="rotate(-27 320 320)" className="hero-orbit-track" />
      <ellipse cx="320" cy="320" rx="251" ry="112" transform="rotate(43 320 320)" className="hero-orbit-track hero-orbit-track-muted" />

      <path d="M194 209Q280 142 363 139M416 146Q492 202 496 283M482 356Q473 427 448 465M395 500Q309 527 242 501M197 463Q133 359 159 263" className="hero-orbit-connection" />
      <path d="M178 256Q229 320 270 320M365 320Q417 326 462 324" className="hero-orbit-connection-soft" />

      <g className="hero-orbit-core">
        <circle cx="320" cy="320" r="73" className="hero-orbit-core-rim" />
        <circle cx="320" cy="320" r="57" className="hero-orbit-core-disc" />
        <path d="M320 280v80m-40-40h80" className="hero-orbit-core-axis" />
        <circle cx="320" cy="320" r="10" className="hero-orbit-core-center" />
      </g>

      {stackNodes.map(({ name, x, y, path }) => (
        <g key={name} className="hero-orbit-node" transform={`translate(${x} ${y})`}>
          <circle r="41" className="hero-orbit-node-rim" />
          <circle r="35" className="hero-orbit-node-disc" />
          <svg x="-13" y="-20" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="hero-orbit-node-icon">
            <path d={path} />
          </svg>
          <text y="21" textAnchor="middle">{name}</text>
        </g>
      ))}

      <circle cx="90" cy="334" r="3" className="hero-orbit-signal hero-orbit-signal-one" />
      <circle cx="551" cy="225" r="2.5" className="hero-orbit-signal hero-orbit-signal-two" />
      <circle cx="279" cy="91" r="2" className="hero-orbit-signal" />
    </svg>
  );
}
