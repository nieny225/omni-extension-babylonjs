//@ts-ignore
import {OmniSDKClient, OmniSDKClientEvents} from 'omni-sdk';
const sdk = new OmniSDKClient("omni-extension-babylon").init();
import './reset.css'
import './style.css'
//@ts-ignore
import * as BABYLON from 'babylonjs'
import { Engine, Scene, SceneLoader, Vector3, ShadowGenerator, DirectionalLight, Color3 } from 'babylonjs';
import * as loaders from 'babylonjs-loaders';
import * as materials from 'babylonjs-materials';



console.log(Engine)


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element

const engine = new Engine(canvas, true); // Generate the BABYLON 3D engine


const createScene = (sceneDescription: {
  roofTexture: string,
  wallTexture: string
}) => {
  const scene = new BABYLON.Scene(engine);

  /**** Set camera and light *****/
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  /**** Materials *****/
  //color
  let groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)

  //texture
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(sceneDescription.roofTexture ||  "https://assets.babylonjs.com/environments/roof.jpg");
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture(sceneDescription.wallTexture || "https://www.babylonjs-playground.com/textures/floor.png")
  let ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
  ground.material = groundMat;
  sdk.events.on(OmniSDKClientEvents.CUSTOM_EVENT,  (event) =>
  {

    console.error(JSON.stringify(event))
    if (event ==="change_roof_texture" && event.evenArgs.fid)
    {
      roofMat.diffuseTexture = new BABYLON.Texture('/fid/'+event.evenArgs.fid)
    }
  })
  
  /**** World Objects *****/
  const box = BABYLON.MeshBuilder.CreateBox("box", {});
  box.material = boxMat;
  box.position.y = 0.5;
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;


  return scene;
}


console.error(JSON.stringify(sdk.args, null, 2))

const scene = createScene(
  {
    roofTexture: sdk.args.roofTexture,
    wallTexture: sdk.args.wallTexture
  }
); //Call the createScene function


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});