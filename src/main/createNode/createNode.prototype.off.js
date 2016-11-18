CreateNode.prototype.off = function (names, callback) {
  names = names.toLowerCase().split(',');

  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();

    if (names[i].length) {
      if (typeof callback === 'function') {
        this.subscribers[names[i]] = this.subscribers[names[i]].filter(partial(not, callback));
        this.node.removeEventListener(names[i], callback, false);
      } else {
        while (this.subscribers[names[i]].length) {
          this.node.removeEventListener(names[i], this.subscribers[names[i]][0], false);
          this.subscribers[names[i]].shift();
        }
      }
    }
  }

  return this;
};