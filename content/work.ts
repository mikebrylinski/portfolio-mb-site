/**
 * Portfolio work samples — replace image URLs or add files under /public/work/
 * Videos: place .mp4 (or .webm) in public/work/ and set `src` to "/work/your-file.mp4"
 */

export type WorkItem = {
  id: string;
  title: string;
  caption: string;
  type: "image" | "video";
  /** Image: full URL (https) or path like /work/shot.png. Video: path under public/ */
  src: string;
  /** Optional poster image for video */
  poster?: string;
};

export const workItems: WorkItem[] = [
  {
    id: "1",
    title: "React dashboard",
    caption: "Data-heavy UI — charts, filters, and real-time updates.",
    type: "image",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "Shopify storefront",
    caption: "Custom theme, conversion-focused product detail and checkout flow.",
    type: "image",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Product walkthrough",
    caption: "Screen recording or demo reel — add your clip to public/work/.",
    type: "video",
    src: "",
    poster:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
  },
];
