import GameObject from "./game-object.js"
import SceneManager from "./scene-manager.js"

export default class Scene {

    children = [];
   
    static deserializeObject(objectDefinition) {
        let gameObject;
        let gameObjectDefinition;
        if (objectDefinition.prefabName) //It's a prefab
            gameObjectDefinition = SceneManager.allPrefabs.find(i => i.name == objectDefinition.prefabName);
        else //It's a one-off game object 
            gameObjectDefinition = objectDefinition.gameObject;

        if (!gameObjectDefinition) throw "Could not find a prefab or game object description (deserializeObject) in " + JSON.stringify(objectDefinition, null, 2)
        gameObject = GameObject.deserialize(gameObjectDefinition); //Deserialize the object
        gameObject.x = objectDefinition.x || 0; //Set the x or default to 0. This is already the default, so this is redundant but very clear
        gameObject.y = objectDefinition.y || 0; //Set the y or default to 0
        return gameObject
    }
    
    static deserialize(sceneDefinition) {

        let toReturn = new Scene(); //Create a new Scene
        toReturn.name = sceneDefinition.name; //Set the scene's name (for reference later when we are changing scenes)
        for (let objectDefinition of sceneDefinition.children) { //Loop over all the children.
            let gameObject;
            let gameObjectDefinition;
            if (objectDefinition.prefabName) //It's a prefab
                gameObjectDefinition = SceneManager.allPrefabs.find(i => i.name == objectDefinition.prefabName);
            else //It's a one-off game object 
                gameObjectDefinition = objectDefinition.gameObject;
            
            if (!gameObjectDefinition) throw "Could not find a prefab or game object description (deserializeObject) in " + JSON.stringify(objectDefinition, null, 2)
            gameObject = GameObject.deserialize(gameObjectDefinition); //Deserialize the object
            gameObject.x = objectDefinition.x || 0; //Set the x or default to 0. This is already the default, so this is redundant but very clear
            gameObject.y = objectDefinition.y || 0; //Set the y or default to 0
            toReturn.addChild(gameObject);
        }
        
        //adding custom map layout here
        if (sceneDefinition.mapLayout){
            let diagram = sceneDefinition.mapLayout;
            
            let colors = new Map();
            colors.set(1,"black");
            colors.set("r", "red");
            colors.set("b", "blue");
            colors.set("y", "yellow");
            colors.set("g", "green");

            // console.log(JSON.stringify(diagram, null, 2));

            //in the scenes the first child will be a ground game object
            //since the game object hasnt been created yet we are going to have to parse arrays
            var sizeX = sceneDefinition.children[0].gameObject.components[1].args[0];
            var sizeY = sceneDefinition.children[0].gameObject.components[1].args[1];
            var offsetX = sceneDefinition.children[0].x;
            var offsetY = sceneDefinition.children[0].y;
            var name = sceneDefinition.children[0].gameObject.name;

            var width = (sizeX / diagram[0].length);
            var height = (sizeY / diagram.length);

            // console.log(name + "\nsize x: " + sizeX +
            //             "\nsize y: " + sizeY +
            //             "\noffset x: " + offsetX +
            //             "\noffset y: " + offsetY +
            //             "\nwidth: " + width +
            //             "\nheight: " + height);
            
            let boundry = 0;      

            for (var i = 0; i < diagram.length; i++){
                for (var j = 0; j < diagram[0].length; j++){

                    if (diagram[i][j] !== 0){
                        boundry++;
                        
                        let color = colors.get(diagram[i][j])
                        //console.log(color);

                        let gameObjectDef = this.deserializeObject({
                            gameObject: {
                              name: "boundry" + boundry,
                              components: [
                                { name: "DrawGeometryComponent", args: [color] },
                                { name: "RectangleGeometryComponent", args: [width, height] },
                              ]
                            },x: 0, 
                              y: 0
                          });
                        
                        //console.log(Math.floor(diagram.length / 2));
                        
                        if (Math.floor(diagram.length / 2) !== (diagram.length / 2)){
                            gameObjectDef.x = (offsetX) - ((Math.floor(diagram.length / 2) - j) * width);
                            gameObjectDef.y = (offsetY) - ((Math.floor(diagram[i].length / 2) - i) * height);
                        } else {
                            gameObjectDef.x = (offsetX) - ((diagram.length / 2 - j) * width) + (width * .5);
                            gameObjectDef.y = (offsetY) - (((diagram[i].length / 2) - i) * height) + (height * .5);
                        }
                        
                        toReturn.addChild(gameObjectDef);

                    }
                }
            }

        } else {console.log("No diagrams for the current scene! This is OK!");}

        return toReturn;

    }

    /**
     * Return a reference to the children in this scene
     * @return {Array} the array of child GameObjects
     */
    getChildren() {
        return this.children;
    }

    /**
     * 
     * @param {GameObject} child the GameObject child to add to the scene
     */
    addChild(child) {
        this.children.push(child)
        //child.callMethod("start", []);
    }

    /**
     * 
     * @param {2D Rendering Context from a Canvas} ctx the 2D context to which we draw
     */
    draw(ctx) {
        //Loop through all the game objects and render them.
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            child.draw(ctx);
        }
        // ctx.fillStyle = "grey";
        // ctx.beginPath();
        // ctx.arc(200, 200, 100, 0, 2 * Math.PI);
        // ctx.rect(400, 0, -400, 400);
        // ctx.fill();

        if (this.name === "BlueScene") {
            ctx.fillStyle = "grey";
            ctx.beginPath();
            ctx.arc(this.getGameObject("Hero").x, this.getGameObject("Hero").y, 100, 0, 2 * Math.PI);
            let ground = this.getGameObject("Ground");
            ctx.rect(ground.x - (ground.components[1].width / 2), ground.y - (ground.components[1].height / 2), ground.components[1].width, ground.components[1].height);
            ctx.fill("evenodd");
        }
    }

    /**
     * Update all the Gamebjects
     */
    update() {
        //Use an extended for loop to call update on all gameObjects
        for (let child of this.children) {
            child.update();
        }
    }

    /**
     * Remove any game objects marked to be destroyed
     */
    cullDestroyed() {
        let newChildren = [];
        for (let child of this.children) {
            if (!child.markedDestroy)
                newChildren.push(child);
        }
        this.children = newChildren;
    }

    /**
     * Get a game object by name
     */
    getGameObject(name) {
        for (let child of this.children) {
            if (child.name == name) return child;
            let foundChild = child.getGameObject(name);
            if (foundChild) return foundChild;
        }
        //console.error("Couldn't find game component " + name)
    }

    /**
     * Create a new game object based on the prefab name
     */
    instantiate(objectDescription) {
        let newObject = Scene.deserializeObject(objectDescription);
        this.addChild(newObject)

    }

    /**
    * Call method on all children and their children
     */
    callMethod(name, args) {
        for (let child of this.children) {
            child.callMethod(name, args);
        }
    }
}