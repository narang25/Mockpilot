const apiKey = process.env.GEMINI_API_KEY;
const modelsToTest = [
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-2.5-flash',
  'gemini-3.1-flash-lite'
];

async function testModels() {
  for (const model of modelsToTest) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Say hi briefly' }] }]
        })
      });
      const data = await res.json();
      if (!data.error) {
        console.log(`Success with: ${model}`);
        return;
      } else {
        console.log(`Failed with: ${model}`, data.error.message.substring(0, 100));
      }
    } catch(e) {
      console.log(`Error with ${model}:`, e.message);
    }
  }
}
testModels();
