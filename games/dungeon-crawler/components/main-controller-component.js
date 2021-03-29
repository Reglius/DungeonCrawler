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
    this.heroX = this.hero.x;
    this.heroY = this.hero.y;
    if(this.heroX < 33){
      //Move left
      if(SceneManager.currentScene.name == "MainScene") return SceneManager.changeScene("RedScene")
      if(SceneManager.currentScene.name == "BlueScene") return SceneManager.changeScene("MainScene")
      this.hero.x = 33;
    }
    if(this.heroX > 600){
      //Move right
      if(SceneManager.currentScene.name == "RedScene") return SceneManager.changeScene("MainScene")
      if(SceneManager.currentScene.name == "MainScene") return SceneManager.changeScene("BlueScene")
      
      this.hero.x = 600
    }
    if(this.heroY < 100){
      //Move up
      this.hero.y = 100;
    }
    if(this.heroY > 550){
      //Move Down
      this.hero.y = 550
    }
  }
  
  

}