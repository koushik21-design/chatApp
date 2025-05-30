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
    "HTTP-Referer": "https://www.webstylepress.com", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "WebStylePress", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-prover-v2:free",
    "messages": [
      {
        "role": "user",
        "content": "input"
      }
    ]
  })
});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
    responseDiv.innerHTML = marked.parse(markdownText);

  } catch (error) {
    responseDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}
