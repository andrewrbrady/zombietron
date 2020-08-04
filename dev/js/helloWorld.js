// note from helloWorld
// another note from hello world
// a third and final note from hello world

const contentDiv = document.getElementById("content");
let currentHTML = contentDiv.innerHTML;
let customHeaderElement = `<h2>My Header</h2>`;
let newHTML =
  currentHTML.toString() + customHeaderElement + "<p>Haha again</p>";
contentDiv.innerHTML = newHTML;
