import React from "react";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-16 h-auto fill-blue-950 transition-colors duration-200 ease-in ${className}`}
            viewBox="0 0 330.000000 260.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform="translate(0.000000,260.000000) scale(0.100000,-0.100000)" stroke="none">
                <path
                    d="M1522 2365 c-75 -21 -233 -119 -304 -189 -67 -67 -114 -141 -123
-198 -15 -86 61 -227 163 -302 61 -44 88 -53 209 -67 88 -10 160 -6 321 18 42
6 43 5 37 -18 -3 -13 -16 -105 -30 -204 -45 -324 -55 -389 -71 -436 -13 -42
-38 -74 -71 -93 -28 -15 -91 27 -180 120 l-92 97 -50 -5 c-92 -9 -154 -86
-136 -168 9 -40 60 -93 131 -137 34 -21 106 -68 160 -105 106 -71 160 -98 184
-90 52 16 86 42 130 101 68 89 88 150 111 326 45 345 120 636 214 835 94 195
99 266 22 300 -97 45 -162 8 -197 -112 -34 -111 -111 -178 -245 -214 -59 -16
-185 -18 -235 -4 -46 13 -103 61 -124 104 -15 32 -15 39 -2 64 18 34 81 93
143 132 65 41 128 54 205 41 35 -5 79 -13 98 -16 53 -9 65 5 64 70 -1 47 -6
61 -29 85 -61 64 -200 94 -303 65z"
                />
                <path
                    d="M687 2153 c-6 -9 -32 -703 -32 -833 0 -141 23 -200 78 -200 45 0 51
13 31 66 -22 58 -25 214 -10 665 l9 276 -24 16 c-25 18 -45 22 -52 10z"
                />
                <path
                    d="M68 1983 c-17 -20 -49 -340 -56 -556 -3 -114 -1 -132 18 -171 23 -48
68 -88 128 -113 49 -20 169 -13 234 15 61 27 125 93 134 139 8 44 -9 103 -42
142 -48 57 -146 76 -314 61 l-55 -5 -3 45 c-1 25 6 131 16 235 17 170 18 192
4 208 -8 9 -23 17 -32 17 -9 0 -24 -8 -32 -17z m302 -581 c14 -11 31 -30 39
-44 35 -62 -57 -132 -163 -125 -53 3 -62 7 -93 41 -58 63 -32 113 74 142 58
16 109 11 143 -14z"
                />
                <path
                    d="M2572 1825 c-75 -21 -233 -119 -304 -189 -67 -67 -114 -141 -123
-198 -15 -86 61 -227 163 -302 61 -44 88 -53 209 -67 88 -10 160 -6 321 18 42
6 43 5 37 -18 -3 -13 -16 -105 -30 -204 -45 -324 -55 -389 -71 -436 -13 -42
-38 -74 -71 -93 -28 -15 -91 27 -180 120 l-92 97 -50 -5 c-92 -9 -154 -86
-136 -168 9 -40 60 -93 131 -137 34 -21 106 -68 160 -105 106 -71 160 -98 184
-90 52 16 86 42 130 101 68 89 88 150 111 326 45 345 120 636 214 835 94 195
99 266 22 300 -97 45 -162 8 -197 -112 -34 -111 -111 -178 -245 -214 -59 -16
-185 -18 -235 -4 -46 13 -103 61 -124 104 -15 32 -15 39 -2 64 18 34 81 93
143 132 65 41 128 54 205 41 35 -5 79 -13 98 -16 53 -9 65 5 64 70 -1 47 -6
61 -29 85 -61 64 -200 94 -303 65z"
                />
                <path
                    d="M1095 1591 c-34 -8 -137 -61 -175 -91 -24 -18 -25 -22 -22 -117 3
-83 8 -105 30 -148 33 -61 68 -82 160 -95 149 -21 297 36 366 140 16 24 26 54
26 75 0 102 -119 207 -265 234 -65 12 -76 12 -120 2z m196 -123 c104 -53 120
-109 52 -180 -77 -81 -284 -92 -323 -17 -17 30 -14 96 4 124 9 14 39 43 67 65
66 52 109 54 200 8z"
                />
            </g>
        </svg>
    );
};

export default Logo;
