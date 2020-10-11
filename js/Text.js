// This class is not used in the project yet.
//not linked in html
// declare new text in engine
// link it to the root
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    const div = document.createElement("div");
    let font = document.getElementById("font");
    div.style.position = "absolute";
    div.style.left = xPos; //px
    div.style.top = yPos; //px
    div.style.textAlign = "center";
    div.style.color = "white";
    div.style.font = "bold 30px Impact";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.zIndex = 2000;

    root.appendChild(div);
    root.appendChild(font);
    this.domElement = div;
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
  }
  gameOverText(txt) {
    this.domElement.innerText = txt;
    this.domElement.style.fontFamily = "'Bungee Shade', cursive";
    // this.domElement.style.fontWeight = "bold";
    this.domElement.style.color = "rgb(0, 26, 120)";
    this.domElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    this.domElement.style.border = "2px solid rgba(255, 255, 255, 0.5)";
    this.domElement.style.width = `${GAME_WIDTH + 5}px`;
    this.domElement.style.height = `${GAME_HEIGHT}`;
    this.domElement.style.fontSize = "2.3rem";
    this.domElement.style.textAlign = "center";
    this.domElement.style.lineHeight = "60px";
  }
}
