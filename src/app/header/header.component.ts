import { Component, OnInit } from '@angular/core';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {EXRLoader} from 'three/examples/jsm/loaders/EXRLoader.js';
import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture.js';
import * as THREE from 'three';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  clock = new THREE.Clock();
  showStatic3dLogo: boolean = true;

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
   * To create a photorealistic material in three.js see https://www.youtube.com/watch?v=aJun0Q0CG_A
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
   * An alternative for three.js could be [Babylon.js](https://github.com/BabylonJS/Babylon.js).
   *
   * In Blender, to make the camera follow an object and animate along a path
   * see https://youtu.be/LeYUk3Ob5W8
   *
   * @private
   */
  private setup3dLogo() {
    let camera;
    const scene = new THREE.Scene();
    const canvas = document.getElementById("canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      gammaOutput: true
    });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(window.devicePixelRatio);

    const texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;

    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.9);
    // scene.add(ambientLight);

    new EXRLoader() // Use RGBELoader for .hdr files
      .setPath('assets/3d-logo/environments/')
      .load('forest.exr', hdr => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdr;
        // scene.background = hdr; // Show the environment as background as well

        const loader = new GLTFLoader();
        loader
          .setPath('assets/3d-logo/')
          .load('logo.glb', gltf => {
            const model = gltf.scene;
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
                // object.castShadow = true; // See https://stackoverflow.com/q/49869345
                object.material.transparent = true;
              }
            });

            scene.add(model);
            camera = gltf.cameras[0];
            const mixer = new THREE.AnimationMixer(gltf.scene);
            // const mixer = new THREE.AnimationMixer(camera);
            const animation = mixer.clipAction(gltf.animations[0]);
            animation.setLoop(THREE.LoopPingPong);
            animation.timeScale = 1 / 3;
            animation.play();

            this.showStatic3dLogo = false;

            this.animate(renderer, scene, camera, mixer, logo);
          }, () => {}, undefined, error => {
            alert(error);
          });
      });

    // FIXME: The canvas is not resized when the windows is resized
    window.addEventListener('resize', () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera?.updateProjectionMatrix();
    });
  }

  private animate(renderer, scene, camera, mixer, logo) {
    requestAnimationFrame(() => this.animate(renderer, scene, camera, mixer, logo));
    const delta = this.clock.getDelta();
    mixer?.update(delta);
    // logo.material.opacity -= 0.001;
    renderer.render(scene, camera);
    camera.lookAt(0.0, 0.0, 0.6);
    // camera.updateProjectionMatrix()
  }

  /*
    private setup3dLogo() {
    const scene = new THREE.Scene();
    const canvas = document.getElementById("canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      gammaOutput: true
    });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setPixelRatio(window.devicePixelRatio);


    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.9);
    // scene.add(ambientLight);


    new RGBELoader()
      .setPath('assets/')
      .load('royal_esplanade_1k.hdr', texture => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        // scene.background = texture; // Show the environment as background as well

        const loader = new GLTFLoader();
        loader.load('assets/3d-logo.glb', gltf => {
          const model = gltf.scene;
          const material = new THREE.MeshPhysicalMaterial({
            color: 0xfcd05d,
            roughness: 0.2,
            metalness: 0.8
          });
          // model.traverse(object => {
          //   if (object.isMesh) object.material = material;
          // });
          scene.add(model);
          const camera = gltf.cameras[0];
          renderer.render(scene, camera);
        }, () => {}, undefined, error => {
          alert(error);
        });
      });
    }
  */
}
