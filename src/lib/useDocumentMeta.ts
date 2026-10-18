import { useEffect } from "react";

const SITE_TITLE_SUFFIX = " | All The Coffee";

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title.endsWith(SITE_TITLE_SUFFIX) || title === "All The Coffee" ? title : title + SITE_TITLE_SUFFIX;

    let previousDescription: string | null = null;
    let metaEl: HTMLMetaElement | null = null;
    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      if (metaEl) {
        previousDescription = metaEl.getAttribute("content");
        metaEl.setAttribute("content", description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaEl && previousDescription !== null) metaEl.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
