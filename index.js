!function(a,b){function c(){}function d(a,b){function c(b,c){b&&(f[c]=b.getNode?b.getNode():b,e.push(f[c]),a.childNodes.push(f[c]),f[c].node?(f[c].parentNode=a,d.appendChild(f[c].node)):d.appendChild(new Text(f[c])))}var d=document.createDocumentFragment(),e=[],f=[];if(Array.isArray(b))for(var g=0,h=b.length;h>g;g++)c(b[g],g);else c(b,0);a.node.appendChild(d),e.forEach(l)}function e(a){function b(){d.dragstart.length>1&&(document.body.style[A.userSelect]="none",document.body.style.cursor="default")}function c(){d.dragstart.length>1&&(document.body.style[A.userSelect]="",document.body.style.cursor="")}var d=a.subscribers;d.dragstart&&-1===d.dragstart.indexOf(b)&&(a.on("dragstart",b),a.on("dragend",c))}function f(a,b){b.children&&b.children().forEach(function(b){var c=b.name&&b.name();c&&(a.node[c]=b.component||b),f(a,b)})}function g(a){return q(a)?a:a instanceof u?a.node:"string"==typeof a||"number"==typeof a&&!isNaN(a)?new Text(a):a&&a.node&&a.node.document?g(a.node.document):!1}function h(a){var b,c,d,e,f=0,g=0;return"number"==typeof a.selectionStart?(f=a.selectionStart,g=a.selectionEnd):(c=document.selection.createRange(),c&&c.parentElement()===a&&(b=a.value.replace(/\r\n/g,"\n"),d=a.createTextRange(),d.moveToBookmark(c.getBookmark()),e=a.createTextRange(),e.collapse(!1),d.compareEndPoints("StartToEnd",e)>-1?f=g=a.value.length:(f=-d.moveStart("character",-a.value.length),f+=b.slice(0,f).split("\n").length-1,d.compareEndPoints("EndToEnd",e)>-1?g=a.value.length:(g=-d.moveEnd("character",-a.value.length),g+=b.slice(0,g).split("\n").length-1)))),[f,g]}function j(a){var b=[],c=!1,d=a.length,e=0,f="";for(a=a.replace(/\s+/g," ");d>e;)"["===a[e]&&"'"!==a[e-1]?(c=!0,f+=a[e]):"]"===a[e]&&"'"!==a[e-1]?(c=!1,f+=a[e]):" "!==a[e]||c?f+=a[e]:(b.push(f),f=""),e++;return b.push(f),b}function k(a){var b=a.match(/\.[a-zA-Z0-9\-\_]+/g),c=a.match(/\#[a-zA-Z0-9\-\_]+/),d=a.match(/\[[^\]]+?\]/g),e=a.match(/^[a-zA-Z0-9\-\_]+/),f={tagName:e?e[0]:!1,attributes:{}};return b&&(f.attributes.className=b.map(function(a){return a.slice(1)})),c&&(f.attributes.id=c[0].slice(1)),d&&d.forEach(function(a){var b=a.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);b[1]="class"===b[1]?"className":b[1],b[3]=b[3]?b[3].slice(1,-1):!1,b[2]?"*"===b[2]?f.attributes[b[1]]=new RegExp(b[3]):"^"===b[2]?f.attributes[b[1]]=new RegExp("^"+b[3]):"$"===b[2]&&(f.attributes[b[1]]=new RegExp(b[3]+"$")):b[3]?f.attributes[b[1]]=new RegExp("^"+b[3]+"$"):f.attributes[b[1]]=new RegExp(".+")}),f}function l(a){a.hasParent&&(a.hasParent(B)&&a.trigger("mount"),a.children().forEach(l))}function m(a){for(var b=[],c=a.parentNode,d=document.body.parentNode;c&&c!==d;)b.push(c),c=c.parentNode;return b}function o(a,b,c){if(a.setSelectionRange)a.setSelectionRange(b,c);else if(a.createTextRange){var d=a.createTextRange();d.collapse(!0),d.moveStart("character",b),d.moveEnd("character",c),d.select()}}function p(a){a.trigger&&(a.trigger("unmount"),a.children().forEach(p))}function q(a){var b=["HTML","SVGS","SVGU"],c=Object.prototype.toString.call(a).substr(8,4);return-1!==b.indexOf(c)}function r(a){var b=["text","password","phone","number"],c=a.tagName,d="TEXTAREA"===c,e="INPUT"===c&&b.indexOf(a.type)>-1;return d||e}function s(a,b,d){var e=c.lib[a],g=new e(b),h=[],i=[];if(g.tagName=a,g.node=g.node||{},g.props=g.props||{},e.prototype.text)for(var j=0,k=d.length;k>j;j++)"string"==typeof d[j]||"number"==typeof d[j]?i.push(d[j]):h.push(d[j]);else h=d;for(var l in b)g.props[l]=b[l];if("function"==typeof g.render){if(g.node.document=g.render(b),!g.node.document)throw new Error("Invalid component, component must return a node in the render function.");g.node.document.component=g,f(g,g.node.document)}return h.length&&g.append(h),i.length&&g.text.apply(g,i),g}function t(a){var b={},d=[];switch(arguments.length){case 2:Array.isArray(arguments[1])?d=arguments[1]:b=arguments[1];break;case 3:b=arguments[1],d=arguments[2]}if(c["function"][a])return c["function"][a](b,d);if(c.lib[a])return s(a,b,d);if("string"==typeof a)return new u(a,b,d);if(q(a))return new u(a,b,d,!0);throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")')}function u(a,b,c,d){function f(a){return d||a===window?a:(this.isSVG=-1!==J.indexOf(a),a=this.isSVG?document.createElementNS(I,a):document.createElement(a))}arguments.length;this.subscribers={},this.childNodes=[],this.node=f.call(this,a),this.tagName=this.node.tagName.toLowerCase(),this.append(c),this.attr(b),this.node.style.transform=this.node.style[A.transform],this.node.style.userSelect=this.node.style[A.userSelect],this.node.style.userModify=this.node.style[A.userModify],e(this)}function v(){function a(a,b){var c=document.createEvent("CustomEvent");return b=b||{bubbles:!1,cancelable:!1,detail:void 0},c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}"function"!=typeof window.CustomEvent&&(a.prototype=window.Event.prototype,window.CustomEvent=a)}function w(){var a=!1;document.addEventListener("click",function(b){a?b.target.dispatchEvent(new MouseEvent("doubleclick",{clientX:b.pageX,clientY:b.pageY,bubbles:!0,cancelable:!0})):a=!0,setTimeout(function(){a=!1},250)})}function x(){document.body.addEventListener("mousedown",function(a){function b(a){var h=new CustomEvent("dragend",{detail:{startX:d,startY:e,pageX:a.pageX,pageY:a.pageY,distanceX:a.pageX-d,distanceY:a.pageY-e},target:g,bubbles:!0,cancelable:!0});document.body.removeEventListener("mousemove",c),document.body.removeEventListener("mouseup",b),1===a.which&&f&&(f=!1,document.body.style[A.userSelect]="",document.body.style.cursor="",g.dispatchEvent(h))}function c(a){var b={detail:{startX:d,startY:e,pageX:a.pageX,pageY:a.pageY,distanceX:a.pageX-d,distanceY:a.pageY-e},target:g,bubbles:!0,cancelable:!0};Math.abs(d-a.pageX)+Math.abs(e-a.pageY)>5&&!f?(f=!0,g.dispatchEvent(new CustomEvent("dragstart",b))):f&&g.dispatchEvent(new CustomEvent("dragmove",b))}var d=a.pageX,e=a.pageY,f=!1,g=a.target;1===a.which&&(document.body.addEventListener("mouseup",b),document.body.addEventListener("mousemove",c))})}function y(){F&&document.addEventListener("keyup",function(a){var b;r(a.target)&&(b=M.node.indexOf(a.target),-1===b?(b=M.node.length,M.node.push(a.target),M.value.push(["",a.target.value])):(M.value[b].shift(),M.value[b].push(a.target.value)),M.value[b][0]===M.value[b][1]||a.which!==H&&a.which!==G||a.target.dispatchEvent(new Event("input")))},!1)}function z(){for(var a,b=document.getElementsByTagName("*")[0],c=window.getComputedStyle(b),d=!1,e={},f=0,g=L.length;g>f;f++)for(var h=0,i=K.length;i>h;h++)a=L[f]+K[h][0].toUpperCase()+K[h].slice(1),"undefined"!=typeof c[a]&&(d||(d=L[f]),e[K[h]]=a);A=e}c.lib={},c["function"]={},c.onCreateListeners=[],c.create=function(a){function b(b){c["function"][a]=b}function d(b){function d(a){return function(b){a.call(this,b)}}function e(a){return function(){for(var c,d=0,e=arguments.length,f=new Array(e);e>d;d++)f[d]=arguments[d];return c=b[a].apply(this,f)}}var f=[],g=function(){},h={};for(var i in b)b.hasOwnProperty(i)&&(f.push(i),"constructor"===i&&(g=d(b[i])));for(j in b)"append"===j?g.prototype.append=c.facade.append(b[j]):"constructor"!==j&&(g.prototype[j]=e(j));for(var j in c.prototype)"undefined"==typeof g.prototype[j]&&(g.prototype[j]=c.prototype[j]);return c.lib[a]=g,h={name:a,constructor:g},c.onCreateListeners.forEach(function(a){a(h)}),g}if(c.lib[a]||c["function"][a])throw"Cannot create Component function: duplicate name '"+a+"'";return"function"==typeof arguments[1]?b(arguments[1]):d(arguments[1])},c.extend=function(){function a(a){"function"==typeof a.prototype.append&&(a.prototype.append=c.facade.append(a.prototype.append)),"function"==typeof a.prototype.remove&&(a.prototype.remove=c.facade.remove(a.prototype.remove));for(var b in c.prototype)"undefined"==typeof a.prototype[b]&&(a.prototype[b]=c.prototype[b])}for(var b=0,d=arguments.length;d>b;b++)a(arguments[b])},c.facade=function(a){if(!Array.isArray(a))throw"Invalid argument for Component.facade. The argument must be an array of methods.";a.forEach(function(a){c.prototype[a]||(c.prototype[a]=c.facade.method(a))})},c.facade.append=function(a){return function(b){return a.call(this,b),this.mapChildrenToNode(b),this}},c.facade.method=function(a){return function(){for(var b,c=0,d=arguments.length,e=new Array(d),f=this.node.document;d>c;c++)e[c]=arguments[c];return b=f[a].apply(f,e),"undefined"==typeof b?this:b}},c.find=function(a){var b=[];for(var d in c.lib)a.test(d)&&b.push(d);return b},c.off=function(a,b){function d(a,b){var d=c.subscribers[a];d.splice(d.indexOf(b),1)}a=a.toLowerCase().split(",");for(var e=0,f=a.length;f>e;e++)if(a[e]=a[e].trim(),a[e].length&&b)d(a[e],b);else for(;c.subscribers[a[e]].length;)d(a[e],c.subscribers[a[e]][0]);return c},c.onCreate=function(a){return c.onCreateListeners.push(a),c},c.trigger=function(){var a,b,d=c.subscribers;return"string"==typeof arguments[0]?(a=arguments[0],b=arguments[1]||{}):(a=arguments[0].type,b=arguments[0]),a=a.toLowerCase().split(","),c.node.disabled||a.forEach(function(a){a=a.trim(),a.length&&d[a]&&d[a].forEach(function(c){c(Object.assign({},b,{type:a}))})}),c},c.prototype.after=function(a){var b=this.parentComponent.childNodes;return"undefined"==typeof a?b[b.indexOf(a)+1]:(this.node.document.after(a),b.splice(b.indexOf(this)+1,0,a),this)},c.prototype.append=function(a){return this.mapChildrenToNode(a),this.node.document.append(a),this},c.prototype.closest=function(a){var b=this.parentComponent;if(!c.lib[a])return this.node.document.closest(a);for(a=c.lib[a];b;){if(b instanceof a)return b;b=b.parentComponent}return!1},c.prototype.disable=function(){return this.node.document.disable(),this.node.document.childNodes.forEach(function(a){a.disable()}),this},c.prototype.enable=function(){return this.node.document.enable(),this.node.document.childNodes.forEach(function(a){a.enable()}),this},c.prototype.mapChildrenToNode=function(a){var b=this;return a.forEach(function(a){var c=a.name&&a.name();c&&(b.node[c]=a)}),this},c.prototype.mount=function(){function a(a){a.trigger("mount"),a.node.document&&a.node.document.trigger("mount")}a(this)},c.prototype.off=function(a,b){var c=this;return"undefined"==typeof this.subscribers&&(this.subscribers={}),a.toLowerCase().split(",").forEach(function(a){var d;if(a=a.trim(),"undefined"!=typeof c.subscribers[a]){for(d=c.subscribers[a].indexOf(b);-1!==d;)c.subscribers[a].splice(d,1),d=c.subscribers[a].indexOf(b);if("undefined"==typeof b)for(;c.subscribers[a].length;)c.subscribers[a].shift()}}),this},c.prototype.on=function(a,b){var c=this;return"undefined"==typeof this.subscribers&&(this.subscribers={}),b&&a.toLowerCase().split(",").forEach(function(a){a=a.trim(),a.length&&("undefined"==typeof c.subscribers[a]&&(c.subscribers[a]=[]),-1===c.subscribers[a].indexOf(b)&&c.subscribers[a].push(b))}),this},c.prototype.once=function(a,b){function c(e){b.call(d,e),d.off(a,c)}var d=this;return this.on(a,c),this},c.prototype.prepend=function(a){var b=this;return this.childNodes=this.childNodes||[],this.mapChildrenToNode(a),this.node.document.prepend(a),[].shift.apply(this.childNodes,a),a.forEach(function(a){a.parentComponent=b,b.childNodes.push(a)}),this},c.prototype.trigger=function(){function a(a){var b=a.split(","),d=[];for(i=0,n=b.length;i<n;i++)b[i]=b[i].trim(),b[i].length&&c.subscribers[b[i]]&&d.push(b[i]);return d}var b,c=this,d=arguments[0],e=arguments[1];return this.subscribers=this.subscribers||{},"string"==typeof d?(b=a(d.toLowerCase()),e=e||{}):(e=arguments[0],b=a(e.type.toLowerCase())),b.forEach(function(a){c.subscribers[a].slice().forEach(function(a){a.call(c,e)})}),this},"object"==typeof module&&module.exports&&(module.exports=c);var A,B,C="1.3.8",D=["borderRadius","bottom","fontSize","height","left","marginBottom","marginLeft","marginRight","marginTop","maxHeight","maxWidth","minHeight","minWidth","paddingBottom","paddingLeft","paddingRight","paddingTop","right","top","translateX","translateY","translateZ","width"],E=["rotate"],F=/^Mozilla\/(4\.0|5\.0|1\.22) \(((c|C)ompatible;|Windows; U;) MSIE 9\.0;/.test(window.navigator.userAgent),G=8,H=46,I="http://www.w3.org/2000/svg",J=["svg","circle","line","path","use"],K=["transform","userSelect","userModify","transition","animation"],L=["Moz","webkit","ms"],M={node:[],value:[]};u.fn=function(a,b){u.prototype[a]=b},u.prototype.addClass=function(a){function b(a){-1===c.indexOf(a)&&c.push(a)}var c=this.classList();return Array.isArray(a)?a.forEach(b):b(a),this.node.className=c.sort().join(" "),this},u.prototype.after=function(a){var b=this.siblings(),c=b.indexOf(this);c<b.length-1?b[c+1].before(a):d(this.getNode().parentNode,a)},u.prototype.append=function(a){if(arguments.length>1)throw"You have too many arguments ("+arguments.length+") for '.append', it takes a node or an array of nodes.";return d(this,a),this},u.prototype.appendTo=function(a){return q(a)?d(t(a),this):d(a,this),this},u.prototype.attr=function(){function a(a,b){return"className"===a?f.className(b):"style"===a?f.style(b):f.isSVG?f.node.setAttributeNS("http://www.w3.org/1999/xlink",a,b):"once"===a.substr(0,4)?f.once(a.substr(4),b):"on"===a.substr(0,2)?f.on(a.substr(2),b):f.node.setAttribute(a,b),f}function b(b,c){return"string"==typeof b&&"undefined"!=typeof c?a(b,c):"string"==typeof b?f.node.getAttribute(b):void 0}function c(a){for(var c in a)b(c,a[c])}var d={},e=this.node.attributes,f=this;if(0===arguments.length){for(var g=0,h=e.length;h>g;g++)d[e[g].nodeName]=e[g].nodeValue;return d}return"object"==typeof arguments[0]?c(arguments[0]):b(arguments[0],arguments[1])},u.prototype.before=function(a){var b=document.createDocumentFragment(),c=this.parentNode.childNodes;if(Array.isArray(a))for(var d=0,e=a.length;e>d;d++)b.appendChild(g(a[d]));else if(!Array.isArray(a)||arguments.length>1)throw"Before takes a single array as an argument";return this.node.parentNode.insertBefore(b,this.node),[].splice.apply(c,[c.indexOf(this),0].concat(a)),[].forEach.call(b,l),this},u.prototype.check=function(){return this.node.checked=!0,this},u.prototype.children=function(a,b){return"number"==typeof a&&"number"==typeof b?this.childNodes.slice(a,b):Array.isArray(a)?(this.childNodes=[],this.node.innerHTML="",this.append(a),this):"number"==typeof a?this.childNodes[a]:this.childNodes},u.prototype.classList=function(){for(var a,b=(this.node.getAttribute("class")||"").split(" "),c=[],d=0,e=b.length;e>d;d++)a=b[d].trim(),a&&c.push(a);return c},u.prototype.className=function(a){return"undefined"==typeof a?this.classList().join(" "):(a=Array.isArray(a)?a.sort().join(" "):a,this.isSVG?this.node.setAttributeNS(null,"class",a):this.node.className=a,this)},u.prototype.clone=function(){return t(this.node.cloneNode(!0))},u.prototype.cloneDeep=function(){return t(this.node.cloneNode(!0)).mapChildren()},u.prototype.closest=function(a){for(var b,c=this.node.parentNode;c;){if(b=t(c),b.is(a))return b;c=c.parentNode}return!1},u.prototype.contains=function(a){function b(a,b){return b=b.getNode().node,a.contains(b)&&b!==a}if(Array.isArray(a))for(var c=0,d=a.length;d>c;c++)if(b(this.node,a[c]))return!0;return b(this.node,a)},u.prototype.copy=function(a){var b=t(a);return this.attr(b.attr()),this.html(b.html()),this},u.prototype.disable=function(){return this.node.setAttribute("disabled","disabled"),this},u.prototype.enable=function(){return this.node.removeAttribute("disabled"),this},function(){function a(a){function b(d){d.forEach(function(d){d.children&&(a(d)&&c.push(d),b(d.childNodes))})}var c=[];return b(this.childNodes),c}function b(b){function c(b){e.push(a.call(b,function(a){return a.is(d[0])}))}for(var d=j(b),e=[[this]];d.length;)e[e.length-1].forEach(c),d.shift();return e.slice(-1)[0]}u.prototype.find=function(c){if("string"==typeof c)return b.call(this,c);if("function"==typeof c)return a.call(this,c);throw new Error("Invalid selector for 'find'")}}(),u.prototype.focus=function(){return this.node.focus(),this},u.prototype.getNode=function(){return this},u.prototype.getSelector=function(){var a=this.attr(),b=this.node.tagName.toLowerCase(),c=this.siblings(),d={"class":function(a){return"."+a.replace(/[ ]+/g," ").trim().split(" ").filter(function(a){return!/^\d+$/.test(a)}).join(".")},id:function(a){return"#"+a},name:function(a){return'[name="'+a+'"]'},title:function(a){return'[title="'+a+'"]'},value:function(a){return'[value="'+a+'"]'},type:function(a){return'[type="'+a+'"]'}},e=[];if("body"===b)return b;-1===b.indexOf(":")&&e.push(b);for(var f in a)"function"==typeof d[f]&&a[f].length&&e.push(d[f.toLowerCase()](a[f]));return c.length>1&&"undefined"==typeof this.node.id&&e.push(":nth-child("+(c.indexOf(this.node)+1)+")"),e.join("").replace(/\n/g,"")},u.prototype.hasClass=function(a){var b=this.classList();if(Array.isArray(a)){for(var c=0,d=a.length;d>c;c++)if(-1===b.indexOf(a[c]))return!1;return!0}return-1!==b.indexOf(a)},u.prototype.hasParent=function(a){function b(a){return(a.getNode?a.getNode().node:a).contains(c)}var c=this.node;return Array.isArray(a)?a.map(b):b(a)},u.prototype.html=function(a){return"undefined"==typeof a?this.node.innerHTML:(this.node.innerHTML=a,this)},u.prototype.is=function(a){const b=k(a),c=this.attr();if(b.tagName&&b.tagName!==this.tagName)return!1;for(var d in b.attributes)if("className"===d){if(!this.hasClass(b.attributes[d]))return!1}else if(b.attributes[d])if("string"==typeof b.attributes[d]){if(b.attributes[d]!==c[d])return!1}else if(!b.attributes[d].test(c[d]))return!1;return!0},u.prototype.isChecked=function(){return this.node.checked},u.prototype.isDisabled=function(){return"disabled"===this.node.getAttribute("disabled")},u.prototype.isFocused=function(){return document.activeElement===this.node},u.prototype.isVisible=function(){function a(a){var b=a.offset(),d=a.style();return b.right<0?!1:b.left>c?!1:b.bottom<0?!1:"none"===d.display?!1:"hidden"===d.visibility?!1:"hidden"===d.overflow?0!==b.height&&0!==b.width:!0}var b,c=window.innerWidth;if(a(this)){b=this.parents();for(var d=0,e=b.length;e>d;d++)if(!a(b[d]))return!1;return!0}return!1},u.prototype.mapChildren=function(){function a(b){[].forEach.call(b.node.childNodes,function(c){var d;q(c)&&(d=t(c),b.childNodes.push(d),d.parentNode=b,a(d))})}return a(this),this},u.prototype.name=function(a){return"undefined"!=typeof a?(this.node.setAttribute("name",a),this):this.node.getAttribute("name")},u.prototype.off=function(a,b){function c(a,b){var c=d.subscribers[a];d.node.removeEventListener(a,b),c.splice(c.indexOf(b),1)}var d=this;a=a.toLowerCase().split(",");for(var e=0,f=a.length;f>e;e++)if(a[e]=a[e].trim(),a[e].length&&b)c(a[e],b);else for(;this.subscribers[a[e]].length;)c(a[e],this.subscribers[a[e]][0]);return this},u.prototype.offset=function(){var a=this.node.getBoundingClientRect();return{width:a.width,height:a.height,left:a.left,right:a.right,bottom:a.bottom,top:a.top}},u.prototype.on=function(a,b){function c(a,b){return function(c){a.trigger(b,c)}}a=a.toLowerCase().split(",");for(var d=0,e=a.length;e>d;d++)a[d]=a[d].trim(),a[d].length&&("load"!==a[d]&&"error"!==a[d]||"img"!==this.tagName?(this.subscribers[a[d]]=(this.subscribers[a[d]]||[]).concat(b),this.node.addEventListener(a[d],b)):this.node[a[d]]=c(this,a[d]));return this},u.prototype.once=function(a,b){var c=this,d=function(e){b.call(c,e),c.off(a,d)};return this.on(a,d),this},u.prototype.parent=function(){return this.parentNode},u.prototype.parents=function(){return m(this.node).map(function(a){return t(a)})},u.prototype.prepend=function(a){var b=0,c=a.length,d=document.createDocumentFragment(),e=[];if(!this.node.parentNode)throw"Cannot perform 'prepend', node requires a parent";if(Array.isArray(a)){for(;c>b;b++)a[b]&&(e[b]=a[b].getNode?a[b].getNode():a[b],e[b].node?(e[b].parentNode=this,d.appendChild(e[b].node)):(e[b]=new Text(e[b]),d.appendChild(new Text(e[b]))));this.node.parentNode.insertBefore(d,this.node),[].unshift.apply(this.childNodes,e.reverse())}else this.prepend([a])},u.prototype.prependTo=function(a){var b=a.getNode(),c=b.node.childNodes;return c.length?b.node.insertBefore(this.node,c[0]):b.node.appendChild(this.node),b.childNodes.unshift(this),this},u.prototype.remove=function(){var a=this.hasParent(B),b=this.parentNode.childNodes;return this.node.parentNode.removeChild(this.node),b.splice(b.indexOf(this),1),a&&p(this),this},u.prototype.removeChild=function(a){return Array.isArray(a)?a.forEach(function(a){a.remove()}):a.remove(),this},u.prototype.removeClass=function(a){function b(b){return b!==a}var c=this.classList();return Array.isArray(a)?a.forEach(function(a){c=c.filter(b)}):c=c.filter(b),this.node.className=c.join(" "),this},u.prototype.replaceWith=function(a){return a=t(g(a)),this.node.parentNode?(this.node.parentNode.replaceChild(a.node,this.node),this):(this.node=a.node,this)},u.prototype.scrollHeight=function(){return this.node.scrollHeight},u.prototype.scrollTop=function(a){return"undefined"==typeof a?this.node.scrollTop:(this.node.scrollTop=a,this)},u.prototype.scrollWidth=function(){return this.node.scrollWidth},u.prototype.select=function(a,b){if(["input","textarea"].indexOf(this.tagName)>-1)return"undefined"==typeof a&&"undefined"==typeof b?h(this.node):(0>a&&(a=this.node.value.length+a),0>b&&(b=this.node.value.length+b),"undefined"==typeof b&&(b=a),this.node.focus(),o(this.node,a,b),this);if("select"===this.tagName){if("undefined"==typeof a)return this.node.selectedIndex;this.node.value=this.node.childNodes[a].value}},u.prototype.selectorPath=function(){for(var a=[this.getSelector()],b=this.node.parentNode;b;){if(a.unshift(t(b).getSelector()),b===document.body||b.id.length>0)return a.join(" ");b=b.parentNode}return a.join(" ")},u.prototype.siblings=function(){var a=this.parentNode;return a?a.childNodes:[]},function(){function a(a,b){var c=window.getComputedStyle(a),d=c[b];return d?"px"===d.slice(-2)?Number(d.slice(0,-2)):d:c}function b(a,b){if("number"==typeof b){if(D.indexOf(a)>-1)return b+"px";if(E.indexOf(a)>-1)return b+"deg"}return b}function c(a,c,e){"function"==typeof d[c]?a.style[c]=d[c](e):a.style[c]=b(c,e)}var d={transform:function(a){var c=[];if("object"==typeof a){for(var d in a)"number"==typeof a[d]||"string"==typeof a[d]?c.push(d+"("+b(d,a[d])+")"):Array.isArray(a[d])&&c.push(d+"("+a[d].map(partial(toPixel,d)).join(", ")+")");a=c.join(" ")}return a}};u.prototype.style=function(b,d){if("object"==typeof b){for(var e in b)c(this.node,e,b[e]);return this}return"string"==typeof b&&"undefined"!=typeof d?(c(this.node,b,d),this):a(this.node,b)}}(),u.prototype.text=function(a){return"undefined"!=typeof a&&"boolean"!=typeof a?(this.node.textContent=a,this):this.node.textContent.trim()},u.prototype.textNodes=function(){for(var a=document.createTreeWalker(this.node,NodeFilter.SHOW_TEXT,null,!1),b=a.nextNode(),c=[];b;)c.push(b),b=a.nextNode();return c},u.prototype.toggleClass=function(a){return this.hasClass(a)?this.removeClass(a):this.addClass(a),this},u.prototype.trigger=function(){var a,b,c=this.subscribers;return"string"==typeof arguments[0]?(a=arguments[0],b=arguments[1]||{}):(a=arguments[0].type,b=arguments[0]),a=a.toLowerCase().split(","),this.node.disabled||a.forEach(function(a){a=a.trim(),a.length&&c[a]&&c[a].forEach(function(a){a.call(self,b)})}),this},u.prototype.uncheck=function(){return this.node.checked=!1,this},u.prototype.value=function(a){return"undefined"!=typeof a?(this.node.value=a,this):this.node.value?this.node.value.trim():this.node.value},v(),w(),x(),y(),z(),B=t(document.body),c.facade(Object.keys(u.prototype)),t.fn=u.fn,"object"==typeof module?module.exports={el:t,version:C,Component:c}:window&&(window.flatman={el:t,version:C,Component:c}),b["true"]=a}({},function(){return this}());