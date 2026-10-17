export interface Token {
  text: string;
  cls: string;
}

const TOKEN_REGEX =
  /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(<\/?[a-zA-Z][\w-]*)|(>)|(\b(?:function|const|let|var|return|if|else|onclick)\b)|(#[a-fA-F0-9]{3,8}\b)|(\b\d+(?:\.\d+)?\b)/g;

const CLASS_FOR_GROUP = [
  "text-espresso-400/70 italic", // comment
  "text-caramel-300", // string
  "text-teal-300", // tag open
  "text-teal-300", // tag close '>'
  "text-cinnamon-500 font-semibold", // keyword
  "text-sage-300", // hex color
  "text-sage-300", // number
];

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  TOKEN_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(line))) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), cls: "" });
    }
    const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
    tokens.push({ text: match[0], cls: CLASS_FOR_GROUP[groupIndex] ?? "" });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), cls: "" });
  }
  return tokens;
}
