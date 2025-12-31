import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
  onFileChange,
} from "../../hooks/mediaHooks/mediaInteractions";

import { mediaType } from "../../utils/conversions";

function ProgressDonut({ progress = null }) {
  const angle = progress !== null ? (progress / 100) * 360 : 0;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="grid justify-center items-center w-32 h-32 rounded-full"
        style={{
          background: `conic-gradient(rgb(59, 130, 246) ${angle}deg, transparent 0)`,
        }}
      >
        <div className="w-30 h-30 bg-white rounded-full text-center text-(--draftify-theme-color) grid items-center ">
          <div>
            <div className="italic text-[13px]">progress</div>
            <div className="text-xl font-bold">
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
    setInfo("To remove image or media component, refresh first.");
    if (mediaBlock.data.src !== "") {
      setFile(mediaBlock.data.src);
      setFileType(mediaBlock.type);
    }
  }, [mediaBlock.data.src, mediaBlock.type]);

  useEffect(() => {
    if (mediaBlock.type === "image") {
      modifyMedia({
        imageBlockId: mediaBlock.id,
        src: file,
        alt: mediaBlock.data.alt,
        caption: mediaBlock.data.caption,
      });
    } else if (mediaBlock.type === "video") {
      modifyMedia({
        videoBlockId: mediaBlock.id,
        src: file,
        provider: mediaBlock.data.provider,
      });
    }

    if (fileName) {
      setFileType(mediaType(fileName));
    }
  }, [file]);

  const handleRefresh = () => {
    setFile("");
    setFileName("");
  };

  return (
    <div className="border w-full h-68.75">
      {file && !compressing ? (
        fileType === "image" ? (
          <div className="relative w-full h-68.75 text-(--draftify-theme-color) font-medium border-blue-200 pb-6.25">
            <img src={file} alt="" className="flex-1 media" />
            <div className="absolute bottom-0.5 flex gap-2 items-center w-full h-6.25 text-[12px]">
              {info && (
                <div className="text-(--draftify-theme-color)">{info}</div>
              )}
              <div
                onClick={handleRefresh}
                className="flex gap-2 border rounded-[5px] items-center px-1  bg-(--draftify-theme-color) text-white cursor-pointer"
              >
                refresh
                <FontAwesomeIcon icon={["fas", "refresh"]} />
              </div>
            </div>
          </div>
        ) : fileType === "video" || fileType === "media" ? (
          <div className="relative w-full h-68.75 text-blue-600 font-medium border-blue-200 pb-6.25">
            <video autoPlay muted controls className="flex-1 media">
              <source src={file} type="video/mp4" />
            </video>
            <div className="absolute bottom-0.5 flex gap-2 items-center w-full h-6.25 text-[12px]">
              {info && (
                <div className="text-(--draftify-theme-color)">{info}</div>
              )}
              <div
                onClick={handleRefresh}
                className="flex gap-2 border rounded-[5px] items-center px-1  bg-(--draftify-theme-color) text-white cursor-pointer"
              >
                refresh
                <FontAwesomeIcon icon={["fas", "refresh"]} />
              </div>
            </div>
          </div>
        ) : (
          fileType === "unknown" && (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-gray-500 text-center">
              <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
              <p className="text-sm font-medium">wrong format: {fileName}</p>
              <p className="text-sm font-medium">
                accepted formats: png, jpg, jpeg, gif, mp4, webm,ogg
              </p>
              <FontAwesomeIcon
                icon={["fas", "refresh"]}
                onClick={() => {
                  setFile("");
                  setFileName("");
                }}
              />
            </div>
          )
        )
      ) : compressing ? (
        <ProgressDonut progress={compressingProgress} />
      ) : (
        // File upload section
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
          onMouseLeave={(e) => dragLeaveHandler(e, output)}
          className="border-2 border-dashed w-full h-full grid items-center"
        >
          <input
            type="file"
            id="file"
            className="hidden"
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
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center text-center gap-5 px-4 py-2 rounded-[10px] cursor-pointer"
          >
            <div className="border rounded-[50%] flex justify-center items-center w-15 h-15 text-[20px] cursor-pointer">
              <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
            </div>
            <div className="normal-title">
              Drop your{" "}
              {mediaBlock.type === "image" ? (
                <strong>image/GIF</strong>
              ) : (
                <strong>video</strong>
              )}{" "}
              here
              <div className="normal-text text-(--grey-secondary)">
                or click to browse
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

export function ImageOutput({ imageBlock }) {
  return (
    <div key={imageBlock.id}>
      <img src={imageBlock.data.src} alt="" className="media rounded-[10px]" />
    </div>
  );
}

export function VideoOutput({ videoBlock }) {
  return (
    <div key={videoBlock.id}>
      {videoBlock.data.src && (
        <video autoPlay muted controls className="rounded-[10px] media">
          <source src={videoBlock.data.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
