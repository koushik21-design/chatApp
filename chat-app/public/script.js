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
    "HTTP-Referer": "https://www.wordpress.com", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "wordPress", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1-distill-qwen-7b",
    "messages": [
      {
        "role": "user",
        "content": "input"
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
