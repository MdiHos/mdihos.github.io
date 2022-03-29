# Mahozad Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.
Make sure to first install Angular CLI with the command `npm install -g @angular/cli`.

It is possible to deploy directly to GitHub pages with the official
[angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) package.

To build or serve the application in production mode in IntelliJ, see [this post](https://stackoverflow.com/q/51127798).

To make the angular server available over local network (for example to access
it with mobile on the same network), see [this post](https://stackoverflow.com/q/43071535).

### Some useful commands

```shell
npm install -g @angular/cli

ng update @angular/cli @angular/core
ng update @angular/cli@10 @angular/core@10
ng update

# https://stackoverflow.com/a/40980411
npm install typescript@latest --save-dev
npm install typescript@4 --save-dev

ng add apollo-angular
```

### 3D images
The original 3d images of the "M" logo are in the [mahozad repository](https://github.com/mahozad/mahozad).

To make 3d logos, we can use the following tools:
  - Blender
  - The online tool [vectary](https://www.vectary.com/)
  - Adobe dimension
    - See [this tutorial](https://youtu.be/eHWdSGm8OwQ)
  - Adobe illustrator 2021 new 3d capabilities
  - Inkscape
    - Extensions -> generate from path -> motion
    - Path -> path effects -> extrusion
  - CSS transformations and shadows
  - SVG [extrusion filter](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/)
  - The library [three js](https://github.com/mrdoob/three.js/)
    We can create a live, interactive 3d object on the page. See [this post](https://stackoverflow.com/q/39601462).
    - See [this tutorial](https://youtu.be/Q7AOvWpIVHU) 
    - See [this article](https://muffinman.io/blog/three-js-extrude-svg-path/) 
    - See [this article](https://www.freecodecamp.org/news/render-3d-objects-in-browser-drawing-a-box-with-threejs/)
    - See [this example](https://alteredqualia.com/three/examples/webgl_text.html#D86A0A20010#Mahozad)
  
See [this YouTube playlist](https://youtube.com/playlist?list=PLD8AMy73ZVxXnHR_aXT8czc6SHDa0jV7F).

### Fonts
The main header uses a serif font called *Roboto Slab*.
Rest of the site uses the san-serif font *Roboto*.

These fonts are free and can be downloaded from [Google fonts site](https://fonts.google.com/).

Note that the woff2 version of those two fonts were obtained from third-party
sites (which may have created them by converting their original format to woff2).

Other serif fonts for the header:
  - Bitter **bold**
  - Exo **bold**
  - Gilroy **extra bold** (other wights were not free)
  - Karma **bold**
  - Philosopher **bold**

### Book previews
The link to readable previews of books is obtained from the Amazon book page ->
*Embed* link near the share buttons.
This link may not be shown for all formats of the book.
Change the book format, for example to *Kindle*, and see if that format has an
*Embed* link.

The embed links may redirect to the book page for Iran IP addresses.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## TODOs
  - Create a svelte version of the application (just for fun and learning and showcasing)
    To do this, create a new git branch for the svelte version.
  - Update the style of the site scrollbar (see YouTube scrollbar)
  - Create a print version of the site
  - Link to a new page containing my logos showcase (including my M logo)
    Or add a button in the current projects card which flips that card to show the logos on the back
  - Add resume download link
  - Create and show a 404 page or redirect to home page with a prompt when a page is not found
