import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a2540",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="42" r="34" fill="#c99a3f" />
          <path
            d="M34 30l16 24 16-24"
            stroke="#1a2540"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
