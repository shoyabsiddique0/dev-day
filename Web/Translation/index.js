const translate = new google.cloud.translate.v2.TranslationServiceClient();

// Replace with your Google Cloud API key
const apiKey = "YOUR_API_KEY";

// Helper function to populate language options
function populateLanguageOptions(selectElement, languages) {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.text = lang.name;
    selectElement.add(option);
  });
}

// Supported languages (you can fetch this from the API or hardcode it)
const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  // Add more languages here
];

// Populate language options
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
    const request = {
      parent: `projects/YOUR_PROJECT_ID/locations/global`,
      contents: [sourceText],
      mimeType: "text/plain",
      sourceLanguageCode:
        sourceLanguage === "auto" ? undefined : sourceLanguage,
      targetLanguageCode: targetLanguage,
    };

    const [response] = await translate.translateText(request);
    const translatedText = response.translations[0].translatedText;

    document.getElementById("translatedText").value = translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    alert("Error translating text. Please try again.");
  }
}
