# Mahozad Angular

## TODOs

- Add grain to the 3D M logo: https://www.google.com/search?q=blender+add+grain&oq=blender+add+grain
- Create a svelte version of the application (just for fun and learning and showcasing)  
  To do this, create a new Git branch for the svelte version
- Create a print version of the site
- Link to a new page containing my logos showcase (including my M logo)  
  Or add a button in the current projects card which flips that card to show the logos on the back
- Add resume download link
- Create and show a 404 page or redirect to home page with a prompt when a page is not found
- Add Persian localization for the site

## Adding subdomains
For adding a subdomain like *blog*.mahozad.ir we can create a separate repository
with a CNAME file in it containing `blog.mahozad.ir` and creating a CNAME record
in our DNS provider with key `blog.mahozad.ir` and value `mahozad.github.io`.

See https://youtu.be/-pJq3XZQbt0

## Build and deployment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
Make sure to first install Angular CLI with the command `npm install -g @angular/cli`.

To build the website, run the npm script `build:pod` or execute IDEA *Build for Production * run config
and then copy the result files to the base branch of the repository.
For more information see [this post](https://stackoverflow.com/q/51127798).

It is possible to deploy directly to GitHub pages with the official
[angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) package.

To make the angular server available over local network (for example to access
it with a mobile phone on the same network), see [this post](https://stackoverflow.com/q/43071535).

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Updating npm dependencies
See [this article](https://www.carlrippon.com/upgrading-npm-dependencies/).

## Some useful commands

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

## 3D images

The original 3D images of the "M" logo are in the [mahozad repository](https://github.com/mahozad/mahozad).

To make 3D logos, we can use the following tools:
  - Blender
  - The JavaScript library [Three.js](https://github.com/mrdoob/three.js/)
      We can create a live, interactive 3D object on web pages.
    - See [this tutorial](https://youtu.be/Q7AOvWpIVHU)
    - See [this article](https://www.freecodecamp.org/news/render-3d-objects-in-browser-drawing-a-box-with-threejs/)
  - The online tool [vectary](https://www.vectary.com/)
  - Adobe dimension
    - See [this tutorial](https://youtu.be/eHWdSGm8OwQ)
  - Adobe illustrator 2021 new 3D capabilities
  - Inkscape
    - Extensions 🡲 generate from path 🡲 motion
    - Path 🡲 path effects 🡲 extrusion
  - CSS transformations and shadows
  - SVG [extrusion filter](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/)
  
See [this YouTube playlist](https://youtube.com/playlist?list=PLD8AMy73ZVxXnHR_aXT8czc6SHDa0jV7F).

See this very good YouTube video [Beginners guide to photorealism](https://youtu.be/Z8AAX-ENWvQ) explaining
lights, materials, optics, camera, and so on


## Fonts

The main header uses a serif font called *Roboto Slab*.
Rest of the site uses the san-serif font *Roboto*.

These fonts are free and can be downloaded from [Google fonts site](https://fonts.google.com/).

Note that the *woff2* version of those two fonts were obtained from third-party
sites (which may have created them by converting their original format to *woff2*).

Other available serif fonts for the header:
  - Bitter **bold**
  - Exo **bold**
  - Gilroy **extra bold** (other wights were not free)
  - Karma **bold**
  - Philosopher **bold**

## Online preview for favorite/recommended books

The link to readable previews of books is obtained from the Amazon book page 🡲
*Embed* link near the share buttons.
This link may not be shown for all formats of the book.
Change the book format, for example to *Kindle*, and see if that format has an
*Embed* link.

The embed links may redirect to the book page for sanctioned IP addresses.
