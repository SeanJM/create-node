/*
  Argument format
  CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
*/

function CreateNode () {
  var that = this;
  var doubleclick = false;
  var attributes = {};
  var values = [];
  var i = 1;
  var n = arguments.length;
  var className;

  this.subscribers = {};

  if (arguments[0] instanceof CreateNode) {
    this.node = arguments[0].node;
    this.subscribers = arguments[0].subscribers;
  } else if (isElement(arguments[0]) || arguments[0] === window) {
    this.node = arguments[0];
  } else if (isString(arguments[0])) {
    this.node = document.createElement(arguments[0]);
    if (isObject(arguments[1]) && !(arguments[1] instanceof CreateNode)) {
      attributes = arguments[1];
    }

    for (i = 1; i < n; i++) {
      if (arguments[i] instanceof CreateNode) {
        this.node.appendChild(arguments[i].node);
      } else if (isString(arguments[i])) {
        this.node.appendChild(new Text(arguments[i]));
      } else if (
        arguments[i]
        && typeof arguments[i].appendTo === 'function'
      ) {
        arguments[i].appendTo(this.node);
      }
    }

    for (var k in attributes) {
      if (k === 'class') {
        className = filter(map(attributes[k].split(' '), trim), hasLength);
        this.node.className = className.sort().join(' ');
      } else if (k === 'style') {
        setStyle(this.node, attributes[k]);
      } else if (/on[A-Z][a-z]/.test(k.substr(0, 4))) {
        // A fast test to see if the property matches "onClick" or "onKeyup" or
        // "onScroll" pattern
        if (isFunction(attributes[k])) {
          this.on(k.substr(2).toLowerCase(), attributes[k]);
        } else {
          throw '\"' + k + '\" must have a function as a value.';
        }
      } else {
        this.node.setAttribute(k, attributes[k]);
      }
    }
  }

  if (IS_IE && isTextInput(this.node)) {
    // Normalize IE 9 input event
    this.node.addEventListener('keyup', function (e) {
      if (e.target === this.node) {
        if (!values.length) {
          values = [
            this.node.value,
            this.node.value
          ];
        } else {
          values[0] = values[1];
          values[1] = this.node.value;
        }

        if (values[0] !== values[1] && (e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY)) {
          this.trigger('input', {
            type : 'input',
            which : e.which
          });
        }
      }
    }, false);
  }

  // Double click
  this.node.addEventListener('click', function (e) {
    if (doubleclick) {
      that.trigger('doubleclick', e);
    } else {
      doubleclick = true;
    }
    setTimeout(function () {
      doubleclick = false;
    }, 200);
  });

  this.check = this.node.check;
  this.style = this.node.style;
  this.style.transform = this.style[VENDOR_PREFIX.transform];
}

function createNode () {
  var i = 0;
  var n = arguments.length;
  var a;

  function F() { return CreateNode.apply(this, a); }

  // Faster way to apply arguments
  if (typeof arguments[0] === 'function') {
    switch (n) {
      case 1 :
        return createComponent(arguments[0]);

      case 2 :
        return createComponent(arguments[0], arguments[1]);

      case 3 :
        return createComponent(
          arguments[0],
          arguments[1],
          arguments[2]
        );

      case 4 :
        return createComponent(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3]
        );

      case 5 :
        return createComponent(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4]
        );

      default :
        a = new Array(n);
        for (; i < n; i++) {
          a[i] = arguments[i];
        }
        return createComponent.apply(null, a);
    }
  } else if (typeof arguments[0] !== 'undefined') {
    // Check for the possibility that they are passing a constructor as a string
    if (
      typeof arguments[0] === 'string'
      && arguments[0][0] === arguments[0][0].toUpperCase()
      && arguments[0][1] === arguments[0][1].toLowerCase()
    ) {
      throw 'Invalid tag name: "' + arguments[0] + '", it looks like you are passing a constructor name as a string.';
    }
    switch (n) {
      case 1 :
        return new CreateNode(arguments[0]);

      case 2 :
        return new CreateNode(
          arguments[0],
          arguments[1]
        );

      case 3 :
        return new CreateNode(
          arguments[0],
          arguments[1],
          arguments[2]
        );

      case 4 :
        return new CreateNode(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3]
        );

      case 5 :
        return new CreateNode(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4]
        );

      default :
        a = new Array(n);

        for (; i < n; i++) {
          a[i] = arguments[i];
        }

        F.prototype = CreateNode.prototype;
        return new F();
    }
  }
}
