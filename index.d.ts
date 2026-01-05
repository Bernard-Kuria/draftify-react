import type { JSX } from "react";

import * as React from "react";

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
  | "code"
  | "custom-1"
  | "custom-2"
  | "custom-3";

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

export interface ModifyCustomPayload {
  customBlockId: string;
  payload: any;
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
  modifyCustom: (p: ModifyCustomPayload) => void;

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
   Components
───────────────────────────── */

export interface DraftifyReactProps {
  blocksData: DraftifyBlock[];

  modifyBlocks: React.Dispatch<React.SetStateAction<DraftifyBlock[]>>;

  options: string[];
  CustomEditor1?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;

  CustomEditor2?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;

  CustomEditor3?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;

  CustomOutput1?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;

  CustomOutput2?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;

  CustomOutput3?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;

  defaultCustomData1?: Object;
  defaultCustomData2?: Object;
  defaultCustomData3?: Object;

  localStorageEnable?: boolean;

  backgroundEnable?: boolean;

  DraftifyBackground?: string;
}

declare function DraftifyReact(props: DraftifyReactProps): JSX.Element;

export interface ReaderProps {
  blocksData: DraftifyBlock[];
  CustomOutput1?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;
  CustomOutput2?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;
  CustomOutput3?: ({
    customBlock,
    modifyCustom,
  }: {
    customBlock: any;
    modifyCustom: any;
  }) => HTMLElement | JSX.Element;
}

declare function DraftifyBlocksReader(props: ReaderProps): JSX.Element;

/* ─────────────────────────────
   Hooks
───────────────────────────── */

export interface UseDraftifyReactProps {
  blocksData: DraftifyBlock[];
  modifyBlocks: React.Dispatch<React.SetStateAction<DraftifyBlock[]>>;
  defaultCustomData1: any;
  defaultCustomData2: any;
  defaultCustomData3: any;
}

export declare function useDraftifyReact(props: UseDraftifyReactProps): {
  /* view */
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;

  /* background grid */
  gridDots: any[];
  setGridDots: React.Dispatch<React.SetStateAction<any[]>>;

  /* document metadata */
  docTitle: string;
  setDocTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;

  /* prompt */
  promptAction: string;
  setPromptAction: React.Dispatch<React.SetStateAction<string>>;
  promptVisibility: boolean;
  setPromptVisiblility: React.Dispatch<React.SetStateAction<boolean>>;
  handlePromptAction: (action: string, option?: string) => void;

  /* blocks */
  blocksData: DraftifyBlock[];
  handleClick: (type: string, cells?: number) => void;

  /* block modifiers */
  modifyHeading: (args: any) => void;
  modifySubheading: (args: any) => void;
  modifyParagraph: (args: any) => void;
  modifyQuote: (args: any) => void;
  modifyList: (args: any) => void;
  modifyTable: (args: any) => void;
  modifyImage: (args: any) => void;
  modifyVideo: (args: any) => void;
  modifyLink: (args: any) => void;
  modifyCode: (args: any) => void;
  modifyCustom: (args: any) => void;

  /* delete */
  handleDelete: (id: string) => void;

  /* drag & drop */
  onDropHandler: (e: React.DragEvent, index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;

  /* animations */
  containerVariants: Record<string, any>;
  itemVariants: Record<string, any>;
  transitions: Record<string, any>;
  whileHover: Record<string, any>;

  /* utils */
  handleCopy: (content: any) => void;
};

/* ─────────────────────────────
   Media utilities
───────────────────────────── */

declare function dropHandler(
  e: React.DragEvent,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  setFileName: React.Dispatch<React.SetStateAction<string>>,
  setCompressing: React.Dispatch<React.SetStateAction<boolean>>,
  setCompressionProgress: React.Dispatch<React.SetStateAction<number>>
): Promise<void>;

declare function onFileChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  setFileName: React.Dispatch<React.SetStateAction<string>>,
  setCompressing: React.Dispatch<React.SetStateAction<boolean>>,
  setCompressionProgress: React.Dispatch<React.SetStateAction<number>>
): Promise<void>;

declare function dragHandler(
  e: React.DragEvent,
  output: React.RefObject<HTMLElement | null>
): void;

declare function dragLeaveHandler(
  e: React.DragEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  output: React.RefObject<HTMLElement | null>
): void;

/* ─────────────────────────────
   Exports
───────────────────────────── */

export default DraftifyReact;

export {
  DraftifyReact,
  DraftifyBlocksReader,
  dropHandler,
  onFileChange,
  dragHandler,
  dragLeaveHandler,
};
