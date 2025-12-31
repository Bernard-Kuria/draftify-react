import type { JSX } from "react";

import type { DraftifyBlock } from "draftify";

/* ─────────────────────────────
   Core domain types
───────────────────────────── */

export type ViewMode = "editor" | "preview";

export type BlockType =
  | "heading"
  | "subheading"
  | "paragraph"
  | "quote"
  | "list"
  | "table"
  | "image"
  | "video"
  | "link"
  | "code";

export interface BaseBlock {
  id: string;
  type: BlockType;
  data?: any;
  content?: any;
}

export type { DraftifyBlock };

/* ─────────────────────────────
   Hook argument
───────────────────────────── */

export type InitialBlocks = BaseBlock[];

/* ─────────────────────────────
   Block modifier payloads
───────────────────────────── */

export interface ModifyHeadingPayload {
  headingBlockId: string;
  newContent: string;
  level?: number;
}

export interface ModifySubheadingPayload {
  subheadingBlockId: string;
  newContent: string;
}

export interface ModifyParagraphPayload {
  paragraphBlockId: string;
  newContent: string;
}

export interface ModifyQuotePayload {
  quoteBlockId: string;
  newContent: string;
  author?: string;
}

export interface ModifyListPayload {
  listBlockId: string;
  listStyle: string;
  items: string[];
}

export interface ModifyTablePayload {
  tableBlockId: string;
  tableContent: any[][];
}

export interface ModifyImagePayload {
  imageBlockId: string;
  src: string;
  alt?: string;
  caption?: string;
}

export interface ModifyVideoPayload {
  videoBlockId: string;
  src: string;
  provider?: string;
}

export interface ModifyLinkPayload {
  linkBlockId: string;
  linkText: string;
  url: string;
}

export interface ModifyCodePayload {
  codeBlockId: string;
  language: string;
  code: string;
}

/* ─────────────────────────────
   Hook return type
───────────────────────────── */

export interface UseDraftifyReactReturn {
  /* view state */
  view: ViewMode;
  setView: (view: ViewMode) => void;

  /* background */
  gridDots: any[];
  setGridDots: (dots: any[]) => void;

  /* document metadata */
  docTitle: string;
  setDocTitle: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  author: string;
  setAuthor: (v: string) => void;

  /* prompt */
  promptVisibility: boolean;
  setPromptVisiblility: (v: boolean) => void;

  promptAction: string;
  setPromptAction: (v: string) => void;
  handlePromptAction: (action: string, option?: string) => void;

  /* blocks */
  blocksData: BaseBlock[];

  handleClick: (type: BlockType, cells?: number) => void;
  handleDelete: (id: string) => void;

  /* modifiers */
  modifyHeading: (p: ModifyHeadingPayload) => void;
  modifySubheading: (p: ModifySubheadingPayload) => void;
  modifyParagraph: (p: ModifyParagraphPayload) => void;
  modifyQuote: (p: ModifyQuotePayload) => void;
  modifyList: (p: ModifyListPayload) => void;
  modifyTable: (p: ModifyTablePayload) => void;
  modifyImage: (p: ModifyImagePayload) => void;
  modifyVideo: (p: ModifyVideoPayload) => void;
  modifyLink: (p: ModifyLinkPayload) => void;
  modifyCode: (p: ModifyCodePayload) => void;

  /* clipboard / export */
  handleCopy: () => void;

  /* drag & drop */
  onDropHandler: (e: DragEvent, index: number) => void;
  onDragStart: (e: DragEvent, index: number) => void;
  onDragEnd: (e: DragEvent) => void;
  onDragEnter: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;

  /* animation configs */
  containerVariants: object;
  itemVariants: object;
  transitions: object;
  whileHover: object;
}

/* ─────────────────────────────
   Hook export
───────────────────────────── */

export function useDraftifyReact(
  initialBlocks?: InitialBlocks
): UseDraftifyReactReturn;

/* ─────────────────────────────
   Component export
───────────────────────────── */
interface DraftifyReactProps {
  blocksData: DraftifyBlock[];
  modifyBlocks: React.Dispatch<React.SetStateAction<DraftifyBlock[]>>;
}

declare function DraftifyReact(props: DraftifyReactProps): JSX.Element;

interface ReaderProps {
  blocksData: DraftifyBlock[];
}

declare function Reader(props: ReaderProps): JSX.Element;

export default DraftifyReact;

export { DraftifyReact, Reader };
