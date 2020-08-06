(function () {	/// wrapping in an anonymous function

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

var cs = new CSInterface();
var fs = require("fs");
console.log(cs);

var scriptName = "Skelotron";
var devName = "BattleAxe";

var devPath = cs.getSystemPath(SystemPath.USER_DATA) + "/" + devName + "/";
var userPath = devPath + scriptName + "/";

///// LOAD IN JSX FILES
function loadJsxFile(scriptName) {
  var f =
    cs.getSystemPath(SystemPath.EXTENSION) + "/jsx/" + scriptName + ".jsx";
  if (cep.fs.readFile(f).err === 0) {
    cs.evalScript('$.evalFile("' + f + '")');
  }
  console.log("loaded:", scriptName);
}
///// promise evalScript
function evalScript(funcName, params) {
  var args = JSON.stringify(params);

  if (typeof args === "undefined" || args === "{}") {
    args = "";
  }
  var command = scriptName + "." + funcName + "(" + args + ")";
  return new Promise(function(resolve, reject) {
    cs.evalScript(command, resolve);
  });
}

evalScript("makeNewComp");
///// insures that a folder exists before saving files
function checkDir(path) {
  var stat = window.cep.fs.stat(path);
  var isDir = stat.err == window.cep.fs.NO_ERROR && stat.data.isDirectory();
  if (!isDir) {
    window.cep.fs.makedir(path);
  }
}
///// reads the prefs file outside of the signed extension
function getPrefs() {
  fs.readFile(userPath + "config/prefs.json", "utf8", function(err, data) {
    /// read the layer data file
    console.log(err);
    if (err == null) {
      console.log(JSON.parse(data));
    }
  });
}

///// Flyout and context menus
var flyoutXML =
  '<Menu>\
              <MenuItem Id="settings" Label="Settings" Enabled="true" Checked="false"/>\
              <MenuItem Id="reload" Label="Reload" Enabled="true" Checked="false"/>\
              <MenuItem Id="custom" Label="Custom" Enabled="true" Checked="true"/>\
              <MenuItem Label="---" />\
              <MenuItem Id="help" Label="Help" Enabled="true" Checked="false"/>\
          </Menu>';

cs.setContextMenu(flyoutXML, function(res) {
  if (res == "settings") {
    cs.requestOpenExtension("com.Skelotron.modal", "");
  }
  if (res == "reload") {
    window.location.reload(true);
  }
  if (res == "help") {
    cs.openURLInDefaultBrowser("http://www.google.com");
  }
});

cs.setPanelFlyoutMenu(flyoutXML);

cs.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", function(evt) {
  if (evt.data.menuId == "settings") {
    cs.requestOpenExtension("com.Skelotron.modal", "");
  }
  if (evt.data.menuId == "reload") {
    window.location.reload(true);
  }
  if (evt.data.menuId == "help") {
    cs.openURLInDefaultBrowser("http://www.google.com");
  }
});

//// BG Color
cs.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setBgColor);

function setBgColor() {
  var appColor = cs.getHostEnvironment().appSkinInfo.panelBackgroundColor.color;
  document.body.style.backgroundColor =
    "rgb(" +
    Math.floor(appColor.red) +
    ", " +
    Math.floor(appColor.green) +
    ", " +
    Math.floor(appColor.blue) +
    ")";
}

/// intitialize ///
loadJsxFile("all"); // loads the jsx file after the panel loads for easy right-click > Reload to update the panel without closing it or the host app
setBgColor(); // gets the interface color
getPrefs(); // reads available prefs json file that is outside of the signed extensions


})();