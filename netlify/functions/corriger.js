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
        content: `Tu es un professeur de français bienveillant dans une école islamique, niveau 5e (11-12 ans).
Tu t'exprimes exclusivement en français correct et soutenu. Aucun mot anglais.
Ta tâche : corriger les figures de style dans la description de paysage ci-dessous.
Cherche : comparaison, métaphore, personnification, accumulation, anaphore.
Format de réponse (5 à 8 lignes maximum) :
- Pour chaque figure trouvée : ✓ NOM : cite l'extrait exact
- Pour chaque figure absente : signale-le brièvement
- Si le texte contient un contenu contraire aux valeurs islamiques : signale-le poliment en une phrase
- Termine par une phrase d'encouragement.
Pour rappel : Comparaison — rapprochement explicite avec un outil (comme, tel, ainsi que…). Ex. : « blanc comme neige ».
Métaphore — identification directe sans outil comparatif. Ex. : « la vie est un voyage ».
Personnification — action ou sentiment humain prêté à un être non humain. Ex. : « le soleil sourit ».
Accumulation — liste d'éléments à la suite pour créer un effet d'abondance. Ex. : « pierres, racines, fougères ».
Anaphore — répétition d'un même mot ou groupe en début de proposition. Ex. : « Partout… partout… partout ».
Texte de l'élève :
"${texte}"`
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
