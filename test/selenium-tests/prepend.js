var a = el('div', { class : 'a' });
var b = el('div', { class : 'b' });
var c = el('div', { class : 'c' });

a.append(b);
a.prepend(c);

return {
  left : a.children()[0].node === c.node,
  right : true
};
