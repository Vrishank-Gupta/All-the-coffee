export interface Token {
  text: string;
  cls: string;
}

interface LangSpec {
  regex: RegExp;
  classes: string[];
}

// Unchanged from before: matches the JS/HTML samples shown in Modules A and B.
const JS_SPEC: LangSpec = {
  regex: /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(<\/?[a-zA-Z][\w-]*)|(>)|(\b(?:function|const|let|var|return|if|else|onclick)\b)|(#[a-fA-F0-9]{3,8}\b)|(\b\d+(?:\.\d+)?\b)/g,
  classes: [
    "text-espresso-400/70 italic", // // comment
    "text-caramel-300", // "string"
    "text-teal-300", // tag open
    "text-teal-300", // tag close '>'
    "text-cinnamon-500 font-semibold", // keyword
    "text-sage-300", // hex color
    "text-sage-300", // number
  ],
};

// A separate spec for Python samples (Module C), kept independent from JS_SPEC
// so Python keywords like "class" or "for" never collide with the same bare
// words appearing in HTML attributes or prose inside the JS/HTML samples.
const PY_SPEC: LangSpec = {
  regex: /(#[^\n]*)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\b(?:def|class|import|from|as|for|in|return|if|elif|else|with|raise|not|and|or|try|except|pass|while|True|False|None)\b)|(\b\d+(?:\.\d+)?\b)/g,
  classes: [
    "text-espresso-400/70 italic", // # comment
    "text-caramel-300", // "double-quoted" string
    "text-caramel-300", // 'single-quoted' string
    "text-cinnamon-500 font-semibold", // keyword
    "text-sage-300", // number
  ],
};

function tokenize(line: string, spec: LangSpec): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  spec.regex.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = spec.regex.exec(line))) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), cls: "" });
    }
    const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
    tokens.push({ text: match[0], cls: spec.classes[groupIndex] ?? "" });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), cls: "" });
  }
  return tokens;
}

export function tokenizeLine(line: string, lang: "js" | "python" = "js"): Token[] {
  return tokenize(line, lang === "python" ? PY_SPEC : JS_SPEC);
}
