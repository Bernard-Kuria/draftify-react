// Get media url type
export const mediaType = (url: string) => {
  if (!url || typeof url !== "string") return "unknown";

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];
  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".mkv",
    ".webm",
  ];

  for (const ext of imageExtensions) {
    if (url.toLowerCase().includes(ext)) return "image";
  }

  for (const ext of videoExtensions) {
    if (url.toLowerCase().includes(ext)) return "video";
  }

  return "unknown";
};
