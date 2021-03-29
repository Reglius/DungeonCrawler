export default {
  name: "BlueScene",
  children: [
    {
      gameObject: {
        name: "Ground",
        components: [
          { name: "DrawGeometryComponent", args: ["blue"] },
          { name: "RectangleGeometryComponent", args: [640, 480] },
        ]
      }, x:320, y:340
    },
    {
      prefabName:"MainController"
    },
    { prefabName: "Hero", x: 320, y: 340 },
    
  ]
}