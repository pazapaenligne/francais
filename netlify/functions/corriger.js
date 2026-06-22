exports.handler = async (event) => {
  const { texte } = JSON.parse(event.body);
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Tu es un professeur de français dans une école islamique au collège. Corrige ce texte d'élève en vérifiant l'utilisation des figures de style (comparaison, métaphore, personnification, accumulation, anaphore). Sois encourageant et précis.\n\nRègles absolues :\n- Pas d'émojis\n- Pas de références à la musique, au chant, au cinéma, aux jeux de hasard, à la mixité, aux images animées, aux idoles ou à tout ce qui est contraire aux valeurs islamiques\n- Langue sobre et respectueuse\n- Si le texte de l'élève contient des éléments problématiques (alcool, musique, mixité, etc.), signale-le poliment sans développer\n\nTexte de l'élève :\n${texte}`
      }]
    })
  });
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ correction: data.content[0].text })
  };
};
