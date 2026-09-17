const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (
  process.env.NODE_ENV === "production" ? "/portofolio-ppg-aladona" : ""
);

export function assetPath(path?: string) {
  if (!path) return "";

  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
