export function shouldShowRouteHeader(path) {
  const normalizedPath = String(path || '/').replace(/\/+$/, '') || '/';
  return normalizedPath !== '/website';
}
