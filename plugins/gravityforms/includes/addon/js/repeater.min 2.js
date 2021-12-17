jQuery.fn.repeater=function(e){var l=this;return l.options=jQuery.extend(!0,{},{template:"",limit:5,items:[{}],saveEvents:"blur change",saveElements:"input, select",addButtonMarkup:"+",removeButtonMarkup:"-",minItemCount:1,callbacks:{save:function(){},beforeAdd:function(){},add:function(){},beforeAddNew:function(){},addNew:function(){},beforeRemove:function(){},remove:function(){},repeaterButtons:function(){return!1}}},e),l.elem=jQuery(this),l.items=l.options.items,l.callbacks=l.options.callbacks,l._template=l.options.template,l._baseObj=l.items[0],l.init=function(){return l.stashTemplate(),l.elem.addClass("repeater"),l.refresh(),l.bindEvents(),l},l.bindEvents=function(){l.options.saveEvents=l.getNamespacedEvents(l.options.saveEvents),l.elem.off("click.repeater","a.add-item"),l.elem.on("click.repeater","a.add-item:not(.inactive)",function(){l.addNewItem(this)}),l.elem.off("click.repeater","a.remove-item"),l.elem.on("click.repeater","a.remove-item",function(e){l.removeItem(this)}),l.elem.off(l.options.saveEvents,l.options.saveElements),l.elem.on(l.options.saveEvents,l.options.saveElements,function(){l.save()})},l.stashTemplate=function(){l._template||(l._template=l.elem.html()),l._template=jQuery.trim(l._template)},l.addItem=function(e,t){var n=l.getItemMarkup(e,t),a=jQuery(n).addClass("item-"+t);l.callbacks.beforeAdd(l,a,e,t),l.append(a),l.populateSelects(e,t),l.callbacks.add(l,a,e,t)},l.getItemMarkup=function(e,t){var n=l._template;for(var a in e)e.hasOwnProperty(a)&&(n=(n=(n=n.replace(/{i}/g,t)).replace("{buttons}",l.getRepeaterButtonsMarkup(t))).replace(new RegExp("{"+a+"}","g"),escapeAttr(e[a])));return n},l.getRepeaterButtonsMarkup=function(e){var t=l.callbacks.repeaterButtons(l,e);return t=t||l.getDefaultButtonsMarkup(e)},l.getDefaultButtonsMarkup=function(e){var t='<a class="add-item '+(l.items.length>=l.options.limit&&0!==l.options.limit?"inactive":"")+'" data-index="'+e+'">'+l.options.addButtonMarkup+"</a>";return l.items.length>l.options.minItemCount&&(t+='<a class="remove-item" data-index="'+e+'">'+l.options.removeButtonMarkup+"</a>"),'<div class="repeater-buttons">'+t+"</div>"},l.populateSelects=function(e,t){for(var n in e)if(e.hasOwnProperty(n)){var a=l.elem.find("."+n+"_"+t);a.is("select")&&(jQuery.isArray(e[n])?a.val(e[n]):a.find('option[value="'+e[n]+'"]').prop("selected",!0))}},l.addNewItem=function(e,t){var n=l.isElement(e),a=(t=parseInt(void 0!==t?t:n?parseInt(jQuery(e).attr("data-index"),10)+1:l.items.length,10),n?l.getBaseObject():e);return l.callbacks.beforeAddNew(l,t),l.items.splice(t,0,a),l.callbacks.addNew(l,t),l.refresh().save(),l},l.removeItem=function(e){var t=l.isElement(e)?jQuery(e).attr("data-index"):e;l.callbacks.beforeRemove(l,t),delete l.items[t],l.callbacks.remove(l,t),l.save().refresh()},l.refresh=function(){l.elem.empty();for(var e=0;e<l.items.length;e++)l.addItem(l.items[e],e);return l},l.save=function(){for(var e=l.getBaseObjectKeys(),t=[],n=0;n<l.items.length;n++)if(void 0!==l.items[n]){for(var a={},r=0;r<e.length;r++){var s=e[r],o="."+s+"_"+n,i=l.elem.find(o).val();a[s]=void 0!==i&&i}t.push(a)}return l.items=t,l.callbacks.save(l,t),l},l.getBaseObjectKeys=function(){for(var e=[],t=0<l.items.length?l.items:[l._baseObj],n=0;n<t.length;n++)if(void 0!==t[n]){for(var a in t[n])t[n].hasOwnProperty(a)&&e.push(a);break}return e},l.getBaseObject=function(){for(var e={},t=l.getBaseObjectKeys(),n=0;n<t.length;n++)e[t[n]]="";return e},l.getNamespacedEvents=function(e){e=e.split(" ");for(var t=[],n=0;n<e.length;n++)t.push(e[n]+".repeater");return t.join(" ")},l.isElement=function(t){try{return t instanceof HTMLElement}catch(e){return"object"==typeof t&&1===t.nodeType&&"object"==typeof t.style&&"object"==typeof t.ownerDocument}},l.init()};