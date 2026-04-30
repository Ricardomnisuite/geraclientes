// Abstract minimalist SVG graphic used for blog cards (no photos)
// Variant determines the pattern. Pure SVG + CSS.

export default function BlogGraphic({ variant = 0, className = "" }) {
    const variants = [v0, v1, v2, v3, v4];
    const Graphic = variants[variant % variants.length];
    return (
        <div
            className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl ${className}`}
            aria-hidden="true"
        >
            <Graphic />
        </div>
    );
}

function v0() {
    // Rising bars (Google Ads)
    return (
        <svg
            viewBox="0 0 400 250"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="g0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#F8FAFC" />
                    <stop offset="1" stopColor="#EFF6FF" />
                </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#g0)" />
            <g>
                {[
                    { x: 50, h: 60 },
                    { x: 100, h: 95 },
                    { x: 150, h: 130 },
                    { x: 200, h: 160 },
                    { x: 250, h: 190 },
                    { x: 300, h: 220 },
                ].map((b, i) => (
                    <rect
                        key={i}
                        x={b.x}
                        y={240 - b.h}
                        width="28"
                        height={b.h}
                        fill={i === 5 ? "#2563EB" : "#0A0A0A"}
                        rx="3"
                        opacity={i === 5 ? 1 : 0.12 + i * 0.12}
                    />
                ))}
            </g>
            <line x1="20" y1="240" x2="380" y2="240" stroke="#CBD5E1" strokeWidth="1" />
        </svg>
    );
}

function v1() {
    // Price tag / cost (Quanto custa)
    return (
        <svg viewBox="0 0 400 250" className="w-full h-full">
            <rect width="400" height="250" fill="#F8FAFC" />
            <circle cx="200" cy="125" r="70" fill="#2563EB" opacity="0.08" />
            <circle cx="200" cy="125" r="45" fill="#2563EB" opacity="0.15" />
            <text
                x="200"
                y="135"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight="800"
                fontSize="32"
                fill="#0A0A0A"
                letterSpacing="-1.5"
            >
                €
            </text>
            {/* Dots grid */}
            {[...Array(24)].map((_, i) => (
                <circle
                    key={i}
                    cx={30 + (i % 8) * 48}
                    cy={30 + Math.floor(i / 8) * 70}
                    r="1.5"
                    fill="#94A3B8"
                    opacity="0.35"
                />
            ))}
        </svg>
    );
}

function v2() {
    // Lead funnel
    return (
        <svg viewBox="0 0 400 250" className="w-full h-full">
            <rect width="400" height="250" fill="#F8FAFC" />
            <path d="M80 60 L320 60 L240 130 L240 200 L160 200 L160 130 Z" fill="#0A0A0A" opacity="0.85" />
            <path d="M80 60 L320 60 L240 130 L240 160 L160 160 L160 130 Z" fill="#2563EB" />
            <circle cx="200" cy="220" r="8" fill="#2563EB" />
            <circle cx="175" cy="220" r="6" fill="#2563EB" opacity="0.5" />
            <circle cx="225" cy="220" r="6" fill="#2563EB" opacity="0.5" />
        </svg>
    );
}

function v3() {
    // Social / network
    return (
        <svg viewBox="0 0 400 250" className="w-full h-full">
            <rect width="400" height="250" fill="#F8FAFC" />
            {/* Nodes */}
            <g stroke="#CBD5E1" strokeWidth="1">
                <line x1="200" y1="125" x2="100" y2="60" />
                <line x1="200" y1="125" x2="310" y2="55" />
                <line x1="200" y1="125" x2="80" y2="180" />
                <line x1="200" y1="125" x2="330" y2="190" />
                <line x1="200" y1="125" x2="200" y2="40" />
                <line x1="200" y1="125" x2="200" y2="220" />
            </g>
            <circle cx="200" cy="125" r="22" fill="#2563EB" />
            <circle cx="100" cy="60" r="10" fill="#0A0A0A" />
            <circle cx="310" cy="55" r="10" fill="#0A0A0A" />
            <circle cx="80" cy="180" r="10" fill="#0A0A0A" />
            <circle cx="330" cy="190" r="10" fill="#0A0A0A" />
            <circle cx="200" cy="40" r="10" fill="#0A0A0A" />
            <circle cx="200" cy="220" r="10" fill="#0A0A0A" />
        </svg>
    );
}

function v4() {
    // Website wireframe
    return (
        <svg viewBox="0 0 400 250" className="w-full h-full">
            <rect width="400" height="250" fill="#F8FAFC" />
            <rect x="60" y="40" width="280" height="170" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
            <rect x="60" y="40" width="280" height="28" rx="8" fill="#0A0A0A" />
            <circle cx="74" cy="54" r="3" fill="#FFFFFF" opacity="0.5" />
            <circle cx="86" cy="54" r="3" fill="#FFFFFF" opacity="0.5" />
            <circle cx="98" cy="54" r="3" fill="#FFFFFF" opacity="0.5" />
            <rect x="78" y="88" width="100" height="10" rx="2" fill="#0A0A0A" />
            <rect x="78" y="108" width="160" height="6" rx="2" fill="#CBD5E1" />
            <rect x="78" y="122" width="140" height="6" rx="2" fill="#CBD5E1" />
            <rect x="78" y="144" width="80" height="24" rx="4" fill="#2563EB" />
            <rect x="230" y="88" width="90" height="80" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
        </svg>
    );
}
