CreateNode.prototype.find = function (selector) {
  return [].map.call(this.node.querySelectorAll(selector), function (node) {
    return new CreateNode(node);
  });
};
