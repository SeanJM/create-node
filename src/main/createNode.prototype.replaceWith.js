CreateNode.prototype.replaceWith = function (newNode) {
  newNode = createEl(newNode);

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(newNode.node, this.node);
    return this;
  }

  this.node = newNode.node;
  return this;
};