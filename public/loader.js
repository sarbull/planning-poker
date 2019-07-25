window.loadComponent = (function() {
  function fetchAndParse( URL ) {
    return fetch( URL ).then( ( response ) => {
      return response.text();
    } ).then( ( html ) => {
      const parser = new DOMParser();
      const document = parser.parseFromString( html, 'text/html' );
      const head = document.head;
      // const template = head.querySelector( 'template' );
      // const style = head.querySelector( 'style' );
      const script = head.querySelector( 'script' );

      return {
        // template,
        // style,
        script
      };
    } );
  }

  function getSettings( { /*template, style,*/ script } ) {
    const jsFile = new Blob( [ script.textContent ], { type: 'application/javascript' } );
    const jsURL = URL.createObjectURL( jsFile );

    return import( jsURL ).then( ( module ) => {
      return {
        className: module.default,
        // template,
        // style
      }
    } );
  }

  function registerComponent( { /*template, style,*/ className } ) {
    class Component extends className {
      constructor() {
        super();
      }
    }

    let name = className.prototype.is();

    if(!customElements.get(name)) {
      return customElements.define( name, className );
    }
  }

  function loadComponent( URL ) {
    return fetchAndParse( URL ).then( getSettings ).then( registerComponent );
  }

  return loadComponent;
}());
