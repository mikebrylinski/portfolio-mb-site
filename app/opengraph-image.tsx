import { OgImage, ogAlt, ogContentType, ogSize } from "@/lib/og-card";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return OgImage();
}
