export function navigate(href) {
  // Use history API for client-side navigation and notify app
  if (typeof window === 'undefined') return;
  try {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event('locationchange'));
  } catch (e) {
    // fallback to full navigation
    window.location.href = href;
  }
}
