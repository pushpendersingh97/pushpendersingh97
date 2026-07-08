import mammoth from "mammoth";

const IMAGE_PLACEHOLDER =
  '<p><em>[Embedded image removed — open the original DOCX to view images]</em></p>';

export async function parseDocxToHtml(arrayBuffer: ArrayBuffer): Promise<string> {
  const result = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      convertImage: mammoth.images.imgElement(async () => ({
        src: "#",
        alt: "embedded image",
      })),
    },
  );

  const html = result.value.replace(/<img[^>]*>/gi, IMAGE_PLACEHOLDER);

  if (result.messages.length > 0) {
    console.info("[docx]", result.messages);
  }

  return html;
}
