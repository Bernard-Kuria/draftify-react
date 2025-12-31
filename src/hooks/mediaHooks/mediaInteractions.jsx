import imageCompression from "browser-image-compression";
import { mediaType } from "../../utils/conversions";

// Shared compression function
async function compressImageIfNeeded(
  file,
  setCompressing,
  setCompressionProgress
) {
  if (mediaType(file.name) !== "image") return file;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onProgress: (p) => setCompressionProgress(p),
  };

  try {
    setCompressing(true);

    const compressedBlob = await imageCompression(file, options);

    const compressedFile =
      compressedBlob instanceof File
        ? compressedBlob
        : new File([compressedBlob], file.name, { type: file.type });

    return compressedFile;
  } catch (err) {
    console.error("Compression failed; using original file:", err);
    return file;
  } finally {
    setCompressing(false);
  }
}

export async function dropHandler(
  e,
  setFile,
  setFileName,
  setCompressing,
  setCompressionProgress
) {
  e.preventDefault();

  for (const item of e.dataTransfer.items) {
    if (item.kind === "file") {
      const fileObj = item.getAsFile();
      if (!fileObj) continue;

      const compressed = await compressImageIfNeeded(
        fileObj,
        setCompressing,
        setCompressionProgress
      );

      setFile(URL.createObjectURL(compressed));
      setFileName(compressed.name);
    }
  }
}

export async function onFileChange(
  e,
  setFile,
  setFileName,
  setCompressing,
  setCompressionProgress
) {
  const selectedFile = e.target.files?.[0];
  if (!selectedFile) return;

  const compressed = await compressImageIfNeeded(
    selectedFile,
    setCompressing,
    setCompressionProgress
  );

  setFile(URL.createObjectURL(compressed));
  setFileName(compressed.name);
}

export function dragHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "blue";
  }
}

export function dragLeaveHandler(e, output) {
  e.preventDefault();
  if (output.current) {
    output.current.style.borderColor = "grey";
  }
}
