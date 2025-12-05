import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

// Apple icon generation - matches the logo.svg design
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {/* Circular background with gradient */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
          }}
        >
          {/* Inner subtle ring */}
          <div
            style={{
              width: "85%",
              height: "85%",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* DB Text */}
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "white",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-2px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              DB
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
