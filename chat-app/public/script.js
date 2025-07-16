async function sendMessage() {
  const input = document.getElementById('userInput').value.trim();
  const responseDiv = document.getElementById('response');

  if (!input) {
    responseDiv.innerHTML = '<p class="text-danger">Please enter a message.</p>';
    return;
  }

  responseDiv.innerHTML = '<p class="text-muted">Thinking...</p>';

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "HTTP-Referer": "https://www.chatBotAi.com", // Optional
        "X-Title": "chatBotAi", // Optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemma-3-12b-it:free",
        "messages": [
          {
            "role": "user",
            "content": input
          }
        ]
      })
    });

    const data = await response.json();
    const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
    responseDiv.innerHTML = marked.parse(markdownText);

  } catch (error) {
    responseDiv.innerHTML = '<p class="text-danger">Error: ' + error.message + '</p>';
  }
}
