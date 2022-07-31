import {
    Scene,
    Engine as BabylonEngine,
    ArcRotateCamera,
    Vector3,
    Mesh,
    HemisphericLight,
    SceneLoader,
    DracoCompression,
    Angle,
    MeshBuilder,
} from 'babylonjs';
import {
    AdvancedDynamicTexture,
    Button
} from 'babylonjs-gui';
import 'babylonjs-loaders';
import { Camera } from 'babylonjs/Cameras/camera';
import { TransformNode } from 'babylonjs/Meshes/transformNode';
import { Photo } from '../../../models/Photo';
import { Gps } from '../../../utils/Gps';
import { Coordinate } from '../../../models/Coordinate';

class Engine {
    private static instance?: Engine = undefined;
    private canvas?: HTMLCanvasElement = undefined;
    private babylonEngine?: BabylonEngine = undefined;
    private camera?: Camera = undefined;
    private scene?: Scene = undefined;
    private model?: string = undefined;
    private dracoCompression = new DracoCompression();
    private currentRoot?: TransformNode = undefined;
    constructor() {
        this.init();
    }

    public static initialize() {
        if (Engine.instance !== undefined) {
            return;
        }

        Engine.instance = new Engine();
    }

    public static loadMap(root:string, model: string) {
        return new Promise<void>(resolve => {
            if (Engine.instance === undefined || 
                model === Engine.instance?.model || 
                model === undefined ||
                model === "") {
                resolve();
            }

            if (Engine.instance !== undefined) {
                Engine.instance.model = model;
            }
            
            SceneLoader.ImportMesh("", root, model, Engine.instance?.scene, (meshes) => {
                Engine.instance?.clearMap();
                Engine.instance?.onMapLoaded();
                resolve();
            });
        });
    }

    public static loadPhotos(photos: Photo[]) {
        return new Promise<void>(resolve => {
            photos.forEach(p => {
                Engine?.instance?.addPhotoButton(p);
            });
            resolve();
        });
    }

    private clearMap() {
        if (Boolean(this.currentRoot)) {
            this.currentRoot?.dispose();
        }
    }

    private addPhotoButton(photo: Photo) {
        const position = Gps.gpsToMeters(new Coordinate({latitude: photo.latitude, longitude: photo.longitude}))
        const plane = MeshBuilder.CreatePlane("plane", {size: 2}, Engine.instance?.scene);
        plane.billboardMode = Mesh.BILLBOARDMODE_ALL;
        plane.position.set(position.x, position.y, position.z);

        var advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane);

        var button1 = Button.CreateImageOnlyButton("but1", "textures/pin_colored.png");
        button1.onPointerUpObservable.add(function() {
            alert("you did it!");
        });
        advancedTexture.addControl(button1);
    }

    private onMapLoaded() {
        this.currentRoot = Engine.instance?.scene?.getNodeByName("__root__") as TransformNode;
        if (Boolean(this.currentRoot)) {
            this.currentRoot.rotationQuaternion = null;
            this.currentRoot.rotation = new Vector3(Angle.FromDegrees(270).radians(), 0, 0);
            const scene = Engine.instance?.scene!;
            // const box = MeshBuilder.CreateBox("box", {size: 10}, scene);
            // const pos = Gps.gpsToMeters({latitude: 42.35459, longitude: -88.24313});
            // box.position.x = pos.x;
            // box.position.z = pos.z;
            //root.rotate(Vector3.Up(), 180);
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

        //this.scene.debugLayer.show();

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

export function loadMap(root: string, map: string) {
    return Engine.loadMap(root, map);
}

export function loadPhotos(photos: Photo[]) {
    return Engine.loadPhotos(photos);
}