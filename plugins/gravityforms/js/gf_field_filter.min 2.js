!function(s){var a,c,u,d,g,v,h,m;function p(){var e,t;return e="<div class='gform-field-filter'>",e+=function(){var e,t,i=[];for(i.push("<select class='gform-filter-field' name='f[]' >"),e=0;e<u.length;e++)t=b(u[e]),i.push(t);return i.push("</select>"),i.push("<input type='hidden' class='gform-filter-type' name='t[]' value='' >"),i.join("")}()+r()+o()+(t="",h?(t+="<button class='gform-add add_field_choice gform-st-icon gform-st-icon--circle-plus' title='{0}'"+"></button>".format(gf_vars.addFieldFilter),t+="<button class='gform-remove delete_field_choice gform-st-icon gform-st-icon--circle-minus' title='"+gf_vars.removeFieldFilter+"'></button>"):t),e+="</div>"}function b(e,t){t=t||0;var i,r,o,l,n,f,a,s,c,u,d="",g=[],v="&nbsp;&nbsp;&nbsp;&nbsp;";if(r=e.key,e.group){for(a=e.filters.length,f=[],u=e.isNestable?t+1:t,i=0;i<a;i++)(s=e.filters[i]).group?(c=b(s,u),f.push(c)):(l=v.repeat(u)+s.text,d=F(o=s.key)?'disabled="disabled"':"",f.push('<option {0} value="{1}">{2}</option>'.format(d,o,l)));n=v.repeat(t)+e.text,e.isNestable?g.push('<optgroup label="{0}"></optgroup>{1}'.format(n,f.join(""))):g.push('<optgroup label="{0}">{1}</optgroup>'.format(n,f.join("")))}else d=e.preventMultiple&&F(r)?"disabled='disabled'":"",l=e.text,g.push('<option {0} value="{1}">{2}</option>'.format(d,r,l));return g.join("")}function y(e){var t=s(e),i=l(t.siblings(".gform-filter-field").val());i&&t.siblings(".gform-filter-value").replaceWith(o(i,e.value)),w(),window.gformInitDatepicker&&gformInitDatepicker()}function _(e){var t=l(e.value);if(t){var i=s(e);i.siblings(".gform-filter-value").replaceWith(o(t)),i.siblings(".gform-filter-type").val(t.type),i.siblings(".gform-filter-operator").replaceWith(r(t)),i.siblings(".gform-filter-operator").change()}w()}function F(e){e=e.toString();var i=[];return s(".gform-filter-field :selected").each(function(e,t){i[e]=s(t).val()}),-1<s.inArray(e,i)}function r(e){var t,i,r="<select name='o[]' class='gform-filter-operator'>";if(e)for(t=0;t<e.operators.length;t++)i=e.operators[t],r+='<option value="{0}">{1}</option>'.format(i,gf_vars[c[i]]);return r+="</select>"}function o(e,t){var i,r,o,l,n,f,a="";if(f="gform-filter-value",e&&void 0!==e.cssClass&&(f+=" "+e.cssClass),e&&e.values&&"contains"!=t){for(void 0!==e.placeholder&&(a+='<option value="">{0}</option>'.format(e.placeholder)),i=0;i<e.values.length;i++)r=e.values[i].value,o=e.values[i].text,e.values[i].operators&&-1===s.inArray(t,e.values[i].operators)||(a+='<option value="{0}">{1}</option>'.format(r,o));l="<select name='v[]' class='{0}'>{1}</select>".format(f,a)}else n=e&&void 0!==e.placeholder?"placeholder='{0}'".format(e.placeholder):"",l="<input type='text' value='' name='v[]' class='{0}' {1}/>".format(f,n);return l}function l(e,t){var i;if(e){t=t||u;for(var r=0;r<t.length;r++){if(e==t[r].key)return t[r];if(t[r].group&&(i=l(e,t[r].filters)))return i}}}function j(){if(v){var e=s("#gform-field-filters");if(s(".gform-field-filter").length<=1)s(a).hasClass("ui-resizable")&&a.resizable("destroy");else e.get(0).scrollHeight>a.height()||a.height()>=m?(a.css({"min-height":m+"px","border-bottom":"5px double #DDD"}).resizable({handles:"s",minHeight:m}),e.css("min-height",m)):a.css({"min-height":"","border-bottom":""})}}function k(){var e="";e+="<div id='gform-no-filters' >"+gf_vars.addFieldFilter,e+="<button class='gform-add add_field_choice gform-st-icon gform-st-icon--circle-plus' title='{0}'"+"></div>".format(gf_vars.addFieldFilter),s("#gform-field-filters").html(e),v&&(a.css({"min-height":"","border-bottom":""}),a.height(80),s("#gform-field-filters").css("min-height",""))}function w(){s("select.gform-filter-field option").removeAttr("disabled"),s("select.gform-filter-field").each(function(e){var t=l(this.value);void 0!==t&&t.preventMultiple&&F(this.value)&&s("select.gform-filter-field option[value='"+this.value+"']:not(:selected)").attr("disabled","disabled")})}function x(e){var t;return t='<select name="mode"><option value="all" {0}>{1}</option><option value="any" {2}>{3}</option></select>'.format(i("all",e),gf_vars.all,i("any",e),gf_vars.any),t=gf_vars.filterAndAny.format(t)}function i(e,t){return e==t?'selected="selected"':""}function D(e){var t,i;(i=(t=s(e)).is("button")?t.parent():t).after(p()),i.next("div").find(".gform-filter-field").change().find(".gform-filter-operator").change(),1==s(".gform-field-filter").length&&i.after(x()),j()}s.fn.gfFilterUI=function(e,t,i,r){var o,l,n,f;return o=e,l=t,n=i,f=r,(a=s(this)).css("position","relative").html('<div id="gform-field-filters"></div>'),v=void 0!==(m=f)&&0<m,c={is:"is",isnot:"isNot",">":"greaterThan","<":"lessThan",contains:"contains",starts_with:"startsWith",ends_with:"endsWith"},gf_vars.baseUrl,u=o,d=l&&l.filters?l.filters:[],g=l&&l.mode?l.mode:"all",h=!(void 0!==n&&!n),function(i){var e;if(a.on("change",".gform-filter-field",function(){_(this)}),a.on("click","#gform-no-filters",function(){0==s(".gform-field-filter").length&&D(this),s(this).remove()}),a.on("click",".gform-add",function(e){D(this),e.preventDefault()}),a.on("click",".gform-remove",function(){!function(e){s(e).parent().remove(),0==s(".gform-field-filter").length&&k();w(),j()}(this)}),a.on("change",".gform-filter-operator",function(){y(this,this.value)}),void 0===i||0==i.length)return k();"off"!=g&&s("#gform-field-filters").append(x(g));for(e=0;e<i.length;e++)s("#gform-field-filters").append(p());s(".gform-filter-field").each(function(e){var t=i[e].field;jQuery(this).val(t),_(this)}),s(".gform-filter-operator").each(function(e){var t=i[e].operator;jQuery(this).val(t),y(this,this.value)}),s(".gform-filter-value").each(function(e){var t=i[e].value;jQuery(this).val(t),jQuery(this).change()}),j()}(d),this},String.prototype.format=function(){var i=arguments;return this.replace(/{(\d+)}/g,function(e,t){return void 0!==i[t]?i[t]:e})}}((window.gfFilterUI=window.gfFilterUI||{},jQuery));