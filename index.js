import "./dist/draftify-react.css";

import DraftifyReact from "./src/DraftifyReact";
import Reader from "./src/components/Reader";
import { useDraftifyReact } from "./src/hooks/useDraftifyReact";

// default export
export default DraftifyReact;

// named exports
export { DraftifyReact, Reader, useDraftifyReact };
