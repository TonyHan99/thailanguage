function splitText(text: string, maxLength = 200) {
  // 문장부호 기준으로 먼저 분할, 그 후 maxLength 이하로 자르기
  const sentences = text.match(/[^.!?\r\n]+[.!?\r\n]*/g) || [text];
  const result: string[] = [];
  for (let sentence of sentences) {
    sentence = sentence.trim();
    while (sentence.length > maxLength) {
      result.push(sentence.slice(0, maxLength));
      sentence = sentence.slice(maxLength);
    }
    if (sentence) result.push(sentence);
  }
  return result;
}

export const speakThai = async (text: string) => {
  if (!text) return;
  const chunks = splitText(text, 200);

  for (const chunk of chunks) {
    const url = `/api/tts?text=${encodeURIComponent(chunk)}`;
    const audio = new Audio(url);
    await new Promise((resolve) => {
      audio.onended = resolve;
      audio.onerror = resolve;
      audio.play();
    });
  }
}; 