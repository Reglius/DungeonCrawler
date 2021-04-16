import Rectangle from "./components/rectangle-geometry-component.js"


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
                let r1w = one.width;
                let r1h = one.height;
                let r2x = two.gameObject.x - two.width/2;
                let r2y = two.gameObject.y - two.height/2;
                let r2w = two.width;
                let r2h = two.height;
                
                if (r1x + r1w > r2x &&
                    r1x < r2x + r2w &&
                    r1y + r1h > r2y &&
                    r1y < r2y + r2h) {
                      return true;
                }
                return false;
                
            }
        }
    }
}