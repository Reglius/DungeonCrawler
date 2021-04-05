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
            
            // console.log(JSON.stringify(diagram, null, 2));

            //in the scenes the first child will be a ground game object, this will make it easy to get the 
            //size of the playing field for each scene since they can be different
            var sizeX = sceneDefinition.children[0].gameObject.components[1].args[0];
            var sizeY = sceneDefinition.children[0].gameObject.components[1].args[1];
            var offsetX = sceneDefinition.children[0].x;
            var offsetY = sceneDefinition.children[0].y;
            var name = sceneDefinition.children[0].gameObject.name;

            var width = (sizeX / diagram[0].length);
            var height = (sizeY / diagram.length);

            console.log(name + "\nsize x: " + sizeX +
                        "\nsize y: " + sizeY +
                        "\noffset x: " + offsetX +
                        "\noffset y: " + offsetY +
                        "\nwidth: " + width +
                        "\nheight: " + height);
            
            
            let boundry = 0;      

            for (var i = 0; i < diagram.length; i++){
                for (var j = 0; j < diagram[0].length; j++){

                    if (diagram[i][j] !== 0){
                        boundry++;

                        let gameObjectDef = this.deserializeObject({
                            gameObject: {
                              name: "boundry" + boundry,
                              components: [
                                { name: "DrawGeometryComponent", args: ["blue"] },
                                { name: "RectangleGeometryComponent", args: [width, height] },
                              ]
                            },x: 0, 
                              y: 0
                          });
                        
                        console.log(Math.floor(diagram.length / 2));
                        
                        if (Math.floor(diagram.length / 2) !== (diagram.length / 2)){
                            gameObjectDef.x = (offsetX) - ((Math.floor(diagram.length / 2) - j) * width);
                            gameObjectDef.y = (offsetY) - ((Math.floor(diagram[j].length / 2) - i) * height);
                        } else {
                            gameObjectDef.x = (offsetX) - ((diagram.length / 2 - j) * width) + (width * .5);
                            gameObjectDef.y = (offsetY) - (((diagram.length / 2) - i) * height) + (height * .5);
                        }
                        console.log(gameObjectDef.name + ": x: " + gameObjectDef.x + " y:" + gameObjectDef.y);

                        // let gameObject = GameObject.deserialize(gameObjectDef);
                        // gameObject: {
                        //     name: "Ground",
                        //     components: [
                        //       { name: "DrawGeometryComponent", args: ["white"] },
                        //       { name: "RectangleGeometryComponent", args: [640, 480] },
                        //     ]
                        //   }
                        
                        toReturn.addChild(gameObjectDef);

                    }
                }
            }

            // for (let objectDefinition of sceneDefinition.children) { //Loop over all the children.
            //     let gameObject;
            //     let gameObjectDefinition;
            //     if (objectDefinition.prefabName) //It's a prefab
            //         gameObjectDefinition = SceneManager.allPrefabs.find(i => i.name == objectDefinition.prefabName);
            //     else //It's a one-off game object 
            //         gameObjectDefinition = objectDefinition.gameObject;
                
            //     if (!gameObjectDefinition) throw "Could not find a prefab or game object description (deserializeObject) in " + JSON.stringify(objectDefinition, null, 2)
            //     gameObject = GameObject.deserialize(gameObjectDefinition); //Deserialize the object
            //     gameObject.x = objectDefinition.x || 0; //Set the x or default to 0. This is already the default, so this is redundant but very clear
            //     gameObject.y = objectDefinition.y || 0; //Set the y or default to 0
            //     toReturn.addChild(gameObject);
            // }
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