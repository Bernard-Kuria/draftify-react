import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DocMetadataPrompt({
  docTitle,
  setDocTitle,
  description,
  setDescription,
  author,
  setAuthor,
  promptAction,
  handlePromptAction,
  setPromptVisiblility,
}) {
  return (
    <div className="doc-metadata-prompt">
      <div className="flex">
        <div className=" flex-1 mb-2.5">
          Would you like to add metadata before downloading?
        </div>
        <div>
          <FontAwesomeIcon
            icon={["fas", "xmark"]}
            className="cursor-pointer"
            onClick={() => setPromptVisiblility(false)}
          />
        </div>
      </div>
      <div className="font-semibold">
        <div>
          <div> document title: (optional)</div>
          <input
            type="text"
            className="w-full border rounded-md p-1"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
          />
        </div>
        <div>
          <div>description: (optional)</div>
          <textarea
            name="description"
            className="w-full border rounded-md p-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <div>author: (optional)</div>
          <input
            type="text"
            className="w-full border rounded-md p-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 cursor-pointer"
          onClick={() => handlePromptAction(promptAction, "ignore")}
        >
          Ignore
        </button>
        <button
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          onClick={() => handlePromptAction(promptAction, "add")}
        >
          Add
        </button>
      </div>
    </div>
  );
}
