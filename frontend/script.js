document.addEventListener("DOMContentLoaded", function () {
  const translateBtn = document.getElementById("translateBtn");
  const historyContainer = document.querySelector(".history-container");
  let translationHistory = {};

  translateBtn.addEventListener("click", async function () {
    const inputText = document.getElementById("inputText").value;
    const targetLanguage = document.getElementById("targetLanguage").value;

    const response = await translateText(inputText, targetLanguage);
    displayTranslatedText(response);
    addToHistory(inputText, response.translatedText);

    // Show the history container after the user provides input
    historyContainer.style.display = "block";
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

  function addToHistory(inputText, translatedText) {
    if (!translationHistory[inputText]) {
      translationHistory[inputText] = translatedText;
      renderHistory();
    }
  }

  function renderHistory() {
    historyContainer.innerHTML = "";

    // Adding a title to the history container
    const title = document.createElement("div");
    title.classList.add("history-title");
    title.textContent = "History";
    historyContainer.appendChild(title);

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    const inputHeader = document.createElement("th");
    inputHeader.textContent = "Input Text";
    const outputHeader = document.createElement("th");
    outputHeader.textContent = "Translated Text";
    headerRow.appendChild(inputHeader);
    headerRow.appendChild(outputHeader);
    table.appendChild(headerRow);

    for (const inputText in translationHistory) {
      const row = document.createElement("tr");
      const inputCell = document.createElement("td");
      inputCell.textContent = inputText;
      const outputCell = document.createElement("td");
      outputCell.textContent = translationHistory[inputText];
      row.appendChild(inputCell);
      row.appendChild(outputCell);
      table.appendChild(row);
    }

    historyContainer.appendChild(table);
  }
});
