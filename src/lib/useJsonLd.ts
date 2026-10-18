import { useEffect } from "react";

// Injects a <script type="application/ld+json"> into <head> for the lifetime
// of the calling component. Depends on the stringified content rather than
// the object reference, so callers don't need to memoize `data` themselves.
export function useJsonLd(data: object) {
  const serialized = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = serialized;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [serialized]);
}
