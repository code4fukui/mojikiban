export const hira2kata = s => {
  return s.replace(/[ぁ-ん]/g, s => {
    return String.fromCodePoint(s.codePointAt(0) + 0x60);
  });
};

export const kata2hira = s => {
  return s.replace(/[ア-ン]/g, s => {
    return String.fromCharCode(s.charCodeAt(0) - 0x60);
  });
};
