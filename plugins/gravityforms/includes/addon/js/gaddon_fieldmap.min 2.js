var gfieldmap=function(e){var a=this;return a.options=e,a.UI=jQuery("#gaddon-setting-row-"+a.options.fieldName),a.init=function(){a.bindEvents(),a.setupData(),a.setupRepeater()},a.bindEvents=function(){a.UI.on("change",'select[name="_gaddon_setting_'+a.options.keyFieldName+'"]',function(){var e=jQuery(this),t=e.data("chosen")?e.siblings(".chosen-container"):e.data("select2")?e.siblings(".select2-container"):e,n=e.siblings(".custom-key-container");"gf_custom"==e.val()&&t.fadeOut(function(){n.fadeIn().focus()})}),a.UI.on("click","a.custom-key-reset",function(e){e.preventDefault();var t=jQuery(this).parents(".custom-key-container"),n=t.siblings("select.key"),i=n.data("chosen")?n.siblings(".chosen-container"):n.data("select2")?n.siblings(".select2-container"):n;t.fadeOut(function(){t.find("input").val("").change(),n.val("").trigger("change"),i.fadeIn().focus()})}),a.UI.closest("form").on("submit",function(e){jQuery('[name^="_gaddon_setting_'+a.options.fieldName+'_"]').each(function(e){jQuery(this).removeAttr("name")})})},a.setupData=function(){var e=jQuery("#"+a.options.fieldId).val();a.data=e?jQuery.parseJSON(e):null,a.data||(a.data=[{key:"",value:"",custom_key:""}])},a.setupRepeater=function(){var e;e=0<a.options.limit?a.options.limit:0,a.UI.find("tbody.repeater").repeater({limit:e,items:a.data,addButtonMarkup:'<i class="gficon-add"></i>',removeButtonMarkup:'<i class="gficon-subtract"></i>',callbacks:{add:function(e,t,n){var i=t.find('select[name="_gaddon_setting_'+a.options.keyFieldName+'"]');!n.custom_key&&0<i.length?t.find(".custom-key-container").hide():t.find(".key").hide(),gform.doAction("gform_fieldmap_add_row",e,t,n)},save:function(e,t){t=jQuery.extend({},t);for(var n=0;n<t.length;n++)""!=t[n].custom_key&&(t[n].custom=1,t[n].key=t[n].custom_key),delete t[n].custom_key;jQuery("#"+a.options.fieldId).val(jQuery.toJSON(t))}}})},a.init()};