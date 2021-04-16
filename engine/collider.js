import Rectangle from "./components/rectangle-geometry-component.js"
import GameObject from "./game-object.js";


export default class Collider {

    static collision(one, two) {

        // if (one.geometry instanceof Circle) {
        //   if (two.geometry instanceof Vector2) {
        //     return this.collision(two, one);
        //   }
        //   else if (two.geometry instanceof Line) {
        //     return this.collision(two, one);
        //   }
        //   else if (two.geometry instanceof Circle) {
        //     console.error("Can't do that");
        //   }
        //   else if (two.geometry instanceof Rectangle) {
        //     console.error("Can't do that");
        //   }
        //   else if (two.geometry instanceof Polygon) {
        //     console.error("Can't do that");
        //   }
        // }
        if (one instanceof Rectangle) {
            // if (two.geometry instanceof Circle) {
            //     return this.collision(two, one);
            // }
            // else 
            if (two instanceof Rectangle) {
                
                let r1x = one.gameObject.x - one.width/2;
                let r1y = one.gameObject.y - one.height/2;
                let r1w = one.width// + one.width/2;
                let r1h = one.height// + one.height/2;
                let r2x = two.gameObject.x - two.width/2;
                let r2y = two.gameObject.y - two.height/2;
                let r2w = two.width// + two.width/2;
                let r2h = two.height// + two.height/2;

                
                if (r1x + r1w > r2x &&    // r1 right edge past r2 left
                    r1x < r2x + r2w &&    // r1 left edge past r2 right
                    r1y + r1h > r2y &&    // r1 top edge past r2 bottom
                    r1y < r2y + r2h) {    // r1 bottom edge past r2 top
                      return true;
                }
                return false;
                
            }
        }
    }
}