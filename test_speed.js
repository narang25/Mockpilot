const apiKey = process.env.GEMINI_API_KEY;
const models = ['gemini-flash-latest', 'gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-2.5-flash', 'gemini-3.1-flash-lite'];

async function test() {
  for (const m of models) {
    const start = Date.now();
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Respond with exactly one word: Hello' }] }] })
      });
      const data = await res.json();
      if (data.error) {
        console.log(`${m}: Error ${data.error.message.substring(0, 50)}`);
      } else {
        console.log(`${m}: Success in ${Date.now() - start}ms`);
      }
    } catch(e) {
      console.log(`${m}: Fetch error ${e.message}`);
    }
  }
}
test();
