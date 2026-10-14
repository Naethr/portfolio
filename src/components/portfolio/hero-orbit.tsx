import {
  siNextdotjs,
  siReact,
  siRubyonrails,
  siTypescript,
  siPostgresql,
} from "simple-icons";

const stackNodes = [
  { name: "React", x: 167, y: 225, path: siReact.path, outer: 41, inner: 35 },
  { name: "Next.js", x: 390, y: 127, path: siNextdotjs.path, outer: 41, inner: 35 },
  { name: "Rails", x: 501, y: 325, path: siRubyonrails.path, outer: 41, inner: 35 },
  { name: "TypeScript", x: 208, y: 493, path: siTypescript.path, outer: 49, inner: 43 },
  { name: "SQL", x: 426, y: 495, path: siPostgresql.path, outer: 41, inner: 35 },
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
      </g>

      <circle cx="320" cy="320" r="244" className="hero-orbit-fine" />
      <circle cx="320" cy="320" r="173" className="hero-orbit-fine hero-orbit-inner-ring" />
      <ellipse cx="320" cy="320" rx="246" ry="118" transform="rotate(-27 320 320)" className="hero-orbit-track" />
      <ellipse cx="320" cy="320" rx="251" ry="112" transform="rotate(43 320 320)" className="hero-orbit-track hero-orbit-track-muted" />

      <path d="M194 209Q280 142 363 139M416 146Q492 202 496 283M482 356Q473 427 448 465M395 500Q309 527 242 501M197 463Q133 359 159 263" className="hero-orbit-connection" />
      <path d="M178 256Q229 320 270 320M365 320Q417 326 462 324" className="hero-orbit-connection-soft" />

      <g className="hero-orbit-core">
        <circle cx="320" cy="320" r="33" className="hero-orbit-core-disc" />
        <circle cx="320" cy="320" r="6" className="hero-orbit-core-center" />
      </g>

      {stackNodes.map(({ name, x, y, path, outer, inner }) => (
        <g key={name} transform={`translate(${x} ${y})`}>
          <g className="hero-orbit-node">
            <circle r={outer} className="hero-orbit-node-rim" />
            <circle r={inner} className="hero-orbit-node-disc" />
            <svg x="-13" y="-21" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="hero-orbit-node-icon">
              <path d={path} />
            </svg>
            <text y="22" textAnchor="middle">{name}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}
