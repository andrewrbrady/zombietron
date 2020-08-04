(function () {	/// this is the publicObject for the script

// note from helloWorld
// another note from hello world
// a third and final note from hello world
//
//

const contentDiv = document.getElementById("content")
let currentHTML = contentDiv.innerHTML;
let customHeaderElement = `<h2>My Header</h2>`
let newHTML = currentHTML.toString() + customHeaderElement + "<p>Haha again</p>"
contentDiv.innerHTML = newHTML 


var cs = new CSInterface();
var fs = require("fs");

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
  var appColor = cs.getHostEnvironment().appSkinInfo.panelBackgroundColor
    .color;
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