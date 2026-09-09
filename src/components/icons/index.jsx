const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ children, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...base}
      {...props}
    >
      {children}
    </svg>
  );
}

export function DocumentIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </Svg>
  );
}

export function EmailIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </Svg>
  );
}

export function DatabaseIcon(props) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5V18c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5" />
      <path d="M5 11.75C5 13.15 8.1 14.25 12 14.25s7-1.1 7-2.5" />
    </Svg>
  );
}

export function FormIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h4" />
      <path d="m14.5 15.5 1 1 2-2" />
    </Svg>
  );
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </Svg>
  );
}

export function RegistryIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M16 4v3h3" />
      <path d="M8 12h8M8 16h5" />
    </Svg>
  );
}

export function AlertIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 21 19H3L12 3.5Z" />
      <path d="M12 10v4" />
      <path d="M12 16.7v.1" />
    </Svg>
  );
}

export function FolderIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17Z" />
    </Svg>
  );
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m19.5 19.5-4.35-4.35" />
    </Svg>
  );
}

export function CopyIcon(props) {
  return (
    <Svg {...props}>
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
    </Svg>
  );
}

export function SendIcon(props) {
  return (
    <Svg {...props}>
      <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
      <path d="M10 13 21 3" />
    </Svg>
  );
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.5 2" />
    </Svg>
  );
}

export function ProcessIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.2 10.5 16M15.8 7.2 13.5 16M8.5 6h7" />
    </Svg>
  );
}

export function LayersIcon(props) {
  return (
    <Svg {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </Svg>
  );
}

export function AutomationIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9" />
    </Svg>
  );
}

export function SignatureIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 17c2-4.5 3.5-7 5-7s1.5 3 3 3 3-6 5-6 2.5 6 4 6" />
      <path d="M4 20.5h16" />
    </Svg>
  );
}

export function GraduationCapIcon(props) {
  return (
    <Svg {...props}>
      <path d="m2.5 8.5 9.5-4 9.5 4-9.5 4-9.5-4Z" />
      <path d="M6 10.5V15c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" />
      <path d="M21 8.5v5" />
    </Svg>
  );
}

export function UsersIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15.8 14.3c2.3.3 4.2 2 4.2 4.7" />
    </Svg>
  );
}

export function EnvironmentIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </Svg>
  );
}

export function EyeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  );
}

export function TagIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12.5 3.5H19a1.5 1.5 0 0 1 1.5 1.5v6.5a1.5 1.5 0 0 1-.44 1.06l-8 8a1.5 1.5 0 0 1-2.12 0l-6.5-6.5a1.5 1.5 0 0 1 0-2.12l8-8A1.5 1.5 0 0 1 12.5 3.5Z" />
      <circle cx="16" cy="8" r="1.4" />
    </Svg>
  );
}

export function ArchiveIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4" width="17" height="4.5" rx="1" />
      <path d="M4.5 8.5V19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V8.5" />
      <path d="M10 13h4" />
    </Svg>
  );
}

export function BarChartIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 19V11" />
      <path d="M12 19V5" />
      <path d="M19 19V13" />
    </Svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h15.5" />
      <path d="m14 6 6 6-6 6" />
    </Svg>
  );
}
