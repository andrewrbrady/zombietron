function makeNewComp(options) {
  var newComp = app.project.items.addComp(
    options.name,
    parseInt(options.width),
    parseInt(options.height),
    parseInt(options.par),
    parseInt(options.duration),
    options.framerate
  );

  for (var i = 1; i < app.project.numItems; i++) {
    if (app.project.item(i).name == "Compositions") {
      newComp.parentFolder = app.project.item(i);
    }
  }
}
