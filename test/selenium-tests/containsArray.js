var a = el({ class : 'test1' });
var b = el({ class : 'test2' });
var c = el({ class : 'test2' });
var d = el({ class : 'test2' });

a.append(b, c, d);

return {
  left : (
    a.contains(b, c, d)
    && !b.contains(a, c, d)
    && a.contains([ b, c ], d)
  ),
  right : true
};
