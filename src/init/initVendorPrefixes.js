function initVendorPrefixes() {
  var dummy = document.getElementsByTagName('*')[0];
  var styles = window.getComputedStyle(dummy);
  var prefix = false;
  var list = {};
  var property;

  for (var i = 0, n = PREFIXES.length; i < n; i++) {
    for (var x = 0, y = CSS_PREFIXED_PROPERTIES.length; x < y; x++) {
      property = PREFIXES[i] + CSS_PREFIXED_PROPERTIES[x][0].toUpperCase() + CSS_PREFIXED_PROPERTIES[x].slice(1);

      if (typeof styles[property] !== 'undefined') {
        if (!prefix) {
          prefix = PREFIXES[i];
        }
        list[CSS_PREFIXED_PROPERTIES[x]] = property;
      }
    }
  }

  VENDOR_PREFIX = list;
}
