import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get params from URL
    const title = searchParams.get("title") || "FOSSRadar";
    const description = searchParams.get("description") || "India's Open Source Directory";
    const type = searchParams.get("type") || "default"; // "project" or "default"
    const language = searchParams.get("language") || "";
    const stars = searchParams.get("stars") || "";
    const location = searchParams.get("location") || "";

    // Generate OG image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0a0a0f",
            padding: "60px",
            position: "relative",
          }}
        >
          {/* Background gradient effects */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
            }}
          />

          {/* India flag inspired accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              display: "flex",
            }}
          >
            <div style={{ flex: 1, backgroundColor: "#f97316" }} />
            <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
            <div style={{ flex: 1, backgroundColor: "#22c55e" }} />
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* FOSSRadar Logo/Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
                  <path d="M4 6h.01" />
                  <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
                  <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
                  <path d="M12 18h.01" />
                  <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="m13.41 10.59 5.66-5.66" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                foss<span style={{ color: "#f97316" }}>radar</span><span style={{ color: "#6b7280" }}>.dev</span>
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: type === "project" ? "64px" : "72px",
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "24px",
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                style={{
                  fontSize: "28px",
                  color: "#9ca3af",
                  lineHeight: 1.4,
                  maxWidth: "800px",
                  marginBottom: "32px",
                }}
              >
                {description.length > 120
                  ? description.substring(0, 120) + "..."
                  : description}
              </p>
            )}

            {/* Project metadata */}
            {type === "project" && (
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                {language && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      backgroundColor: "rgba(249, 115, 22, 0.2)",
                      borderRadius: "8px",
                      border: "1px solid rgba(249, 115, 22, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "#f97316",
                      }}
                    />
                    <span style={{ color: "#f97316", fontSize: "20px" }}>
                      {language}
                    </span>
                  </div>
                )}
                {stars && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      backgroundColor: "rgba(234, 179, 8, 0.2)",
                      borderRadius: "8px",
                      border: "1px solid rgba(234, 179, 8, 0.3)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#eab308"
                      stroke="#eab308"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span style={{ color: "#eab308", fontSize: "20px" }}>
                      {stars}
                    </span>
                  </div>
                )}
                {location && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      backgroundColor: "rgba(34, 197, 94, 0.2)",
                      borderRadius: "8px",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span style={{ color: "#22c55e", fontSize: "20px" }}>
                      {location}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <span style={{ color: "#6b7280", fontSize: "20px" }}>
              fossradar.dev
            </span>
            <span style={{ color: "#6b7280", fontSize: "20px" }}>
              India&apos;s Open Source Directory
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Image generation error:", e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
