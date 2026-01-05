import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
  onFileChange,
} from "../../hooks/mediaHooks/mediaInteractions";

import { mediaType } from "../../utils/conversions";

import styles from "../module-styling/MediaEditor.module.css";

const mediaStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "10px",
};

function ProgressDonut({ progress = null }) {
  const angle = progress !== null ? (progress / 100) * 360 : 0;

  return (
    <div className={styles.donutContainer}>
      <div
        className={styles.donutOuter}
        style={{
          background: `conic-gradient(rgb(59, 130, 246) ${angle}deg, transparent 0)`,
        }}
      >
        <div className={styles.donutInner}>
          <div>
            <div style={{ fontStyle: "italic", fontSize: "13px" }}>
              progress
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              {progress !== null && `${progress}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MediaEditor({ mediaBlock, modifyMedia }) {
  const [info, setInfo] = useState("");
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [compressing, setCompressing] = useState(false);
  const [compressingProgress, setCompressionProgress] = useState(null);

  const output = useRef(null);
  useEffect(() => {
    window.addEventListener("dragover", (e) => e.preventDefault());
    window.addEventListener("drop", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    setInfo("To remove image or video component, refresh first.");
    if (mediaBlock.data.src !== "") {
      setFile(mediaBlock.data.src);
      setFileType(mediaBlock.type);
    }
  }, [mediaBlock.data.src, mediaBlock.type]);

  useEffect(() => {
    if (file && file instanceof File) {
      const mediaFile = URL.createObjectURL(file);
      if (mediaBlock.type === "image") {
        modifyMedia({
          imageBlockId: mediaBlock.id,
          src: mediaFile,
          alt: mediaBlock.data.alt,
          caption: mediaBlock.data.caption,
        });
      } else if (mediaBlock.type === "video") {
        modifyMedia({
          videoBlockId: mediaBlock.id,
          src: mediaFile,
          provider: mediaBlock.data.provider,
        });
      }
    }

    if (fileName) {
      setFileType(mediaType(fileName));
    }
  }, [file]);

  const handleRefresh = () => {
    setFile("");
    setFileName("");

    if (mediaBlock.type === "image") {
      modifyMedia({
        imageBlockId: mediaBlock.id,
        src: "",
        alt: mediaBlock.data.alt,
        caption: mediaBlock.data.caption,
      });
    } else if (mediaBlock.type === "video") {
      modifyMedia({
        videoBlockId: mediaBlock.id,
        src: "",
        provider: mediaBlock.data.provider,
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.container}>
        {file && !compressing ? (
          <div className={styles.mediaWrapper}>
            {fileType === "image" ? (
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt=""
                className={styles.mediaItem}
              />
            ) : (
              <video autoPlay muted controls className={styles.mediaItem}>
                <source
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        ) : compressing ? (
          <ProgressDonut progress={compressingProgress} />
        ) : (
          <div
            ref={output}
            onDrop={(e) =>
              dropHandler(
                e,
                setFile,
                setFileName,
                setCompressing,
                setCompressionProgress
              )
            }
            onDragOver={(e) => dragHandler(e, output)}
            onDragLeave={(e) => dragLeaveHandler(e, output)}
            className={styles.dropzone}
          >
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) =>
                onFileChange(
                  e,
                  setFile,
                  setFileName,
                  setCompressing,
                  setCompressionProgress
                )
              }
            />
            <label htmlFor="file" className={styles.uploadLabel}>
              <div className={styles.uploadIconCircle}>
                <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
              </div>
              <div>
                Drop your{" "}
                <strong>
                  {mediaBlock.type === "image" ? "image/GIF" : "video"}
                </strong>{" "}
                here
                <div style={{ color: "var(--grey-secondary)" }}>
                  or click to browse
                </div>
              </div>
            </label>
          </div>
        )}
      </div>

      <div className={styles.footerOverlay}>
        {info && <div>{info}</div>}
        <div onClick={handleRefresh} className={styles.refreshButton}>
          refresh
          <FontAwesomeIcon icon={["fas", "refresh"]} />
        </div>
      </div>
    </div>
  );
}

export function ImageOutput({ imageBlock }) {
  return (
    <div key={imageBlock.id}>
      <img
        src={imageBlock.data.src === "" ? null : imageBlock.data.src}
        alt=""
        style={mediaStyles}
      />
    </div>
  );
}

export function VideoOutput({ videoBlock }) {
  return (
    <div key={videoBlock.id}>
      {videoBlock.data.src && (
        <video autoPlay muted controls style={mediaStyles}>
          <source
            src={videoBlock.data.src === "" ? null : videoBlock.data.src}
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
}
