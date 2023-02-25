const searchBtn = document.getElementById("search-btn");

const resultBox = document.getElementById("result-box");

const loadData = async (word) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data[0]);
  } catch (error) {
    console.log(error);
  }
};

const audioSrc = document.getElementById("pronounce-audio");
const displayDetails = (details) => {
  const { word, phonetic, phonetics, meanings } = details;
  // console.log(details);
  // console.log(word, phonetic, phonetics, meanings);
  document.getElementById("search-word").innerText = word;
  const prononceField = document.getElementById("phonetic");

  phonetics.forEach((pronunce) => {
    const pronounceText = document.createElement("span");
    pronounceText.innerHTML = "";
    pronounceText.innerHTML = pronunce.text + ", ";
    prononceField.innerHTML = "";
    prononceField.appendChild(pronounceText);
  });

  const detailsWrapper = document.getElementById("details-wrapper");
  detailsWrapper.innerHTML = "";

  meanings.forEach((fullMening) => {
    const details = document.createElement("div");
    details.innerHTML = `
      <div class="divider mb-5 bg-yellow-100 py-3">
        <h4 class="text-xl text-[#2f034e] font-medium">${
          fullMening.partOfSpeech
        }</h4>
      </div>
      <h3 class="text-yellow-300 text-2xl italic">Meaning</h3>
      <ul id="" class="list-disc pl-6 text-base">
      <li class="text-white">${
        fullMening.definitions[0].definition
          ? fullMening.definitions[0].definition
          : fullMening.definitions[1].definition
      }</li>
      </ul>
      <h4 class="text-xl text-yellow-300 font-medium">Synoyms: <span class="text-white">${
        fullMening.synonyms[0]
      }</span></h4>
    `;

    detailsWrapper.appendChild(details);
  });

  audioSrc.setAttribute(
    "src",
    phonetics[0].audio ? phonetics[0].audio : phonetics[1].audio
  );
};

function play() {
  audioSrc.play();
}

resultBox.style.display = "none";

searchBtn.onclick = () => {
  const searchText = document.getElementById("search-filed").value;
  loadData(searchText);
  resultBox.style.display = "block";
};
