import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, currentLevel } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("[AI-KOREA STORY API] GEMINI_API_KEY is missing");
      return NextResponse.json({ error: 'Vercel에 API Key가 설정되지 않았습니다. Settings > Environment Variables를 확인해주세요.' }, { status: 500 });
    }

    const systemInstruction = `
        You are a helpful Korean language teacher. 
        Your absolute priority is providing text with PERFECT Korean spacing (표준 띄어쓰기).
        
        spacing rules to enforce:
        1. Always put a space between words (e.g., '밥을 먹어요' NOT '밥을먹어요').
        2. Always put a space after a sentence-ending punctuation (., ?, !).
        3. Never return a long string of Korean text without any spaces.
        4. Failure to provide correct spacing makes the content useless for learners.
        
        Correct Example: "저는 학교에 갑니다. 친구를 만나요."
        Incorrect Example: "저는학교에갑니다.친구를만나요."
    `;

    const prompt = `
        Create a fun and modern Korean short story for a ${currentLevel} learner about: "${topic}".
        The Korean story text must be within 300 characters including spaces.
        
        Return ONLY valid JSON with this structure:
    {
      "title": "...",
        "korean": "...",
          "theme": { "primary": "...", "secondary": "...", "accent": "...", "background": "...", "text": "...", "icon": "..." },
      "translations": { "en": "...", "th": "...", "jp": "...", "de": "...", "cn": "..." },
      "vocab": [{ "word": "...", "match": "...", "meanings": { "en": "...", "th": "...", "jp": "...", "de": "...", "cn": "..." } }],
        "grammar": [{ "pattern": "...", "explanations": { "en": "...", "th": "...", "jp": "...", "de": "...", "cn": "..." }, "examples": [{ "ko": "...", "en": "...", "th": "...", "jp": "...", "de": "...", "cn": "..." }] }]
    }
    `;

    console.log(`[AI - KOREA STORY API] Generating story for topic: "${topic}", level: "${currentLevel}"`);

    // Upgrading to Gemini 2.0 Flash for superior performance and speed
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2, // Very low temperature for maximum rule adherence
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[AI-KOREA STORY API] Gemini Error:", JSON.stringify(data));
      return NextResponse.json({
        error: `Gemini API 에러: ${data.error?.message || response.statusText}`,
        code: data.error?.status
      }, { status: 500 });
    }

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("[AI-KOREA STORY API] Empty response from Gemini:", JSON.stringify(data));
      return NextResponse.json({
        error: "인공지능이 응답을 생성하지 못했습니다. (Empty Response)",
      }, { status: 500 });
    }

    let generatedText = data.candidates[0].content.parts[0].text.trim();

    // Robust JSON extraction and Post-processing
    try {
      // Remove markdown highlights if present
      const cleanJson = generatedText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
      const jsonStartIndex = cleanJson.indexOf('{');
      const jsonEndIndex = cleanJson.lastIndexOf('}');

      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error("Invalid JSON");
      }

      const finalJson = cleanJson.substring(jsonStartIndex, jsonEndIndex + 1);
      const parsedData = JSON.parse(finalJson);

      // Post-processing: Ensure spacing after punctuation even if AI forgets
      const ensureSpacing = (text: string) => {
        if (!text) return text;
        return text
          .replace(/([.?!])([^\s"\]}])/g, '$1 $2') // Add space after .?! if missing
          .replace(/([.?!])\s*([.?!])/g, '$1$2'); // Don't add space between repeated punctuation
      };

      if (parsedData.korean) parsedData.korean = ensureSpacing(parsedData.korean);
      if (parsedData.title) parsedData.title = ensureSpacing(parsedData.title);
      if (parsedData.grammar) {
        parsedData.grammar = parsedData.grammar.map((g: any) => ({
          ...g,
          examples: g.examples?.map((ex: any) => ({
            ...ex,
            ko: ensureSpacing(ex.ko)
          }))
        }));
      }

      return NextResponse.json(parsedData);
    } catch (parseError: any) {
      console.error("JSON Parse Error:", parseError, "Original Text:", generatedText);
      return NextResponse.json({
        error: "Failed to parse AI response. Please try again.",
        raw: generatedText.substring(0, 100) + "..."
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Generation failed:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
