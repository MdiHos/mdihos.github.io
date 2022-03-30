"use strict";var s=Object.defineProperty,r=(t,e,i)=>e in t?s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,n=(t,e,i)=>(r(t,"symbol"!=typeof e?e+"":e,i),i);const ELEMENT_NAME="theme-switch",ICON_SIZE=24,ICON_COLOR="#000",THEME_KEY="theme",THEME_AUTO="auto",THEME_DARK="dark",THEME_LIGHT="light",THEME_VALUES=["auto","dark","light"],THEME_DEFAULT="light",THEME_ATTRIBUTE="data-theme",COLOR_SCHEME_DARK="(prefers-color-scheme: dark)",CUSTOM_EVENT_NAME="themeToggle",ICON_INITIAL_STATE_FOR_AUTO=[10,0,33,0],ICON_INITIAL_STATE_FOR_DARK=[10,0,20,1],ICON_INITIAL_STATE_FOR_LIGHT=[5,1,33,1],a=class extends HTMLElement{constructor(){super(),n(this,"shadowRoot"),n(this,"identifier",a.counter++),this.shadowRoot=this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=generateIcon(...getInitialStateForIcon()),this.shadowRoot.host.addEventListener("click",this.onClick),document.addEventListener("themeToggle",i=>{i.detail.originId!==this.identifier&&this.adaptToTheme()}),window.addEventListener("storage",i=>{"theme"===i.key&&(this.adaptToTheme(),updateTheme())});const e=document.createElement("style");e.textContent=generateStyle(),this.shadowRoot.append(e)}onClick(){const e=getUserThemeSelection();this.toggleTheme(e);const i=getUserThemeSelection(),o=this.createEvent(e,i);this.dispatchEvent(o)}createEvent(e,i){return new CustomEvent("themeToggle",{detail:{originId:this.identifier,oldState:e,newState:i},bubbles:!0,composed:!0,cancelable:!1})}toggleTheme(e){"auto"===e?(localStorage.setItem("theme","light"),this.animateThemeButtonIconToLight()):"dark"===e?(localStorage.setItem("theme","auto"),this.animateThemeButtonIconToAuto()):(localStorage.setItem("theme","dark"),this.animateThemeButtonIconToDark()),updateTheme()}adaptToTheme(){const e=getUserThemeSelection();"auto"===e?this.animateThemeButtonIconToAuto():"dark"===e?this.animateThemeButtonIconToDark():this.animateThemeButtonIconToLight()}animateThemeButtonIconToLight(){this.shadowRoot.getElementById("letter-anim-hide").beginElement(),this.shadowRoot.getElementById("core-anim-shrink").beginElement(),this.shadowRoot.getElementById("rays-anim-rotate").beginElement(),this.shadowRoot.getElementById("rays-anim-show").beginElement()}animateThemeButtonIconToAuto(){this.shadowRoot.getElementById("eclipse-anim-go").beginElement(),this.shadowRoot.getElementById("letter-anim-show").beginElement()}animateThemeButtonIconToDark(){this.shadowRoot.getElementById("rays-anim-hide").beginElement(),this.shadowRoot.getElementById("core-anim-enlarge").beginElement(),this.shadowRoot.getElementById("eclipse-anim-come").beginElement()}};let ThemeSwitchElement=a;function generateIcon(t,e,i,o){return` <button id="theme-switch"> <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> <defs> <mask id="mask"> <rect width="100%" height="100%" fill="#fff"/> <circle id="eclipse" r="10" cx="${i}" cy="6"> <animate id="eclipse-anim-come" fill="freeze" attributeName="cx" to="20" dur="300ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> <animate id="eclipse-anim-go" fill="freeze" attributeName="cx" to="33" dur="300ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> </circle> <g id="letter" fill="none" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="${o}"> <path pathLength="1" d="m 8,16.5 4,-9 4,9"/> <path pathLength="1" d="M 8,16.5 9,14.5 h 6"/> <animate id="letter-anim-show" fill="freeze" attributeName="stroke-dashoffset" to="0" dur="400ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines=".67,.27,.55,.9"/> <animate id="letter-anim-hide" fill="freeze" attributeName="stroke-dashoffset" to="1" dur="15ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> </g> </mask> </defs> <g id="visible-content" mask="url(#mask)"> <g id="rays" opacity="${e}" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"> <animate id="rays-anim-hide" fill="freeze" attributeName="opacity" to="0" dur="100ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> <animate id="rays-anim-show" fill="freeze" attributeName="opacity" to="1" dur="300ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> <animateTransform id="rays-anim-rotate" attributeName="transform" attributeType="XML" type="rotate" from="-25 12 12" to="0 12 12" dur="300ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> <path d="m12 1v3"/> <path d="m23 12h-3"/> <path d="m19.778 4.2218-2.121 2.1213"/> <path d="m19.778 19.778-2.121-2.121"/> <path d="m4.222 19.778 2.121-2.121"/> <path d="m4.222 4.222 2.121 2.121"/> <path d="m4 12h-3"/> <path d="m12 20v3"/> </g> <circle id="circle" r="${t}" cx="12" cy="12"> <animate id="core-anim-enlarge" fill="freeze" attributeName="r" to="10" dur="300ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> <animate id="core-anim-shrink" fill="freeze" attributeName="r" to="5" dur="300ms" begin="indefinite" calcMode="spline" keyTimes="0; 1" keySplines="0.37, 0, 0.63, 1"/> </circle> </g> </svg> </button> `}function generateStyle(){return":host{display:flex;width:var(--dummy-variable,24px);aspect-ratio:1/1;cursor:pointer}:host([hidden]){display:none}button{padding:0;border:none;background:0 0;display:flex;cursor:pointer}#circle{fill:var(--theme-switch-icon-color,#000)}#rays{stroke:var(--theme-switch-icon-color,#000)}"}function updateTheme(){let t=getUserThemeSelection();"auto"===t&&(t=getSystemTheme()),document.documentElement.setAttribute("data-theme",t)}function getUserThemeSelection(){const t=localStorage.getItem("theme");return THEME_VALUES.includes(t)?t:"light"}function getSystemTheme(){return window.matchMedia(COLOR_SCHEME_DARK).matches?"dark":"light"}function getInitialStateForIcon(){const t=getUserThemeSelection();return"auto"===t?ICON_INITIAL_STATE_FOR_AUTO:"dark"===t?ICON_INITIAL_STATE_FOR_DARK:ICON_INITIAL_STATE_FOR_LIGHT}n(ThemeSwitchElement,"counter",0),updateTheme(),window.customElements.define(ELEMENT_NAME,ThemeSwitchElement),window.matchMedia(COLOR_SCHEME_DARK).addEventListener("change",updateTheme);