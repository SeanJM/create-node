CreateNode.prototype.replaceWith = function (newNode) {
  var withNode = newNode instanceof CreateNode ? newNode._node_ : newNode;

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(withNode, this.node);
  }

  this.node = withNode;

  return this;
};
