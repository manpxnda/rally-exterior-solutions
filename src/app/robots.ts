import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Allow standard crawlers AND explicitly welcome AI/answer-engine crawlers so
 * Rally can be cited in AI Overviews, ChatGPT, Perplexity, etc. (Some sites
 * accidentally block these and vanish from AI answers — we opt in.)
 */
const AI_BOTS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Google AI (Gemini / AI Overviews)
  "Applebot-Extended",
  "Amazonbot",
  "CCBot", // Common Crawl (feeds many models)
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/thank-you", "/dashboard"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_BOTS, allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
