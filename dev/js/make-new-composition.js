const newCompWidthInputField = document.getElementById("comp-width-input");
const newCompHeightInputField = document.getElementById("comp-height-input");
const newCompFrameRateInputField = document.getElementById(
  "comp-framerate-input"
);
const newCompPixelAspectRatio = document.getElementById("comp-par-input");
const newCompDurationInputField = document.getElementById(
  "comp-duration-input"
);
const newCompNameInputField = document.getElementById("comp-name-input");
const makeNewCompositionButton = document.getElementById(
  "make-new-comp-button"
);
const hdDimensionsButton = document.getElementById("hd-dimensions-button");
const commonDimensionsDiv = document.getElementById("dimensions");
const commonFrameratesDiv = document.getElementById("framerates");

function commonFrameRates() {
  console.log("hello");
  console.log(commonDimensionsDiv);
  console.log(newCompFrameRateInputField);
  const currentFrameRateValue = newCompFrameRateInputField.value;
  switch (parseFloat(currentFrameRateValue)) {
    case 23.98:
      newCompFrameRateInputField.value = 29.97;
      break;
    case 29.97:
      newCompFrameRateInputField.value = 59.94;
      break;
    case 59.94:
      newCompFrameRateInputField.value = 23.98;
      break;
    default:
      newCompFrameRateInputField.value = 29.97;
  }
}

commonFrameRates();

const commonDimensions = {
  hd: {
    name: "hd",
    dimensions: [1920, 1080]
  },
  "2kdci": {
    name: "2kdci",
    dimensions: [2048, 1080]
  },
  uhd: {
    name: "uhd",
    dimensions: [3840, 2160]
  },
  "4kdci": {
    name: "4kdci",
    dimensions: [4096, 2160]
  },
  igSquare: {
    name: "igSquare",
    dimensions: [1080, 1080]
  },
  igLandscape: {
    name: "igLandscape",
    dimensions: [1080, 566]
  },
  igPortrait: {
    name: "portrait",
    dimensions: [1080, 1350]
  }
};
function createDimensionButtons(commonDimensions) {
  commonDimensionKeys = Object.keys(commonDimensions);
  commonDimensionKeys.forEach(dimension => {
    let currentDimension = commonDimensions[dimension]["dimensions"];
    let newDiv = document.createElement("div");
    newDiv.classList.add("func-button");
    newDiv.innerHTML = `${currentDimension[0]} x ${currentDimension[1]}`;
    newDiv.addEventListener("click", event => {
      setDimensions(currentDimension);
    });
    commonDimensionsDiv.appendChild(newDiv);
  });
}
createDimensionButtons(commonDimensions);

function createFrameRateButtons() {
  let newDiv = document.createElement("div");
  newDiv.classList.add("func-button");
  newDiv.innerHTML = "Cycle Frame Rates";
  commonFrameratesDiv.appendChild(newDiv);
  newDiv.addEventListener("click", event => {
    console.log("licked!");
    commonFrameRates();
  });
}

createFrameRateButtons();

function setDimensions(array) {
  newCompWidthInputField.value = array[0];
  newCompHeightInputField.value = array[1];
}

function makeNewComposition() {
  console.log(newCompFrameRateInputField.value);
  evalScript("makeNewComp", {
    name: newCompNameInputField.value,
    width: newCompWidthInputField.value,
    height: newCompHeightInputField.value,
    par: newCompPixelAspectRatio.value,
    duration: newCompDurationInputField.value,
    framerate: newCompFrameRateInputField.value
  });
}
makeNewCompositionButton.addEventListener("click", event => {
  makeNewComposition();
});
