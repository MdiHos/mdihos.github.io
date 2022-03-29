import { Component, OnInit } from '@angular/core';
import {EXRLoader} from 'three/examples/jsm/loaders/EXRLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'three';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  clock = new THREE.Clock();
  is3DLogoLoading: boolean = true;
  container: Element;
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera;

  constructor() { }

  ngOnInit(): void {
    this.setup3dLogo();
  }

  /**
   * See https://stackoverflow.com/q/65483487/8583692
   * and https://stackoverflow.com/a/56674907/8583692
   * and https://blender.stackexchange.com/a/202526
   * and https://discoverthreejs.com/book/first-steps/textures-intro/
   * and https://youtu.be/qizLBCA_BCI
   * and https://discourse.threejs.org/t/solved-how-to-play-a-gltf-animation-once-when-mouse-is-clicked/4650/3
   * and https://threejs.org/docs/#api/en/animation/AnimationAction
   * and https://stackoverflow.com/q/14567712/8583692
   * and https://discourse.threejs.org/t/how-to-animate-blender-camera-in-three-js/29085
   * and https://blender.stackexchange.com/q/234796
   *
   * Note that the original blender 3D file is available in [mahozad repository](https://github.com/mahozad/mahozad/tree/master/3d-renders/blender).
   *
   * To create a photorealistic material in Three.js see https://www.youtube.com/watch?v=aJun0Q0CG_A
   *
   * To animate the alpha see
   * https://discourse.threejs.org/t/how-to-animate-alpha-in-blender-and-export-gltf-to-three-js/5428
   * and https://stackoverflow.com/q/28023237 and https://stackoverflow.com/q/19405394
   *
   * See https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html
   * and https://docs.minsar.app/create/howtos/gltf-blender-280/
   * and https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/DamagedHelmet
   * for the code of this: https://sketchfab.com/3d-models/battle-damaged-sci-fi-helmet-pbr-b81008d513954189a063ff901f7abfe4
   * (Its files are also available [here](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/DamagedHelmet/glTF)).
   *
   * The HDR environment was downloaded from https://github.com/mrdoob/three.js/tree/master/examples/textures/equirectangular
   * which was used for the example link above (https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html).
   * High-quality HDRs and more are also available in [Poly Haven](https://polyhaven.com/).
   *
   * An alternative for Three.js could be [Babylon.js](https://github.com/BabylonJS/Babylon.js).
   *
   * In Blender, to make the camera follow an object and animate along a path
   * see https://youtu.be/LeYUk3Ob5W8
   *
   * @private
   */
  private setup3dLogo() {
    const canvas = document.getElementById("canvas");
    this.container = document.querySelector("app-header");
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      gammaOutput: true
    });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping; // OR THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 2.5;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true; // Enable shadows globally
    // this.renderer.shadowMap.type = THREE.BasicShadowMap; // Does not support shadow radius (softening)
    // this.renderer.gammaFactor = 0;

    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.9);
    // scene.add(ambientLight);

    // Set the intensity to 0 so the logo appearance is not effected
    // const light = new THREE.DirectionalLight(0xffffff, 0.8);
    // light.castShadow = true;
    // light.shadow.radius = 10; // Soften the shadow
    // light.position.set(1, 4, 5);
    // this.scene.add(light);
    // const planeGeometry = new THREE.PlaneGeometry(20, 20);
    // const planeMaterial = new THREE.ShadowMaterial(); // To see the plane THREE.MeshStandardMaterial()
    // planeMaterial.opacity = 0.15;
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.receiveShadow = true;
    // plane.rotateX(-Math.PI / 2);
    // plane.position.y = 0;
    // this.scene.add(plane);

    new EXRLoader() // Use RGBELoader for .hdr files
      .setPath('assets/3d-logo/environments/')
      // If the lighting of the object is not decent, change
      // toneMapping and toneMappingExposure of the renderer above
      .load('studio.exr', hdr => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.environment = hdr;
        // this.scene.background = hdr; // Show the environment as background as well

        // To uncompress the glTF data if it is compressed.
        // Grab the latest version of draco_wasm_wrapper.js and draco_decoder.wasm from
        // <project-path>\node_modules\three\examples\js\libs\draco\ and place them in the
        // directory specified below in `setDecoderPath()`.
        // See https://github.com/mrdoob/three.js/tree/dev/examples/js/libs/draco#readme
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('assets/3d-logo/draco/');

        new GLTFLoader()
          .setPath('assets/3d-logo/')
          .setDRACOLoader(dracoLoader)
          .load('logo.glb', glTF => {
            const model = glTF.scene;
            // const envMapLoader = new THREE.PMREMGenerator(renderer);
            // const environmentMap = envMapLoader.fromCubemap(hdr);
            // const material = new THREE.MeshPhysicalMaterial/* OR MeshStandardMaterial */({
            //   color: 0xfcd05d,
            //   roughness: 0.2,
            //   metalness: 0.8,
            //   clearcoat: 1.0,
            //   clearcoatRoughness: 0.1,
            //   // normalMap: hdr,
            //   envMap: environmentMap.texture,
            //   normalScale: new THREE.Vector2(0.15, 0.15)
            // });
            // model.traverse(object => {
            //  /* if (object.isMesh) */ object.material = material;
            // });

            let logo;
            model.traverse(object => {
              if (object.isMesh) {
                logo = object;
                object.castShadow = true; // See https://stackoverflow.com/q/49869345
                object.material.transparent = true;
              }
            });

            this.scene.add(model);
            this.camera = glTF.cameras[0];
            this.resize();

            const mixer = new THREE.AnimationMixer(glTF.scene /* OR camera */);
            const animation = mixer.clipAction(glTF.animations[0]);
            // animation.setLoop(THREE.LoopPingPong);
            animation.timeScale = 1 / 3;
            animation.play();

            this.is3DLogoLoading = false;
            this.animate(mixer);
          }, () => {}, undefined, error => {
            alert(error);
          });
      });

    // See https://stackoverflow.com/q/64202917
    window.addEventListener('resize', this.resize.bind(this))
  }

  /**
   * See https://stackoverflow.com/a/20434960
   * and https://discourse.threejs.org/t/why-is-aspect-a-property-of-the-camera-and-size-of-the-renderer/13870
   *
   * @private
   */
  private resize() {
    const rect = this.container.getBoundingClientRect();
    if (this.camera) this.camera.aspect = rect.width / rect.height;
    this.camera?.updateProjectionMatrix();
    this.renderer?.setSize(rect.width, rect.height);
  }

  private animate(mixer) {
    requestAnimationFrame(() => this.animate(mixer));
    const delta = this.clock.getDelta();
    mixer?.update(delta);
    this.renderer.render(this.scene, this.camera);
    // camera.lookAt(0.0, 0.0, 0.6);
    // camera.updateProjectionMatrix()
  }
}
