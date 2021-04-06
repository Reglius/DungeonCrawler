export default {
  name: "MainScene",
  children: [
    {
      gameObject: {
        name: "Ground",
        components: [
          { name: "DrawGeometryComponent", args: ["white"] },
          { name: "RectangleGeometryComponent", args: [640, 480] },
        ]
      }, x: 320, y:340
    },
    {
      prefabName: "MainController"
    },
    { prefabName: "Hero", x: 320, y: 340 },
    { gameObject: { name: "ScreenTextShadow", components: [{ name: "ScreenTextComponent", args: ["DungeonCrawler", { color: "gray" }] }] }, x: 102, y: 42 },
    { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["DungeonCrawler", { color: "white" }] }] }, x: 100, y: 40 },
  ],
  // mapLayout: [
  //   [1, 0, 0],
  //   [0, 1, 0],
  //   [0, 0, 1],
  //  ]
  // mapLayout: [
  //   [1, 0, 0, 0],
  //   [0, 1, 0, 0],
  //   [0, 0, 1, 0],
  //   [0, 0, 0, 1]
  // ]
  mapLayout: [
    [ 1 , 0 , 0 , 0 , 0 ],
    [ 0 ,"r", 0 , 0 , 0 ],
    [ 0 , 0 ,"b", 0 , 0 ],
    [ 0 , 0 , 0 ,"y", 0 ],
    [ 0 , 0 , 0 , 0 ,"g"]
  ]

  // mapLayout: [
  //   [ 0 , 0 , 1 , 0 , 1 , 0 ],
  //   [ 0 , 0 , 1 , 0 , 1 , 0 ],
  //   [ 0 , 0 , 1 , 0 , 1 , 0 ],
  //   [ 0 , 0 , 1 , 0 , 1 , 0 ],
  //   [ 0 , 0 , 1 , 0 , 1 , 0 ]
  // ]
}