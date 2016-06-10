CreateNode.prototype.siblings = function () {
  var children = this.node.parentNode.childNodes;
  return map(filter(children, isElement), function (s) {
    return createNode(s);
  });
};
