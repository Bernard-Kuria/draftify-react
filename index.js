// Exporting styling
import "./dist/draftify-react.css";
import "./src/components/module-styling/MediaEditor.module.css";
import "./src/components/module-styling/Options.module.css";

// Exporting components
import DraftifyReact from "./src/DraftifyReact";
import DraftifyBlocksReader from "./src/components/DraftifyBlocksReader";

// Exporting functionalities
import { useDraftifyReact } from "./src/hooks/useDraftifyReact";
import {
  dropHandler,
  dragLeaveHandler,
  dragHandler,
  onFileChange,
} from "./src/hooks/mediaHooks/mediaInteractions";

// default export
export default DraftifyReact;

// named exports
export {
  DraftifyReact,
  DraftifyBlocksReader,
  useDraftifyReact,
  dropHandler,
  dragLeaveHandler,
  dragHandler,
  onFileChange,
};
