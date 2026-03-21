const prefersReducedMotion = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

const resolveBehavior = (): ScrollBehavior => (prefersReducedMotion() ? "auto" : "smooth");

export const scrollToTop = () => {
  if (typeof window === "undefined" || typeof window.scrollTo !== "function") {
    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: resolveBehavior(),
  });
};

export const scrollElementIntoView = (
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = {},
) => {
  if (!element || typeof element.scrollIntoView !== "function") {
    return;
  }

  element.scrollIntoView({
    behavior: resolveBehavior(),
    block: options.block ?? "start",
    inline: options.inline ?? "nearest",
  });
};

export const scrollToId = (
  targetId: string,
  options: ScrollIntoViewOptions = {},
) => {
  if (typeof document === "undefined") {
    return;
  }

  const normalizedId = targetId.replace(/^#/, "");
  const element = document.getElementById(normalizedId);
  scrollElementIntoView(element, options);
};

export const scrollNodeIntoView = (
  node: HTMLElement | null,
  options: ScrollIntoViewOptions = {},
) => {
  scrollElementIntoView(node, options);
};
