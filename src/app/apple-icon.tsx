import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#f4eee2" }}>
        <svg width="140" height="140" viewBox="0 0 48 48">
          <path d="M5 29.5 Q24 27.6 43 29.5" fill="none" stroke="#23271d" strokeWidth="1.4" opacity=".5" />
          <path d="M27 11 V29 C27 37.5 23.8 42 18.6 42 C14.6 42 12.6 39 12.8 35.8" fill="none" stroke="#23271d" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M27 15.5 C20.5 15.6 16.4 11.6 15.4 5.6 C21.6 5.4 26 8.8 27 15.5Z" fill="#a3461e" />
          <path d="M27 12.6 C29.6 7.4 34.6 4.6 41 5.2 C39.4 11.2 34 13.8 27 12.6Z" fill="#6f8f45" />
        </svg>
      </div>
    ),
    size,
  );
}
