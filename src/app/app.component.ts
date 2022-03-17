import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {formatDate} from '@angular/common';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {FlakesTexture} from 'three/examples/jsm/textures/FlakesTexture.js';
import * as THREE from 'three';

// TODO: These code are mostly duplicate as the one in honor-list component.
//  Create a service and refactor duplicate code to it.

const githubRestURL: string = 'https://api.github.com/repos/mahozad/mahozad.github.io/commits?per_page=1';
const notAvailable: string = 'N/A';
// const options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateLocale = 'en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mahozad-angular';
  isLoadingGHRest = true;
  lastUpdate = '';
  clock = new THREE.Clock();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(githubRestURL)
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(err => { // Then handle the error
            return AppComponent.handleError(err, () => {
              this.isLoadingGHRest = false;
              this.lastUpdate = notAvailable;
            });
          }
        )
      )
      .subscribe((data: any) => {
        this.isLoadingGHRest = false;
        let date = new Date(Date.parse(data[0].commit.committer.date));
        this.lastUpdate = formatDate(date, 'yyyy-MM-dd', dateLocale);
      });

    this.setup3dLogo();
  }

  /**
   * See https://stackoverflow.com/q/65483487/8583692
   * and https://stackoverflow.com/a/56674907/8583692
   * and https://blender.stackexchange.com/a/202526
   * and https://discoverthreejs.com/book/first-steps/textures-intro/
   *
   * See https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html
   * and https://docs.minsar.app/create/howtos/gltf-blender-280/
   * and https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/DamagedHelmet
   * for the code of this: https://sketchfab.com/3d-models/battle-damaged-sci-fi-helmet-pbr-b81008d513954189a063ff901f7abfe4
   *
   * The HDR environment was downloaded from https://github.com/mrdoob/three.js/tree/master/examples/textures/equirectangular
   * which was used for the example link above (https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html).
   * High-quality HDRs and more are also available in [Poly Haven](https://polyhaven.com/).
   *
   * An alternative for three.js could be [Babylon.js](https://github.com/BabylonJS/Babylon.js).
   *
   * In Blender, to make the camera follow an object and animate along a path
   * see https://youtu.be/LeYUk3Ob5W8
   * @private
   */
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
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(window.devicePixelRatio);

    const texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;

    const envMapLoader = new THREE.PMREMGenerator(renderer);

    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.9);
    // scene.add(ambientLight);


    new RGBELoader()
      .setPath('assets/')
      .load('photo_studio_01_1k.hdr', hdr => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdr;
        // scene.background = hdr; // Show the environment as background as well

        const loader = new GLTFLoader();
        loader.load('assets/3d-logo.glb', gltf => {
          const model = gltf.scene;
          // const environmentMap = envMapLoader.fromCubemap(hdr);
          // const material = new THREE.MeshPhysicalMaterial({
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
          scene.add(model);
          const camera = gltf.cameras[0];
          const mixer = new THREE.AnimationMixer(gltf.scene);
          // const mixer = new THREE.AnimationMixer(camera);
          const animation = mixer.clipAction(gltf.animations[0]);
          animation.setLoop(THREE.LoopPingPong);
          animation.timeScale = 1 / 10;
          animation.play();
          this.animate(renderer, scene, camera, mixer);
        }, () => {}, undefined, error => {
          alert(error);
        });
      });
  }

  private animate(renderer, scene, camera, mixer) {
    requestAnimationFrame(() => this.animate(renderer, scene, camera, mixer));
    const delta = this.clock.getDelta();
    mixer?.update(delta);
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

  private static handleError(error: HttpErrorResponse, callback: () => void) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Request returned ${error.status}; body was: `, error.error);
    }

    callback();

    // Return an observable with a user-facing error message.
    return throwError(() => 'Could not fetch the resource.');
  }
}
