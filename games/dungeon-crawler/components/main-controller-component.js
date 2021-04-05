import * as Engine from "/engine/engine.js"

const SceneManager = Engine.SceneManager;

export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    this.hero = SceneManager.currentScene.getGameObject("Hero");
    
  }
  update() {

    let ground = SceneManager.currentScene.getGameObject("Ground");
    let width = ground.getComponent("RectangleGeometryComponent").width;
    let height = ground.getComponent("RectangleGeometryComponent").height;
    // console.log("Ground x: " + ground.x + " y: " + ground.y + " width: " + width + " height: " + height);

    this.heroX = this.hero.x;
    this.heroY = this.hero.y;
    if(this.heroX < ground.x - width/2){
      //Move left
      if(SceneManager.currentScene.name == "MainScene") return SceneManager.changeScene("RedScene")
      if(SceneManager.currentScene.name == "BlueScene") return SceneManager.changeScene("MainScene")
      this.hero.x += 10;
    }
    if(this.heroX > ground.x + width/2){
      //Move right
      if(SceneManager.currentScene.name == "RedScene") return SceneManager.changeScene("MainScene")
      if(SceneManager.currentScene.name == "MainScene") return SceneManager.changeScene("BlueScene")
      
      this.hero.x -= 10
    }
    if(this.heroY < ground.y - height/2){
      //Move up
      this.hero.y += 10;
    }
    if(this.heroY > ground.y + height/2){
      //Move Down
      this.hero.y -= 10;
    }
  }
  
  

}