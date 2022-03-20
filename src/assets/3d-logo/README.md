First apply all the modifiers by selecting the object then seclting the modifiers panel (the wrench icon) and click on each of the modifiers arrow and select apply.

next, go to UV editing tab and press a to select all parts of the logo mesh and then press "u"
and select "smart uv project". set the island margin to 0.001 and click OK.

Go to shading tab and from top-left corner of one of the areas set its view to shader editor (blob icon).

on the image texture node, click new and enter 1024 by 1024 or higher resolution and click OK.

To create the object color texture, set the Metalic value in the Principled BSDF node to 0 and then in the render panel select difuse and bake. Restore the Metalic value to its original value for other bakes.

Another way to bake the color is to link the color output of ColorBump node from Base Color input of Principled BSDF node to Emission input of the Pincipled BSDF node and then bake "Emit" from the render settings and then restore that connection back to its original.

Bake other kind of texures (roughness, normal, etc.) as described in the YouTube video (links below).

To bake all the values combined, select "combined" from the bake type. after the bake is complete and we save the image, we create a new image texture node (or use the existing one)
and click the folder icon and select the image. Then, the color output of this node should go 
to the color input of the Principled BSDF node (the other links are removed).

See [How to bake procedural materials in Blender](https://youtu.be/AioskAgcU2U)
See [How to bake metalic maps in Blender](https://youtu.be/aaRspfc9OBU)
See [Why the bake color is black](https://blender.stackexchange.com/q/95782)
See this not so much related video about [shadow catchers](https://youtu.be/GIGKit1e3u8)
See https://blender.stackexchange.com/q/95782

To edit curves and paths, select the path or curve and then go to edit mode by pressing Tab (or selecting edit mode from top-left corner)
To extend (add node) to a bezier curve select the curve or one of its nodes by dragging over it and press E.
To grab and move a node or a node handle, drag over it and press G.
To move the view, hold shift and drag the mouse middle button.
To connect two nodes together (fill), select both of them and press F or press Alt + C (close).
To set the exact position of a node, select it and then near the gizmo and the right toolbar drag the small arrow to the left to open the "Item" menu which contains the coordinates.

We can simply animate position of the camera manually with no problem. However, to animate the camera along a path and then export the animation to gltf, see below links.
To animate the camera along a path see https://blender.stackexchange.com/a/46898
To export camera animation along a path see https://youtu.be/omAoKWyG_J4
(set the keyframes as close as possible so that when the animation is converted it takes less size. Bit it seems to make camera movement not so smooth. We can then set the animation speed in three.js however we want)

If the object lighting in three.js is not good, try to change the toneMapping and/or tweak toneMappingExposure of the three.js renderer.
