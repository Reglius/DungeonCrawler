import Component from "../component.js"
export default class DrawGeometryComponent extends Component {
  constructor(gameObject, color) {
    super(gameObject);
    this.color = color;
  }
  draw(ctx) {
    let rectangleGeometry = this.gameObject.getComponent("RectangleGeometryComponent")
    if (rectangleGeometry) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.gameObject.x - rectangleGeometry.width/2, this.gameObject.y - rectangleGeometry.height/2, rectangleGeometry.width, rectangleGeometry.height);
    }

  }
}