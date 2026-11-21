import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

export const alt = "Services Jardin Joannic : entretien de jardin, terrasses bois et conseil habitat autour de Moréac";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource/fraunces/files");
const [regular, italic, photo] = await Promise.all([
  readFile(join(fontDir, "fraunces-latin-400-normal.woff")),
  readFile(join(fontDir, "fraunces-latin-400-italic.woff")),
  readFile(join(process.cwd(), "src/assets/og-photo.jpg")),
]);
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f4eee2", fontFamily: "Fraunces" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640, padding: "64px 56px 56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="64" height="64" viewBox="0 0 48 48">
              <path d="M27 11 V29 C27 37.5 23.8 42 18.6 42 C14.6 42 12.6 39 12.8 35.8" fill="none" stroke="#23271d" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M27 15.5 C20.5 15.6 16.4 11.6 15.4 5.6 C21.6 5.4 26 8.8 27 15.5Z" fill="#a3461e" />
              <path d="M27 12.6 C29.6 7.4 34.6 4.6 41 5.2 C39.4 11.2 34 13.8 27 12.6Z" fill="#6f8f45" />
              <path d="M5 29.5 Q24 27.6 43 29.5" fill="none" stroke="#23271d" strokeWidth="1.4" opacity=".5" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontStyle: "italic", color: "#23271d" }}>Joannic</span>
              <span style={{ fontSize: 15, letterSpacing: 4, color: "#4b4e40", fontFamily: "sans-serif" }}>SERVICES JARDIN</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 56, lineHeight: 1.05, color: "#23271d", letterSpacing: -1.5 }}>Paysagiste en éco-jardinage, constructions bois légères</span>
            <span style={{ fontSize: 56, lineHeight: 1.1, fontStyle: "italic", color: "#a3461e" }}>et conseil en bâtiment</span>
          </div>
          <span style={{ fontSize: 30, color: "#3f5a2b" }}>07 52 08 70 16</span>
        </div>
        <div style={{ display: "flex", flex: 1, padding: "40px 40px 40px 0" }}>
          <img src={photoSrc} alt="" width={520} height={550} style={{ width: 520, height: 550, objectFit: "cover", borderRadius: "260px 260px 28px 28px" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: regular, style: "normal", weight: 400 },
        { name: "Fraunces", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
