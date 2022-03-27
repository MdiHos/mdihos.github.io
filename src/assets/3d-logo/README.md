### Logo look and feel and lighting
If the object lighting in three.js is not good, try to change the toneMapping and/or tweak toneMappingExposure of the three.js renderer.

### Baking and applying textures to the logo
First, apply all the modifiers by selecting the object then opening the modifiers panel (the wrench icon on the middle right) and clicking on each of the modifier arrows and selecting *apply*.

Next, select *UV Editing* tab and press <kbd>A</kbd> to select all parts of the logo mesh and then press <kbd>U</kbd> or click "UV" tab from the top bar
and select "Smart UV Project". Set the island margin to `0.01` and click OK (orientation of the result UV map does not matter; we can select all and rotate them).

Go to *Shading* tab and from top-left corner of one of the areas set its view to "Shader Editor" (blob icon).

Select the object from one of the areas. In the shader editor area, on the image texture node, click new and enter 1024 by 1024 or higher resolution and click OK (an image texture node can be created by pressing <kbd>Shift</kbd> + <kbd>A</kbd>).

To create the object color texture, set the *Metallic* value in the Principled BSDF node to `0` and then in the render panel select *diffuse* and click bake. Restore the Metallic value to its original value for other kinds of bakes. I set the margin value of the bake to `8` pixels.

