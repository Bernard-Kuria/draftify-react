import { HeadingOutput } from "./blockComponents/Heading";
import { SubheadingOutput } from "./blockComponents/Subheading";
import { ParagraphOutput } from "./blockComponents/Paragraph";
import { QuoteOutput } from "./blockComponents/Quote";
import { ListOutput } from "./blockComponents/List";
import { TableOutput } from "./blockComponents/Table";
import { ImageOutput } from "./blockComponents/Media";
import { VideoOutput } from "./blockComponents/Media";
import { LinkOutput } from "./blockComponents/Link";
import { CodeOutput } from "./blockComponents/Code";

export default function Reader({ blocksData }) {
  return (
    blocksData.length !== 0 &&
    blocksData.map((block) => {
      switch (block.type) {
        case "heading":
          return <HeadingOutput key={block.id} headingBlock={block} />;
        case "subheading":
          return <SubheadingOutput key={block.id} subheadingBlock={block} />;
        case "paragraph":
          return <ParagraphOutput key={block.id} paragraphBlock={block} />;
        case "quote":
          return <QuoteOutput key={block.id} quoteBlock={block} />;
        case "list":
          return <ListOutput key={block.id} listBlock={block} />;
        case "table":
          return <TableOutput key={block.id} tableBlock={block} />;
        case "image":
          return <ImageOutput key={block.id} imageBlock={block} />;
        case "video":
          return <VideoOutput key={block.id} videoBlock={block} />;
        case "link":
          return <LinkOutput key={block.id} linkBlock={block} />;
        case "code":
          return <CodeOutput key={block.id} codeBlock={block} />;
        default:
          return null;
      }
    })
  );
}
