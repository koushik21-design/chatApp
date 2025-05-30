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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat", // or correct model slug from OpenRouter
        messages: [{ role: "user", content: input }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
    responseDiv.innerHTML = marked.parse(markdownText);

  } catch (error) {
    responseDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}
