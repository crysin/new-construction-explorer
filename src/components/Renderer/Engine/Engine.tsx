import {
    Scene,
    Engine as BabylonEngine,
    ArcRotateCamera,
    Vector3,
    Mesh,
    HemisphericLight,
    SceneLoader,
    DracoCompression,
    Angle
} from 'babylonjs';
import 'babylonjs-loaders';
import { Camera } from 'babylonjs/Cameras/camera';
import { TransformNode } from 'babylonjs/Meshes/transformNode';

class Engine {
    private static instance?: Engine = undefined;
    private canvas?: HTMLCanvasElement = undefined;
    private babylonEngine?: BabylonEngine = undefined;
    private camera?: Camera = undefined;
    private scene?: Scene = undefined;
    private model?: string = undefined;
    private dracoCompression = new DracoCompression();

    constructor() {
        this.init();
    }

    public static initialize() {
        if (Engine.instance !== undefined) {
            return;
        }

        Engine.instance = new Engine();
    }

    public static async loadMap(model: string) {
        if (Engine.instance === undefined || 
            model === Engine.instance?.model || 
            model === undefined ||
            model === "") {
            return;
        }

        SceneLoader.ImportMesh("", "models/", model, Engine.instance?.scene, (meshes) => {
            meshes.forEach(m => {
                console.log(m.getPositionExpressedInLocalSpace());
            });
            console.log(meshes);
            const root = Engine.instance?.scene?.getNodeByName("__root__") as TransformNode;
            console.log("ROOT", root);
            if (Boolean(root)) {
                root.rotationQuaternion = null;
                root.rotation = new Vector3(Angle.FromDegrees(180).radians(), 0, 0);
                //root.rotate(Vector3.Up(), 180);
            }
        });

        if (Engine.instance !== undefined) {
            Engine.instance.model = model;
        }
    }

    private init() {
        // Get the canvas DOM element
        this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
        console.log(this.canvas);
        // Load the 3D engine
        this.babylonEngine = new BabylonEngine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        // CreateScene function that creates and return the scene
        // Create a basic BJS Scene object
        this.scene = new Scene(this.babylonEngine);
        this.scene.useRightHandedSystem = true;
        this.scene.debugLayer.show();
        // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
        this.camera = new ArcRotateCamera('main', 0, 0, 10, Vector3.Zero(), this.scene);

        this.camera.attachControl(this.canvas, false);
        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        var light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        // // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
        //var sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, Mesh.FRONTSIDE);
        // // Move the sphere upward 1/2 of its height
        //sphere.position.y = 1;
        // // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
        //var ground = Mesh.CreateGround('ground1', 6, 6, 2, this.scene, false);
        // // Return the created scene

        // run the render loop
        this.babylonEngine.runRenderLoop(() => {
            this.scene?.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this.babylonEngine?.resize();
        });
    }
}

export function initializeEngine() {
    Engine.initialize();
}

export function loadMap(map: string) {
    Engine.loadMap(map);
}