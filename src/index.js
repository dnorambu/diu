 // Importing this module registers <mwc-button> as an element that you
// can use in this page.
//
// Note this import is a bare module specifier, so it must be converted
// to a path using a server such as es-dev-server.
import '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-select';
import '@material/mwc-textfield';
import '@material/mwc-checkbox'
import '@material/mwc-fab';
import '@material/mwc-slider';
import '@material/mwc-snackbar';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textarea';
import '@material/mwc-formfield';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-icon-button';
// Standard DOM APIs work with Web Components just like they do for
// built-in elements.

window.snacker.onclick = function () {
    window.snack.stacked = false;
    window.snack.leading = false;
    window.snack.open = true;
};