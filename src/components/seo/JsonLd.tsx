/**
 * Renders a JSON-LD <script> for structured data.
 * Server component — safe to drop into any page/layout.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user input); this is the
      // documented Next.js pattern for structured data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
