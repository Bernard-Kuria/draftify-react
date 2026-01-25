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

export default function DraftifyBlocksReader({
  fontFamily,
  blocksData,
  CustomOutput1,
  CustomOutput2,
  CustomOutput3,
}) {
  return (
    blocksData.length !== 0 &&
    blocksData.map((block) => {
      switch (block.type) {
        case "heading":
          return (
            <HeadingOutput
              key={block.id}
              headingBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "subheading":
          return (
            <SubheadingOutput
              key={block.id}
              subheadingBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "paragraph":
          return (
            <ParagraphOutput
              key={block.id}
              paragraphBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "quote":
          return (
            <QuoteOutput
              key={block.id}
              quoteBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "list":
          return (
            <ListOutput
              key={block.id}
              listBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "table":
          return (
            <TableOutput
              key={block.id}
              tableBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "image":
          return <ImageOutput key={block.id} imageBlock={block} />;
        case "video":
          return <VideoOutput key={block.id} videoBlock={block} />;
        case "link":
          return (
            <LinkOutput
              key={block.id}
              linkBlock={block}
              fontFamily={fontFamily}
            />
          );
        case "code":
          return <CodeOutput key={block.id} codeBlock={block} />;
        case "custom-1":
          return CustomOutput1 ? (
            <CustomOutput1 key={block.id} customBlock={block} />
          ) : null;
        case "custom-2":
          return CustomOutput2 ? (
            <CustomOutput2 key={block.id} customBlock={block} />
          ) : null;
        case "custom-3":
          return CustomOutput3 ? (
            <CustomOutput3 key={block.id} customBlock={block} />
          ) : null;
        default:
          return null;
      }
    })
  );
}
