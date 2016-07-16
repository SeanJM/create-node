function contains(node) {
  var i = 1;
  var n = arguments.length;
  var x;
  var y;

  node = node instanceof CreateNode
    ? node.node
    : node;

  function each(a) {
    a = a instanceof CreateNode
      ? a.node
      : a;

    return node.contains(a) && a !== node;
  }

  for (; i < n; i++) {
    if (isArray(arguments[i])) {
      for (x = 0, y = arguments[i].length; x < y; x++) {
        if (each(arguments[i][x])) {
          return true;
        }
      }
    } else if (each(arguments[i])) {
      return true;
    }
  }

  return false;
}