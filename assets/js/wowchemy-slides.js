/*************************************************
 *  Hugo Blox Builder - https://hugoblox.com/
 *  License: https://github.com/HugoBlox/hugo-blox-builder/blob/main/LICENSE.md
 *
 *  Reveal.JS integration
 **************************************************/

/*
  global RevealMarkdown, RevealSearch, RevealNotes, RevealMath, RevealZoom, Reveal, mermaid, RevealMenu
*/

import * as params from '@params';

// Enable core slide features.
var enabledPlugins = [RevealMarkdown, RevealSearch, RevealNotes, RevealMath.KaTeX, RevealZoom];

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamelCase = function (s) {
  return s.replace(/([-_][a-z])/gi, function (term) {
    return term.toUpperCase().replace('-', '').replace('_', '');
  });
};

const keysToCamelCase = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(function (k) {
      n[toCamelCase(k)] = keysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map(function (i) {
      return keysToCamelCase(i);
    });
  }

  return o;
};

// reveal configurations can be included in front matter under slides.reveal
var pluginOptions = {};
if (typeof params.slides.reveal_options !== 'undefined') {
  pluginOptions = params.slides.reveal_options;
}

pluginOptions = keysToCamelCase(pluginOptions);

//enable menu by default if not set
if (typeof pluginOptions.menu_enabled === 'undefined') {
  pluginOptions.menu_enabled = true;
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);
}

pluginOptions['plugins'] = enabledPlugins;

Reveal.initialize(pluginOptions);

// Disable Mermaid by default.
if (typeof params.slides.diagram === 'undefined') {
  params.slides.diagram = false;
}

// Configure Mermaid only if diagrams are enabled.
if (params.slides.diagram) {
  //mermaid options
  // mermaid: front matter configuration can be used to set mermaid options
  // You can also use directives (see mermaid documentation)
  var mermaidOptions = {};
  if (typeof params.slides.diagram_options !== 'undefined') {
    mermaidOptions = params.slides.diagram_options;
  }

  // `startOnLoad` must be false since diagrams are lazily rendered.
  mermaidOptions['startOnLoad'] = false;

  mermaid.initialize(mermaidOptions);

  // Lazily render Mermaid diagrams within Reveal.JS slides
  // See: https://github.com/hakimel/reveal.js/issues/2863#issuecomment-1107444425
  let renderMermaidDiagrams = function renderMermaidDiagrams(event) {

    let mermaidDivs = event.currentSlide.querySelectorAll('.mermaid:not(.done)');
    let indices = Reveal.getIndices();
    let pageno = `${indices.h}-${indices.v}`

    mermaidDivs.forEach(function (mermaidDiv, i) {

      let insertSvg = function (svgCode) {
        mermaidDiv.innerHTML = svgCode;
        mermaidDiv.classList.add('done');
      };
      let graphDefinition = mermaidDiv.textContent;
      mermaid.mermaidAPI.render(`mermaid${pageno}-${i}`, graphDefinition, insertSvg);
    });
    Reveal.layout();
  };

  Reveal.on('ready', event => renderMermaidDiagrams(event));
  Reveal.on('slidechanged', event => renderMermaidDiagrams(event));
}

Reveal.initialize({
  // transition: 'concave',
  slideNumber: 'c/t',
  customcontrols: {
    controls: [
      { icon: '<i class="fa fa-pen-square"></i>',
        title: 'Toggle chalkboard (B)',
        action: 'RevealChalkboard.toggleChalkboard();'
      },
      { icon: '<i class="fa fa-pen"></i>',
        title: 'Toggle notes canvas (C)',
        action: 'RevealChalkboard.toggleNotesCanvas();'
      },
      {
        id: 'toggle-overview',
        title: 'Toggle overview (O)',
        icon: '<i class="fa fa-th"></i>',
        action: 'Reveal.toggleOverview();'
       } // ,
      // {
      //   id: 'full-screen',
      //   icon: '<i class="fa-solid fa-expand"></i>',
      //   title: 'Toggle Full Screen',
      //   action: 'screenfull.toggle();'
      // }
    ]
  },
  chalkboard: {
    chalkEffect: 0.3,
    eraser: { src: path + 'img/sponge.png', radius: 50},
    chalks: [
      { color: 'rgba(255,255,255,1)', cursor: 'url(' + path + 'img/chalk-white.png), auto'},
      { color: 'rgba(96, 154, 244, 1)', cursor: 'url(' + path + 'img/chalk-blue.png), auto'},
      { color: 'rgba(237, 20, 28, 1)', cursor: 'url(' + path + 'img/chalk-red.png), auto'},
      { color: 'rgba(20, 237, 28, 1)', cursor: 'url(' + path + 'img/chalk-green.png), auto'},
      { color: 'rgba(220, 133, 41, 1)', cursor: 'url(' + path + 'img/chalk-orange.png), auto'},
      { color: 'rgba(220,0,220, 1)', cursor: 'url(' + path + 'img/chalk-purple.png), auto'},
      { color: 'rgba(255,220,0, 1)', cursor: 'url(' + path + 'img/chalk-yellow.png), auto'}
]
  },
  plugins: [RevealChalkboard, RevealCustomControls, RevealLoadContent, RevealAnything]
});
