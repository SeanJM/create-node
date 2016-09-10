const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const _ = require('lodash');
const TinyTest = require(path.resolve('grunt/tinyTest'));
const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

const tests = {};

m('test/selenium-tests/', /\.js$/).forEach(function (a) {
  tests[path.basename(a).replace(/\.js$/, '')] = fs.readFileSync(a, 'utf8');
});

module.exports = new TinyTest(function (test) {
  var file = 'file://' + path.resolve('test/index.html');

  driver.get(file).then(function () {
    Promise.all([

      // Add Class
      driver
        .executeScript(tests.addClass)
        .then(function (out) {
          test('addClass')
            .this(out.aClassName)
            .equal('my-class-name');

          test('addClass: Array')
            .this(out.bClassName)
            .equal('my-class my-class-2');
        }),

      // Append
      driver
        .executeScript(tests.append)
        .then(function (out) {
          test('append')
            .this(out.left)
            .equal(out.right);
        })
    ])
    .then(
      function () {
        test.done();
        driver.close();
      }
    );
  });


  // // attr
  // (function () {
  //   var a = el('div');
  //   a.attr('type', 'test');
  //   test('attr', a.attr('type')).equal('test');
  // }());
  //
  // // empty attr
  // (function () {
  //   var a = el('div');
  //   a.attr('type', 'test').attr('tabindex', '0');
  //   test('attr (no arguments, returns an object)', a.attr())
  //   .equal({ type : 'test', tabindex : '0' });
  // }());
  //
  // // children
  // (function () {
  //   var p = el('div');
  //   var a = el('div');
  //   var b = el('div');
  //   var t1;
  //   p.append(a, b);
  //   t1 = p.children()[0].node === a.node && p.children()[1].node === b.node;
  //   test('children', t1).equal(true);
  // }());
  //
  // console.log('clone');
  // // clone
  // (function () {
  //   var p = el('div', { class : 'test' });
  //   var c = p.clone();
  //   test('clone', p.attr('class')).equal(c.attr('class'));
  // }());
  //
  // console.log('contains array');
  // // contains array
  // (function () {
  //   var a = el('div', { class : 'test1' });
  //   var b = el('div', { class : 'test2' });
  //   var c = el('div', { class : 'test2' });
  //   var d = el('div', { class : 'test2' });
  //
  //   a.append(b, c, d);
  //
  //   test('contains (multiple arguments)',
  //       a.contains(b, c, d)
  //       && !b.contains(a, c, d)
  //       && a.contains([b, c], d)
  //     )
  //     .equal(true);
  // }());
  //
  // console.log('disable');
  // // disable
  // (function () {
  //   var p = el('div').disable();
  //   test('disable', p.isDisabled()).equal(true);
  // }());
  //
  // console.log('find');
  // // find
  // (function () {
  //   var a;
  //   var p = el('div', a = el('div', { class : 'test'}));
  //   test('find', p.find('.test')[0].node).equal(a.node);
  // }());
  //
  // console.log('focus');
  // // focus
  // (function () {
  //   var p = el('div', { tabIndex : '0' });
  //   p.appendTo('body');
  //   p.focus();
  //   test('focus', p.isFocused()).equal(true);
  //   p.remove();
  // }());
  //
  // console.log('getSelector');
  // // getSelector
  // (function () {
  //   var p = el('div', { class : 'test'});
  //   var a = el('div', { class : 'test', tabIndex : '0', id : 'my-id'});
  //   var t = p.getSelector() === 'div.test' && a.getSelector() === 'div.test#my-id';
  //   test('getSelector', t).equal(true);
  // }());
  //
  // console.log('getSelector');
  // // getSelector
  // (function () {
  //   var a = el('div', { class : 'test'});
  //   var b = el('div', { class : 'test-2'});
  //   var t = a.hasClass('test') && b.hasClass('test-2');
  //   test('hasClass', t).equal(true);
  // }());
  //
  // console.log('hasParent');
  // // hasParent
  // (function () {
  //   var a = el('div', { class : 'test'});
  //   var b = el('div', { class : 'test-2'});
  //   a.append(b);
  //   test('hasParent', b.hasParent(a) && !a.hasParent(b)).equal(true);
  // }());
  //
  // console.log('isDisabled');
  // // isDisabled
  // (function () {
  //   var a = el('input', { type : 'checkbox'});
  //   var b = el('input', { type : 'checkbox'});
  //   a.disable();
  //   test('isDisabled', a.isDisabled() && !b.isDisabled()).equal(true);
  // }());
  //
  // // isFocused
  // (function () {
  //   var a = el('input', { type : 'checkbox' });
  //   var b = el('input', { type : 'checkbox' });
  //
  //   a.appendTo('body');
  //   b.appendTo('body');
  //   a.focus();
  //
  //   test('isFocused', a.isFocused() && !b.isFocused()).equal(true);
  //
  //   a.remove();
  //   b.remove();
  // }());
  //
  // // isVisible
  // (function () {
  //   var a = el('div');
  //   var b = el('div');
  //   var c = el('div');
  //   var d = el('div');
  //   var e = el('div', { class : 'e' });
  //   var f = el('div', { class : 'f' });
  //
  //   a.appendTo('body');
  //   b.appendTo('body');
  //   c.appendTo('body');
  //   d.appendTo('body');
  //   e.appendTo('body');
  //   f.appendTo(e);
  //
  //   a.style.width = '30px';
  //   a.style.height = '10px';
  //
  //   b.style.position = 'absolute';
  //   b.style.left = '-100000px';
  //
  //   c.style.display = 'none';
  //
  //   d.style.width = 0;
  //   d.style.height = 0;
  //   d.style.overflow = 'hidden';
  //
  //   e.style.display = 'none';
  //
  //   test('isVisible',
  //     a.isVisible() &&
  //     !b.isVisible() &&
  //     !c.isVisible() &&
  //     !d.isVisible() &&
  //     !f.isVisible()
  //   ).equal(true);
  //
  //   a.remove();
  //   b.remove();
  //   c.remove();
  //   d.remove();
  //   e.remove();
  //   f.remove();
  // }());
  //
  // // off
  // (function () {
  //   var a = el('div');
  //   var x = true;
  //
  //   a.on('click', function () {
  //     test('off', true).equal(false);
  //     x = false;
  //   });
  //
  //   a.off('click');
  //   a.trigger('click');
  //
  //   if (x) {
  //     test('off', true).equal(true);
  //   }
  // }());
  //
  // // offset
  // (function () {
  //   var a = el('div', { style : 'position: absolute; left: 0; top: 0; width : 0; height: 0'});
  //   var o;
  //
  //   a.appendTo('body');
  //   o = a.offset();
  //
  //   test('offset',
  //     o.top === 0 &&
  //     o.left === 0 &&
  //     o.width === 0 &&
  //     o.height === 0
  //   ).equal(true);
  //
  //   a.remove();
  // }());
  //
  // // on
  // (function () {
  //   var x = true;
  //   var y = true;
  //   var a = el('div').on('click', function () { x = false; });
  //   var b = el('div', { onClick : function () { y = false; } });
  //
  //   a.trigger('click');
  //   b.trigger('click');
  //
  //   if (x && y) {
  //     test('on', true).equal(false);
  //   } else {
  //     test('on', true).equal(true);
  //   }
  // }());
  //
  // // parent
  // (function () {
  //   var a = el('div');
  //   var b = el('div');
  //   a.appendTo(b);
  //   test('parent', a.parent().node).equal(b.node);
  // }());
  //
  // // parents
  // (function () {
  //   var a = el('div', { class : 'a' });
  //   var b = el('div', { class : 'b' });
  //   var c = el('div', { class : 'c' });
  //   var p;
  //
  //   a.append(b.append(c));
  //   p = c.parents();
  //
  //   test('parents', p[1].node).equal(a.node);
  // }());
  //
  // // prepend
  // (function () {
  //   var a = el('div', { class : 'a' });
  //   var b = el('div', { class : 'b' });
  //   var c = el('div', { class : 'c' });
  //
  //   a.append(b);
  //   console.log('prepend');
  //   a.prepend(c);
  //   console.log('prepend:s');
  //
  //   test('prepend', a.children()[0].node).equal(c.node);
  // }());
  //
  // // prependTo
  // (function () {
  //   var a = el('div', { class : 'a' });
  //   var b = el('div', { class : 'b' });
  //   var c = el('div', { class : 'c' });
  //
  //   a.append(b);
  //   c.prependTo(a);
  //
  //   test('prependTo', a.children()[0].node).equal(c.node);
  // }());
  //
  // // remove
  // (function () {
  //   var a = el('div', { class : 'a' });
  //
  //   a.appendTo('body');
  //   a.remove();
  //
  //   test('remove', document.body.contains(a.node)).equal(false);
  // }());
  //
  // // removeClass
  // (function () {
  //   var a = el({ class : 'a' });
  //   var b = el({ class : 'a b c' });
  //   test('removeClass', a.removeClass('a').hasClass('a')).equal(false);
  //   test('removeClass: Array', b.removeClass(['a', 'c']).hasClass('b')).equal(true);
  // }());
  //
  // // replaceWith
  // (function () {
  //   var a = el('div');
  //   var b = el('div');
  //   var c = el('div');
  //
  //   a.append(b);
  //   b.replaceWith(c);
  //
  //   test('replaceWith', a.contains(c) && !a.contains(b)).equal(true);
  // }());
  //
  // // select
  // (function () {
  //   var a = el('input', { type : 'text' });
  //
  //   a.node.value = 'text';
  //   a.select(0, 1);
  //
  //   test('select', a.select()[0] === 0 && a.select()[1] === 1).equal(true);
  // }());
  //
  // // selectorPath
  // (function () {
  //   var a;
  //
  //   el('div', { class : '_1' },
  //     el('div', { class : '1_1'},
  //       a = el('div', { class : '1_1_1'})
  //     )
  //   );
  //
  //   test('selectorPath', a.selectorPath()).equal('div._1 div.1_1 div.1_1_1');
  // }());
  //
  // // siblings
  // (function () {
  //   var a;
  //   var b;
  //
  //   el('div', { class : '1' },
  //     a = el('div', { class : '1_1'}),
  //     el('div', { class : '1_2'}),
  //     el('div', { class : '1_3'}),
  //     b = el('div', { class : '1_4'})
  //   );
  //
  //   test('siblings', a.siblings()[3].node).equal(b.node);
  // }());
  //
  // // text
  // (function () {
  //   var a = el('div', el('div'), el('div'));
  //   a.text('text');
  //   test('text', a.text()).equal('text');
  // }());
  //
  // // text
  // (function () {
  //   var a = el('div', el('div'), el('div'));
  //   a.text('span');
  //   test('textNodes (String)', a.textNodes()[0].nodeValue).equal('span');
  // }());
  //
  // // text
  // (function () {
  //   var a = el('div', el('div'), el('div'));
  //   a.text(1);
  //   test('textNodes (String)', a.textNodes()[0].nodeValue).equal('1');
  // }());
  //
  // // toggleClass
  // (function () {
  //   var a = el('div');
  //   var b = el('div');
  //
  //   b.addClass('my-class');
  //   b.toggleClass('my-class');
  //   a.toggleClass('my-class');
  //
  //   test('toggleClass', a.hasClass('my-class') && !b.hasClass('my-class')).equal(true);
  // }());
  //
  // // trigger
  // (function () {
  //   var a = el('div');
  //   var x = true;
  //
  //   a.on('click', function () { x = false; });
  //   a.trigger('click');
  //
  //   test('trigger', x, false);
  // }());
  //
  // // value
  // (function () {
  //   var a = el('input', { type : 'input' });
  //   a.node.value = 'test';
  //   test('value', a.node.value).equal('test');
  // }());
  //
  // // fn
  // (function () {
  //   var a = el('div');
  //   el.fn('test', function () {
  //     return this.node;
  //   });
  //   test('fn (plugin)', a.test()).equal(a.node);
  // }());
});
