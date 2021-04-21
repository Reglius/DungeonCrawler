import * as Engine from "/engine/engine.js"
import Collider from "../../../engine/collider.js"
import Rectangle from "../../../engine/components/rectangle-geometry-component.js"
import DrawGeometryComponent from "../../../engine/components/draw-geometry-component.js";
import Keys from "../../../engine/key-component.js";

export default  class KeyboardMoveComponent extends Engine.Component {
  constructor(gameObject, speed = 1) {
    super(gameObject);
    this.speed = speed;

  }
  update() {
    //todo add collision logic here
    let rectangles = Engine.SceneManager.currentScene.children
                      .filter(element => {return element.name.startsWith("boundry") || element.name.startsWith("k");});

    let heroRectangle = this.gameObject.components.find(e => {return e instanceof Rectangle});

    if (Engine.Input.getKey("ArrowLeft") || Engine.Input.getKey('a')) {
      this.gameObject.x -= 1 * this.speed;
      let inCollision = false;
      for (let r of rectangles){
        let boundry = r.components.find(e => {return e instanceof Rectangle});
        if (Collider.collision(boundry, heroRectangle)) {
          if (r.name === "k1") {
            Keys.key1 = true;
          }
          if (r.name === "k2") {
            Keys.key2 = true;
          }
          if (Keys.key1 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "yellow"){

          } 
          else if (Keys.key2 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "red") {
            Keys.key2 = true;
          } 
          else {
            inCollision = true;
          }
        }
      }
      if (inCollision)
        this.gameObject.x += 1 * this.speed;

    }
    if (Engine.Input.getKey("ArrowRight") || Engine.Input.getKey('d')){
      this.gameObject.x += 1 * this.speed;
      let inCollision = false;
      for (let r of rectangles){
        let boundry = r.components.find(e => {return e instanceof Rectangle})
        if (Collider.collision(boundry, heroRectangle)) {
          if (r.name === "k1") {
            Keys.key1 = true;
          }
          if (r.name === "k2") {
            Keys.key2 = true;
          }
          if (Keys.key1 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "yellow"){

          } 
          else if (Keys.key2 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "red") {
            Keys.key2 = true;
          } 
          else {
            inCollision = true;
          }
        }
      }
      if (inCollision)
        this.gameObject.x -= 1 * this.speed;
    }
    if (Engine.Input.getKey("ArrowUp") || Engine.Input.getKey('w')) {
      this.gameObject.y -= 1 * this.speed;
      let inCollision = false;
      for (let r of rectangles){
        let boundry = r.components.find(e => {return e instanceof Rectangle})
        if (Collider.collision(boundry, heroRectangle)) {
          if (r.name === "k1") {
            Keys.key1 = true;
          }
          if (r.name === "k2") {
            Keys.key2 = true;
          }
          if (Keys.key1 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "yellow"){

          } 
          else if (Keys.key2 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "red") {
            Keys.key2 = true;
          } 
          else {
            inCollision = true;
          }
        }
      }
      if (inCollision)
        this.gameObject.y += 1 * this.speed;

    }
    if (Engine.Input.getKey("ArrowDown") || Engine.Input.getKey('s')) {
      this.gameObject.y += 1 * this.speed;
      let inCollision = false;
      for (let r of rectangles){
        let boundry = r.components.find(e => {return e instanceof Rectangle})
        if (Collider.collision(boundry, heroRectangle)) {
          if (r.name === "k1") {
            Keys.key1 = true;
          }
          if (r.name === "k2") {
            Keys.key2 = true;
          }
          if (Keys.key1 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "yellow"){

          } 
          else if (Keys.key2 && r.components.find(e => {return e instanceof DrawGeometryComponent}).color === "red") {
            Keys.key2 = true;
          } 
          else {
            inCollision = true;
          }
        }
      }
      if (inCollision)
        this.gameObject.y -= 1 * this.speed;

    }
  }
}