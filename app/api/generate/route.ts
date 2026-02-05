import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, currentLevel } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("[ChatStudy API] GEMINI_API_KEY is missing");
      return NextResponse.json({ error: 'Vercel에 API Key가 설정되지 않았습니다. Settings > Environment Variables를 확인해주세요.' }, { status: 500 });
    }

    const prompt = `
        Create a fun and modern Korean short story for a ${currentLevel} learner about: "${topic}".
        
        Return ONLY valid JSON with this structure:
        {
          "title": "Korean Title",
          "korean": "Korean story text (5-8 sentences)",
          "theme": {
            "primary": "Hex Color (e.g. #F59E0B)",
            "secondary": "Hex Color (light version)",
            "accent": "Hex Color (dark version)",
            "background": "Hex Color (very light)",
            "text": "Hex Color (dark contrast)",
            "icon": "String (One of: Cat, Snowflake, Ghost, Bot, BookOpen, Utensils, Zap, Moon, Sun, Monitor)"
          },
          "translations": {
            "en": "English full translation",
            "th": "Thai full translation",
            "jp": "Japanese full translation",
            "de": "German full translation",
            "cn": "Chinese full translation"
          },
          "vocab": [
            { "word": "Korean Word", "match": "Conjugated form in text if needed", "meanings": { "en": "...", "th": "...", "jp": "...", "de": "...", "cn": "..." } }
          ],
          "grammar": [
            { "pattern": "Grammar Pattern", "explanations": { "en": "...", "th": "...", "jp": "...", "de": "...", "cn": "..." }, "examples": [{ "ko": "Example sentence", "en": "Eng trans" }] }
          ]
        }
      `;

    console.log(`[ChatStudy API] Generating story for topic: "${topic}", level: "${currentLevel}"`);

    // Using v1 instead of v1beta for better stability with standard models
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.8,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[ChatStudy API] Gemini Error:", JSON.stringify(data));
      return NextResponse.json({
        error: `Gemini API 에러: ${data.error?.message || response.statusText}`,
        code: data.error?.status
      }, { status: 500 });
    }

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("[ChatStudy API] Empty response from Gemini:", JSON.stringify(data));
      return NextResponse.json({
        error: "인공지능이 응답을 생성하지 못했습니다. (Empty Response)",
        reason: data.candidates?.[0]?.finishReason || "Unknown"
      }, { status: 500 });
    }

    let generatedText = data.candidates[0].content.parts[0].text.trim();

    // Robust JSON extraction
    try {
      // Remove markdown highlights if present
      const cleanJson = generatedText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
      const jsonStartIndex = cleanJson.indexOf('{');
      const jsonEndIndex = cleanJson.lastIndexOf('}');

      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error("Invalid JSON structure returned");
      }

      const finalJson = cleanJson.substring(jsonStartIndex, jsonEndIndex + 1);
      return NextResponse.json(JSON.parse(finalJson));
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
