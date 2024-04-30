document.addEventListener("DOMContentLoaded", function () {
  const translateBtn = document.getElementById("translateBtn");

  translateBtn.addEventListener("click", async function () {
    const inputText = document.getElementById("inputText").value;
    const targetLanguage = document.getElementById("targetLanguage").value;

    const response = await translateText(inputText, targetLanguage);
    displayTranslatedText(response);
  });

  async function translateText(text, language) {
    const response = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, language: language }),
    });
    return await response.json();
  }

  function displayTranslatedText(response) {
    const translatedTextDiv = document.getElementById("translatedText");
    translatedTextDiv.textContent = response.translatedText;
  }
});