For *Roughness* and *Normal* bake types, [the sample count of the render has no effect](https://blender.stackexchange.com/q/84897/145265) so set it to a low value to produce the result quicker.

Another way to bake the color is to link the color output of ColorBump node from Base Color input of Principled BSDF node to Emission input of the Principled BSDF node and then bake "Emit" from the render settings and then restore that connection back to its original.

Bake other kind of textures (roughness, normal, etc.) as described in the YouTube video (links below).

To bake all the values combined, select "combined" from the bake type (no need to set metallic value of material to 0) (also select direct and indirect and all the other lighting options).
After the bake is complete and we saved the image, create a new image texture node (or use the existing one)
and click the folder icon and select the image from disk. Then, the color output of this node should go 
to the color input of the Principled BSDF node.

See [How to bake ambient occlusion of a plane with transparency?](https://blender.stackexchange.com/q/258269/145265)
See [How to bake procedural materials in Blender](https://youtu.be/AioskAgcU2U)
See [How to bake metallic maps in Blender](https://youtu.be/aaRspfc9OBU)
See [Why the bake color is black](https://blender.stackexchange.com/q/95782)
See [Blender Cycles: baked texture is completely black](https://blender.stackexchange.com/q/95782)

### Curves and paths
To edit curves and paths, select the path or curve and then go to edit mode by pressing Tab (or selecting edit mode from top-left corner)
To extend (add node) to a Bézier curve, select the curve or one of its nodes by dragging over it with mouse and press <kbd>E</kbd>.
To grab and move a node or a node handle, drag over it and press <kbd>G</kbd>.
To move the view, hold shift and drag the mouse middle button.
To connect two nodes together (fill), select both of them and press <kbd>F</kbd> or press <kbd>Alt</kbd> + <kbd>C</kbd> (close).
To set the exact position of a node, select it and then near the gizmo and the right toolbar, drag the small arrow to the left to open the "Item" menu which contains the coordinates.
To change the starting node of a path or curve, first enable *Bsurfaces* addon from Edit -> preferences. Select the path and press tab to go to edit mode. Select the desired node to be the first node. Then from near the gizmo on the top right drag the small arrow to the left to open the panel and then select the Edit tab and from the Bsurfaces section click "Set First Points". See [Set the start point of a Bézier curve](https://blender.stackexchange.com/a/153908).

### Animating the camera
We can simply animate position of the camera manually with no problem. However, to animate the camera along a path and then export the animation (bake) to gltf, see below.

To animate the camera along a path see https://blender.stackexchange.com/a/46898 and https://youtu.be/mkD7S7wLx1I (make sure to set camera x, y, z `0` so it is placed on the path).

To export camera animation along a path, select the camera then click the menu item *Object* -> *Animation* -> *Bake Action...*. Select *Only Selected Bones*, *Visual Keying*, and *Clear Constraints* checkboxes and click OK. See https://youtu.be/omAoKWyG_J4
(set the keyframes as close as possible so that when the animation is converted, it takes less size. Bit it seems to make camera movement not so smooth)(We can set the animation speed in three.js to whatever speed we want). Also, baking seems to have the advantage that it does not require `camera.lookAt(...)` to be set in every frame of Three.js animation.

See [this post](https://stackoverflow.com/q/60704912/8583692) and [this post](https://stackoverflow.com/q/58194893/8583692).

### Environments
Some environment files were taken from Blender.

They are available in <blender-install-path>\datafiles\studiolights\world\

### Shadows
Environment maps (HDRIs) do not cast shadow in Three.js. Or in other words: They can be used in combination with shadow mapping
(see [this post](https://discourse.threejs.org/t/shadow-problem-with-env-map/16871/3)).

To show shadows in Three.js see below links:
  - https://stackoverflow.com/q/65655433
  - https://stackoverflow.com/q/66949832
  - https://stackoverflow.com/q/62280231
  - https://stackoverflow.com/q/35710130
  - https://stackoverflow.com/q/41212156
  - https://blender.stackexchange.com/q/89944
  - https://discourse.threejs.org/t/shadow-on-itself-gltf-model/22272
  - https://youtu.be/AUF15I3sy6s
  - https://youtu.be/Px-oUVJZWsE
  - https://stackoverflow.com/q/19914697
  - https://blender.stackexchange.com/q/41555
  - [Using compositing nodes in Blender 2.8](https://youtu.be/_m5sddzRhsA)

See this video about [making a plane shadow catcher in Blender](https://youtu.be/GIGKit1e3u8).

Instead of baking the AO (Ambient Occlusion), we can bake the shadows (in other words, make a light map) of the plane.
See https://discourse.threejs.org/t/ambient-oclusion-vs-lightmaps/31333

Before baking ambient occlusion for the plane, select *Non-Color* (or *sRGB* to produce subtler shadows) as the color space of the image texture node.

To bake plane ambient occlusion (ao), remember to first disconnect the image texture node output or a total black result is produced.
After baking is finished, remember to connect the output of the image texture node back to alpha input!
If you try to invert the image color, it is not immediately reflected in the image shown in blender. 

Make sure to set  the *Roughness* and *Metallic* of the Principled BSDF node to `1` so
the shadows are shown for all frames of the animation correctly.

We can save a frame of the animation from Chrome by right-clicking on the image and saving it.

The render sample count for ambient occlusion matters.

To make the shadows a little more interesting and noisy set a low sample count (`20`) in 
the render settings. I used `2048`.

Also, see [this YouTube video](https://youtu.be/cJ66-WWY37I).

### Exporting to glTF
Export the scene vto glTF from *File* -> *Export* -> *glTF 2.0* ->

  format: gltf binary (.glb)
  include: cameras
  transform: +Y Up
  geometry: UVs, Normals, Vertex Colors


### Miscellaneous
Read [Blender official documentations about glTF](https://docs.blender.org/manual/en/3.1/addons/import_export/scene_gltf2.html).

For importing and extruding an SVG icon and also making good shadows, see
[Tutorial: Rendering 2D Icons as 3D Objects in Blender](https://youtu.be/zthvZvw-yJE) and
[Three.js Realistic Lighting Setup Tutorial](https://youtu.be/7GGNzryHfTw).

See [Part 3: Creating a glTF-compatible Blender material from a set of PBR textures](https://youtu.be/70LRKp54zIc) for a sieries of videos explaining how to export to glTF.

To change materials of an imported glTF scene in Three.js see [this post](https://stackoverflow.com/a/56674907/8583692).

See [this video](https://youtu.be/1TeMXIWRrqE) for a similar logo with shadows etc. imported to Three.js.

See [CSS-TRICKS: Creating Photorealistic 3D Graphics on the Web](https://css-tricks.com/creating-photorealistic-3d-graphics-web/).
