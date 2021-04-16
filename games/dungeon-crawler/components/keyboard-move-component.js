import * as Engine from "/engine/engine.js"
import Collider from "../../../engine/collider.js"
import Rectangle from "../../../engine/components/rectangle-geometry-component.js"

export default  class KeyboardMoveComponent extends Engine.Component {
  constructor(gameObject, speed = 1) {
    super(gameObject);
    this.speed = speed;

  }
  update() {
    //todo add collision logic here
    let rectangles = Engine.SceneManager.currentScene.children
                      .filter(element => {return element.name.startsWith("boundry");})
                      .map(element => {return element.components.find(e => {return e instanceof Rectangle});});
    let heroRectangle = this.gameObject.components.find(e => {return e instanceof Rectangle});

    if (Engine.Input.getKey("ArrowLeft") || Engine.Input.getKey('a')) {
      this.gameObject.x -= 1 * this.speed;
      let inCollision = false;
      for (let boundry of rectangles){
        if (Collider.collision(boundry, heroRectangle)) {
          inCollision = true;
        }
      }
      if (inCollision)
        this.gameObject.x += 1 * this.speed;

    }
    if (Engine.Input.getKey("ArrowRight") || Engine.Input.getKey('d')){
      this.gameObject.x += 1 * this.speed;
      let inCollision = false;
      for (let boundry of rectangles){
        if (Collider.collision(boundry, heroRectangle)) {
          inCollision = true;
        }
      }
      if (inCollision)
        this.gameObject.x -= 1 * this.speed;
    }
    if (Engine.Input.getKey("ArrowUp") || Engine.Input.getKey('w')) {
      this.gameObject.y -= 1 * this.speed;
      let inCollision = false;
      for (let boundry of rectangles){
        if (Collider.collision(boundry, heroRectangle)) {
          inCollision = true;
        }
      }
      if (inCollision)
        this.gameObject.y += 1 * this.speed;

    }
    if (Engine.Input.getKey("ArrowDown") || Engine.Input.getKey('s')) {
      this.gameObject.y += 1 * this.speed;
      let inCollision = false;
      for (let boundry of rectangles){
        if (Collider.collision(boundry, heroRectangle)) {
          inCollision = true;
        }
      }
      if (inCollision)
        this.gameObject.y -= 1 * this.speed;

    }
  }
}