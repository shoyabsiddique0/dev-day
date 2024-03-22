const apiKey = "6afd2424fa8b5bcd670b";

function populateLanguageOptions(selectElement, languages) {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.text = lang.name;
    selectElement.add(option);
  });
}

const supportedLanguages = [
  { code: "English", name: "English" },
  { code: "French", name: "French" },
  { code: "Spanish", name: "Spanish" },
];

const sourceLanguageSelect = document.getElementById("sourceLanguage");
const targetLanguageSelect = document.getElementById("targetLanguage");
populateLanguageOptions(sourceLanguageSelect, supportedLanguages);
populateLanguageOptions(targetLanguageSelect, supportedLanguages);

async function translateText() {
  const sourceText = document.getElementById("sourceText").value;
  const sourceLanguage = document.getElementById("sourceLanguage").value;
  const targetLanguage = document.getElementById("targetLanguage").value;

  if (!sourceText) {
    alert("Please enter some text to translate.");
    return;
  }

  try {
    console.log(
      "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(sourceText) +
        "&langpair=" +
        sourceLanguage +
        "|" +
        targetLanguage
    );
    const response = await fetch(
      "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(sourceText) +
        "&langpair=" +
        sourceLanguage +
        "|" +
        targetLanguage
    );

    const data = await response.json();

    if (response.ok) {
      const translatedText = data.responseData.translatedText;
      document.getElementById("translatedText").value = translatedText;
    } else {
      console.error("Error translating text:", data.error.message);
      alert("Error translating text. Please try again.");
    }
  } catch (error) {
    console.error("Error translating text:", error);
    alert("Error translating text. Please try again.");
  }
}
