export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { description, apiKey } = req.body;
  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "缺少技能描述" });
  }

  const key = apiKey || process.env.GLM_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "API Key 未配置" });
  }
  const apiUrl = process.env.GLM_API_URL || "https://open.bigmodel.cn/api/paas/v4";
  const model = process.env.GLM_MODEL || "glm-4-flash";

  const systemPrompt = `You are an expert at creating Claude Code skills. Generate a complete SKILL.md file following Anthropic's official format.

The skill should be well-structured with:
1. A clear title (# Title)
2. A brief description
3. Detailed instructions for Claude
4. Example usage scenarios
5. Any relevant constraints or guidelines

Output ONLY the markdown content, no explanations.
After the skill content, on a new line, output a quality score from 0-100 in this exact format:
SCORE: [number]

Score criteria:
- 90-100: Excellent - comprehensive, well-structured, production-ready
- 70-89: Good - solid structure, may need minor improvements
- 50-69: Fair - basic structure, needs more detail
- Below 50: Needs significant improvement`;

  const userPrompt = `Create a Claude Code skill for the following purpose:

${description}

Generate a complete, production-ready SKILL.md file.`;

  try {
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("GLM API error:", err);
      return res.status(500).json({ error: "AI 服务暂时不可用，请稍后重试" });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract score
    const scoreMatch = content.match(/SCORE:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    // Remove score line from skill content
    const skill = content.replace(/\n?SCORE:\s*\d+\s*$/i, "").trim();

    return res.status(200).json({ skill, score });
  } catch (error) {
    console.error("Generate skill error:", error);
    return res.status(500).json({ error: "生成失败，请稍后重试" });
  }
}
