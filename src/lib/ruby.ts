// Convert 漢字《ふりがな》 notation to HTML ruby tags
export function parseRuby(text: string): string {
  return text.replace(
    /([一-鿿々〆〇ヶヵ]+)《([^《》]+)》/g,
    (_, kanji, reading) => `<ruby>${kanji}<rt>${reading}</rt></ruby>`
  );
}
