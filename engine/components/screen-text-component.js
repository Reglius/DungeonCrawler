import * as Engine from "/engine/engine.js"
export default  class ScreenTextComponent extends Engine.Component{
    constructor(gameObject, string, options){
        super(gameObject);

        this.string = string;
        
        this.color = options?.color || "red";
        this.font = options?.font || "32pt arial";
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.string, this.gameObject.x, this.gameObject.y);
        
    }
}