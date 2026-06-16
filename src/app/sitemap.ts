import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServiceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "weekly" as const },
    { path: "/gallery", priority: 0.7, freq: "monthly" as const },
    { path: "/about", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.9, freq: "monthly" as const },
    { path: "/privacy", priority: 0.2, freq: "yearly" as const },
  ];

  const serviceRoutes = getServiceSlugs().map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    freq: "monthly" as const,
  }));

  return [...staticRoutes, ...serviceRoutes].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
