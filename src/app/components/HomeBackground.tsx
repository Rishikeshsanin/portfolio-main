"use client";

export default function HomeBackground({ quality = "default" }: { quality?: "default" | "lite" }) {
  return (
    <div className="friend-bg" aria-hidden="true" data-quality={quality}>
      <div className="friend-grid" />
      <div className="friend-pixels" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_48%,rgba(4,15,36,0.12)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(4,15,36,0.4)_100%)]" />
    </div>
  );
}
