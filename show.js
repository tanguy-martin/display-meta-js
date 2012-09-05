(function () {

    'use strict';

    var 
        // first get all the meta elements
        metas = document.getElementsByTagName('meta'),

        // just some counter, you know...
        i = 0,

        // styles for divs displaying the info of the meta elements,
        // the "meta divs"
        metaStyles = '.show-meta .meta { ' + [
            'display: block',
            'opacity: 0.8',
            'color: #fff',
            'background-color: #000',
            'width: 450px',
            'padding: 10px',
            'font: 13px/1.231 arial,helvetica,clean,sans-serif',
            'margin: 1px 0',
            'text-align: left',
            'word-break: break-all',
            'border-radius: 5px', // i like a bit of border radius
            'border: 1px solid #fff' // i like a bit of border radius
        ].join(';') + '}',

        // styles for the container of all the meta divs
        containerStyles = '.show-meta { ' + [
            'position: absolute',
            'top: 5px',
            'left: 5px',
            'z-index: 99999'
        ].join(';') + '}',

        // handler function to the click event: we want to remove the meta tags
        // if someone click outside of it
        clickListener = function(e) {
            if (e.target.className !== null && !/^(show-meta|meta)$/g.test(e.target.className)) {
                document.body.removeChild(container);
                // also remove the event listener
                document.body.removeEventListener('click', clickListener, false);
            }
        },
        div,
        container;

    // by default the value of display of the head element is "none"
    // document.getElementsByTagName('head')[0].style.display = 'block';

    // create css rules for our meta divs...
    document.styleSheets[0].insertRule(metaStyles, 0);
    // ...and the container
    document.styleSheets[0].insertRule(containerStyles, 0);

    container = document.createElement('div');
    container.className = 'show-meta';

    // prepend the container to the list of child of the document
    // the meta divs will be added to it afterwards
    document.body.insertBefore(container, document.body.firstChild);
    
    // so now we just loop over the metas elements we got from the
    // start, create a div for each one, and put the content
    // of the meta as a text node of the div, thanks to the "outerHTML"
    // property of the "HTMLMetaElement" DOM Object

    while (i < metas.length) {
        div = document.createElement('div');
        div.className = 'meta';
        div.textContent = metas[i].outerHTML;

        if (div.textContent) {
            document.body.firstChild.appendChild(div);
        }

        i++;
    }

    document.body.addEventListener('click', clickListener, false);

}());