function initMergeTagSupport(){"undefined"!=typeof form&&0<=jQuery(".merge-tag-support").length&&jQuery(".merge-tag-support").each(function(){new gfMergeTagsObj(form,jQuery(this))})}function FormatCurrency(e){if(gf_vars.gf_currency_config){var t=new Currency(gf_vars.gf_currency_config).toMoney(jQuery(e).val());jQuery(e).val(t)}}function ToggleConditionalLogic(e,t){jQuery("#"+t+"_conditional_logic").is(":checked")?(CreateConditionalLogic(t,GetConditionalObject(t)),SetConditionalProperty(t,"actionType",jQuery("#"+t+"_action_type").val()),SetConditionalProperty(t,"logicType",jQuery("#"+t+"_logic_type").val()),SetRule(t,0),jQuery("#"+t+"_conditional_logic_container").show()):jQuery("#"+t+"_conditional_logic_container").hide()}function GetConditionalObject(e){var t=!1;switch(e){case"page":case"field":t=GetSelectedField();break;case"next_button":var i=GetSelectedField();(t=i.nextButton).id=i.id;break;case"confirmation":t=confirmation;break;case"notification":t=current_notification;break;default:t="undefined"!=typeof form&&form.button}return t=gform.applyFilters("gform_conditional_object",t,e)}function CreateConditionalLogic(t,e){e.conditionalLogic||(e.conditionalLogic=new ConditionalLogic);var i,o,r,n="hide"==e.conditionalLogic.actionType?"selected='selected'":"",a="show"==e.conditionalLogic.actionType?"selected='selected'":"",s="all"==e.conditionalLogic.logicType?"selected='selected'":"",l="any"==e.conditionalLogic.logicType?"selected='selected'":"";i="section"==e.type?gf_vars.thisSectionIf:"field"==t?gf_vars.thisFieldIf:"page"==t?gf_vars.thisPage:"confirmation"==t?gf_vars.thisConfirmation:"notification"==t?gf_vars.thisNotification:gf_vars.thisFormButton,r="next_button"==t?(o=gf_vars.enable,gf_vars.disable):(o=gf_vars.show,gf_vars.hide);var c={};"form_button"==t&&(c.a11yWarning="<div class='gform-alert gform-alert--accessibility'>",c.a11yWarning+="<span class='gform-alert__icon gform-icon gform-icon--accessibility' aria-hidden='true'></span>",c.a11yWarning+="<div class='gform-alert__message-wrap'><p class='gform-alert__message'>"+gf_vars.conditional_logic_a11y+"</p></div>",c.a11yWarning+="</div>"),c.actionType="<select id='"+t+"_action_type' onchange='SetConditionalProperty(\""+t+"\", \"actionType\", jQuery(this).val());'><option value='show' "+a+">"+o+"</option><option value='hide' "+n+">"+r+"</option></select>",c.objectDescription=i,c.logicType="<select id='"+t+"_logic_type' onchange='SetConditionalProperty(\""+t+"\", \"logicType\", jQuery(this).val());'><option value='all' "+s+">"+gf_vars.all+"</option><option value='any' "+l+">"+gf_vars.any+"</option></select>",c.ofTheFollowingMatch=gf_vars.ofTheFollowingMatch;var u,d,g=makeArray(c).join(" ");for(g=gform.applyFilters("gform_conditional_logic_description",g,c,t,e),u=0;u<e.conditionalLogic.rules.length;u++)d=e.conditionalLogic.rules[u],g+="<div width='100%' class='gf_conditional_logic_rules_container'>",g+=GetRuleFields(t,u,d.fieldId),g+=GetRuleOperators(t,u,d.fieldId,d.operator),g+=GetRuleValues(t,u,d.fieldId,d.value),g+="<button type='button' class='add_field_choice gform-st-icon gform-st-icon--circle-plus' title='add another rule' onclick=\"InsertRule('"+t+"', "+(u+1)+');" onkeypress="InsertRule(\''+t+"', "+(u+1)+');"></button>',1<e.conditionalLogic.rules.length&&(g+="<button type='button' class='delete_field_choice gform-st-icon gform-st-icon--circle-minus' title='remove this rule' onclick=\"DeleteRule('"+t+"', "+u+');" onkeypress="DeleteRule(\''+t+"', "+u+');"></button></li>'),g+="</div>";jQuery("#"+t+"_conditional_logic_container").html(g),Placeholders.enable(),jQuery("#"+t+"_conditional_logic",document).parents("form").on("submit",function(e){jQuery("#"+t+"_conditional_logic_object").val(JSON.stringify(GetConditionalObject(t).conditionalLogic))})}function GetRuleOperators(e,t,i,o){var r,n,a;return n={is:"is",isnot:"isNot",">":"greaterThan","<":"lessThan",contains:"contains",starts_with:"startsWith",ends_with:"endsWith"},r="<select id='"+e+"_rule_operator_"+t+"' class='gfield_rule_select' onchange='SetRuleProperty(\""+e+'", '+t+', "operator", jQuery(this).val());var valueSelector="#'+e+"_rule_value_"+t+'"; jQuery(valueSelector).replaceWith(GetRuleValues("'+e+'", '+t+',"'+i+'", ""));jQuery(valueSelector).change();\'>',a=IsEntryMeta(i)?GetOperatorsForMeta(n,i):n,a=gform.applyFilters("gform_conditional_logic_operators",a,e,i),jQuery.each(a,function(e,t){r+="<option value='"+e+"' "+(o==e?"selected='selected'":"")+">"+gf_vars[t]+"</option>"}),r+="</select>"}function GetOperatorsForMeta(e,i){var o={};return entry_meta[i]&&entry_meta[i].filter&&entry_meta[i].filter.operators?jQuery.each(e,function(e,t){0<=jQuery.inArray(e,entry_meta[i].filter.operators)&&(o[e]=t)}):o=e,o}function GetRuleFields(e,t,i){for(var o="<select id='"+e+"_rule_field_"+t+"' class='gfield_rule_select' onchange='jQuery(\"#"+e+"_rule_operator_"+t+'").replaceWith(GetRuleOperators("'+e+'", '+t+', jQuery(this).val()));jQuery("#'+e+"_rule_value_"+t+'").replaceWith(GetRuleValues("'+e+'", '+t+', jQuery(this).val())); SetRule("'+e+'", '+t+"); '>",r=[],n=0;n<form.fields.length;n++){var a=form.fields[n];if(IsConditionalLogicField(a))if(a.inputs&&-1==jQuery.inArray(GetInputType(a),["checkbox","email","consent"]))for(var s=0;s<a.inputs.length;s++){var l=a.inputs[s];l.isHidden||r.push({label:GetLabel(a,l.id),value:l.id})}else r.push({label:GetLabel(a),value:a.id})}return jQuery.merge(r,GetEntryMetaFields(i)),o+=GetRuleFieldsOptions(r=gform.applyFilters("gform_conditional_logic_fields",r,form,i),i),o+="</select>"}function GetRuleFieldsOptions(e,t){for(var i="",o=0;o<e.length;o++){var r=e[o];if(void 0!==r.options)i+='<optgroup label=" '+r.label+'">',i+=GetRuleFieldsOptions(r.options,t),i+="</optgroup>";else{var n=r.value==t?"selected='selected'":"";i+="<option value='"+r.value+"' "+n+">"+r.label+"</option>"}}return i}function GetEntryMetaFields(i){var o=[];return"undefined"==typeof entry_meta||jQuery.each(entry_meta,function(e,t){void 0!==t.filter&&o.push({label:t.label,value:e,isSelected:i==e?"selected='selected'":""})}),o}function IsConditionalLogicField(e){var t=e.inputType?e.inputType:e.type,i=GetConditionalLogicFields(),o=0<=jQuery.inArray(t,i);return o=gform.applyFilters("gform_is_conditional_logic_field",o,e)}function IsEntryMeta(e){return"undefined"!=typeof entry_meta&&void 0!==entry_meta[e]}function GetRuleValues(t,i,e,o,r){var n=0==(r=r||!1)?t+"_rule_value_"+i:r;if(0==e&&(e=GetFirstRuleField()),0==e)return"";var a=GetFieldById(e),s=IsEntryMeta(e),l=GetConditionalObject(t).conditionalLogic.rules[i].operator,c="";if(a&&"post_category"==a.type&&a.displayAllCategories){var u=jQuery("#"+n+".gfield_category_dropdown");if(0<u.length){var d=u.html();d=(d=d.replace(/ selected="selected"/g,"")).replace('value="'+o+'"','value="'+o+'" selected="selected"'),c="<select id='"+n+"' class='gfield_rule_select gfield_rule_value_dropdown gfield_category_dropdown'>"+d+"</select>"}else{var g=0==r?"gfield_ajax_placeholder_"+i:r+"_placeholder";jQuery.post(ajaxurl,{action:"gf_get_post_categories",objectType:t,ruleIndex:i,inputName:r,selectedValue:o},function(e){e&&(jQuery("#"+g).replaceWith(e.trim()),SetRuleProperty(t,i,"value",jQuery("#"+n).val()))}),c="<select id='"+g+"' class='gfield_rule_select'><option>"+gf_vars.loading+"</option></select>"}}else if(a&&a.choices&&-1<jQuery.inArray(l,["is","isnot"])){var f;"multiselect"===GetInputType(a)?f=gf_vars.emptyChoice:a.placeholder&&(f=a.placeholder),c=GetRuleValuesDropDown(f?[{text:f,value:""}].concat(a.choices):a.choices,t,i,o,r)}else c=IsAddressSelect(e,a)?(jQuery.post(ajaxurl,{action:"gf_get_address_rule_values_select",address_type:a.addressType?a.addressType:gf_vars.defaultAddressType,value:o,id:n,form_id:a.formId},function(e){e&&($select=jQuery(e.trim()),$placeholder=jQuery("#"+n),$placeholder.replaceWith($select),SetRuleProperty(t,i,"value",$select.val()))}),"<select id='"+n+"' class='gfield_rule_select'><option>"+gf_vars.loading+"</option></select>"):s&&entry_meta&&entry_meta[e]&&entry_meta[e].filter&&void 0!==entry_meta[e].filter.choices?GetRuleValuesDropDown(entry_meta[e].filter.choices,t,i,o,r):(o=o?o.replace(/'/g,"&#039;"):"","<input type='text' placeholder='"+gf_vars.enterValue+"' class='gfield_rule_select gfield_rule_input' id='"+n+"' name='"+n+"' value='"+o.replace(/'/g,"&#039;")+"' onchange='SetRuleProperty(\""+t+'", '+i+', "value", jQuery(this).val());\' onkeyup=\'SetRuleProperty("'+t+'", '+i+', "value", jQuery(this).val());\'>');return c=gform.applyFilters("gform_conditional_logic_values_input",c,t,i,e,o)}function IsAddressSelect(e,t){if(!t||"address"!=GetInputType(t))return!1;var i=t.addressType?t.addressType:gf_vars.defaultAddressType;if(!gf_vars.addressTypes[i])return!1;var o=gf_vars.addressTypes[i],r=e==t.id+".6",n=e==t.id+".4";return r&&"international"==i||n&&"object"==typeof o.states}function GetFirstRuleField(){for(var e=0;e<form.fields.length;e++)if(IsConditionalLogicField(form.fields[e]))return form.fields[e].id;return 0}function GetRuleValuesDropDown(e,t,i,o,r){for(var n=0==r?t+"_rule_value_"+i:r,a="<select class='gfield_rule_select gfield_rule_value_dropdown' id='"+n+"' name='"+n+"'>",s=!1,l=0;l<e.length;l++){var c=void 0===e[l].value||null==e[l].value?e[l].text+"":e[l].value+"",u=c==o,d=u?"selected='selected'":"";u&&(s=!0),c=c.replace(/'/g,"&#039;");var g=""===jQuery.trim(jQuery("<div>"+e[l].text+"</div>").text())?c:e[l].text;a+="<option value='"+c.replace(/'/g,"&#039;")+"' "+d+">"+g+"</option>"}return!s&&o&&""!=o&&(a+="<option value='"+o.replace(/'/g,"&#039;")+"' selected='selected'>"+o+"</option>"),a+="</select>"}function isEmpty(e){}function SetRuleProperty(e,t,i,o){var r=GetConditionalObject(e);r.conditionalLogic.rules&&(r.conditionalLogic.rules[t][i]=o)}function GetFieldById(e){e=parseInt(e);for(var t=0;t<form.fields.length;t++)if(form.fields[t].id==e)return form.fields[t];return null}function SetConditionalProperty(e,t,i){GetConditionalObject(e).conditionalLogic[t]=i}function SetRuleValueDropDown(e){var t=e.attr("id").split("_rule_value_");t.length<2||SetRuleProperty(t[0],t[1],"value",e.val())}function InsertRule(e,t){var i=GetConditionalObject(e);i.conditionalLogic.rules.splice(t,0,new ConditionalRule),CreateConditionalLogic(e,i),SetRule(e,t)}function SetRule(e,t){SetRuleProperty(e,t,"fieldId",jQuery("#"+e+"_rule_field_"+t).val()),SetRuleProperty(e,t,"operator",jQuery("#"+e+"_rule_operator_"+t).val()),SetRuleProperty(e,t,"value",jQuery("#"+e+"_rule_value_"+t).val())}function DeleteRule(e,t){var i=GetConditionalObject(e);i.conditionalLogic.rules.splice(t,1),CreateConditionalLogic(e,i)}function TruncateRuleText(e){return!e||e.length<=18?e:e.substr(0,9)+"..."+e.substr(e.length-8,9)}function gfAjaxSpinner(e,t,i){return t=void 0!==t&&t?t:gf_vars.baseUrl+"/images/spinner.svg",i=void 0!==i?i:"",this.elem=e,this.image='<img class="gfspinner" src="'+t+'" style="'+i+'" />',this.init=function(){return this.spinner=jQuery(this.image),jQuery(this.elem).after(this.spinner),this},this.destroy=function(){jQuery(this.spinner).remove()},this.init()}function InsertVariable(e,t,i){i=i||jQuery("#"+e+"_variable_select").val();var o=document.getElementById(e),r=jQuery(o);if(document.selection)r[0].focus(),document.selection.createRange().text=i;else if("selectionStart"in o){var n=o.selectionStart;o.value=o.value.substr(0,n)+i+o.value.substr(o.selectionEnd,o.value.length),o.selectionStart=n+o.value.length,o.selectionEnd=n+o.value.length}else r.val(i+messageElement.val());var a=jQuery("#"+e+"_variable_select");0<a.length&&(a[0].selectedIndex=0),t&&window[t]&&window[t].call(null,e,i)}function InsertEditorVariable(e,t){if(!t){var i=jQuery("#"+e+"_variable_select");i[0].selectedIndex=0,t=i.val()}wpActiveEditor=e,window.send_to_editor(t)}function GetInputType(e){return e.inputType?e.inputType:e.type}function HasPostField(){for(var e=0;e<form.fields.length;e++){var t=form.fields[e].type;if("post_title"==t||"post_content"==t||"post_excerpt"==t)return!0}return!1}function GetInput(e,t){if(void 0!==e.inputs&&jQuery.isArray(e.inputs))for(i in e.inputs)if(e.inputs.hasOwnProperty(i)){var o=e.inputs[i];if(o.id==t)return o}return null}function IsPricingField(e){return IsProductField(e)||"donation"==e}function IsProductField(e){return-1!=jQuery.inArray(e,["option","quantity","product","total","shipping","calculation"])}function GetLabel(e,t,i){void 0===t&&(t=0),void 0===i&&(i=!1);var o=GetInput(e,t),r="";return r=null!=e.adminLabel&&0<e.adminLabel.length?e.adminLabel:e.label,null!=o?i?o.label:r+" ("+o.label+")":r}function DeleteNotification(e){jQuery("#action_argument").val(e),jQuery("#action").val("delete"),jQuery("#notification_list_form")[0].submit()}function DuplicateNotification(e){jQuery("#action_argument").val(e),jQuery("#action").val("duplicate"),jQuery("#notification_list_form")[0].submit()}function DeleteConfirmation(e){jQuery("#action_argument").val(e),jQuery("#action").val("delete"),jQuery("#confirmation_list_form")[0].submit()}function DuplicateConfirmation(e){jQuery("#action_argument").val(e),jQuery("#action").val("duplicate"),jQuery("#confirmation_list_form")[0].submit()}function SetConfirmationConditionalLogic(){confirmation.conditionalLogic=jQuery("#conditional_logic").val()?jQuery.parseJSON(jQuery("#conditional_logic").val()):new ConditionalLogic}function ToggleConfirmation(){var e,t="",i=jQuery("#form_confirmation_redirect").is(":checked"),o=jQuery("#form_confirmation_show_page").is(":checked");i?(e=".form_confirmation_redirect_container",t="#form_confirmation_message_container, .form_confirmation_page_container",ClearConfirmationSettings(["text","page"])):o?(e=".form_confirmation_page_container",t="#form_confirmation_message_container, .form_confirmation_redirect_container",ClearConfirmationSettings(["text","redirect"])):(e="#form_confirmation_message_container",t=".form_confirmation_page_container, .form_confirmation_redirect_container",ClearConfirmationSettings(["page","redirect"])),ToggleQueryString(),TogglePageQueryString(),jQuery(t).hide(),jQuery(e).show()}function ToggleQueryString(){jQuery("#form_redirect_use_querystring").is(":checked")?jQuery("#form_redirect_querystring_container").show():(jQuery("#form_redirect_querystring_container").hide(),jQuery("#form_redirect_querystring").val(""),jQuery("#form_redirect_use_querystring").val(""))}function TogglePageQueryString(){jQuery("#form_page_use_querystring").is(":checked")?jQuery("#form_page_querystring_container").show():(jQuery("#form_page_querystring_container").hide(),jQuery("#form_page_querystring").val(""),jQuery("#form_page_use_querystring").val(""))}function ClearConfirmationSettings(e){var t=jQuery.isArray(e)?e:[e];for(i in t)if(t.hasOwnProperty(i))switch(t[i]){case"text":jQuery("#form_confirmation_message").val(""),jQuery("#form_disable_autoformatting").prop("checked",!1);break;case"page":jQuery("#form_confirmation_page").val(""),jQuery("#form_page_querystring").val(""),jQuery("#form_page_use_querystring").prop("checked",!1);break;case"redirect":jQuery("#form_confirmation_url").val(""),jQuery("#form_redirect_querystring").val(""),jQuery("#form_redirect_use_querystring").prop("checked",!1)}}function StashConditionalLogic(){var e=JSON.stringify(confirmation.conditionalLogic);jQuery("#conditional_logic").val(e)}function ConfirmationObj(){this.id=!1,this.name=gf_vars.confirmationDefaultName,this.type="message",this.message=gf_vars.confirmationDefaultMessage,this.isDefault=0}function Copy(e){if(!e)return e;if("object"!=typeof e)return e;for(i in e=jQuery.isArray(e)?e.slice():jQuery.extend({},e))e[i]=Copy(e[i]);return e}jQuery(document).ready(function(e){gaddon.init(),gform.adminUtils.handleUnsavedChanges("#gform-settings"),e(document).on("change",".gfield_rule_value_dropdown",function(){SetRuleValueDropDown(e(this))}),initMergeTagSupport(),window.form&&(window.gfMergeTags=new gfMergeTagsObj(form)),e(document).ready(function(){e(".gform_currency").bind("change",function(){FormatCurrency(this)}).each(function(){FormatCurrency(this)})})}),function(n,t){n.init=function(){f=window.form;void 0!==f&&f.id},n.toggleFeedSwitch=function(e,t){var i=window.gform_admin_i18n;t?jQuery(e).removeClass("gform-status--active").addClass("gform-status--inactive").find(".gform-status-indicator-status").html(i.formAdmin.toggleFeedInactive):jQuery(e).removeClass("gform-status--inactive").addClass("gform-status--active").find(".gform-status-indicator-status").html(i.formAdmin.toggleFeedActive)},n.toggleFeedActive=function(o,e,t){var r=jQuery(o).hasClass("gform-status--active");return jQuery.post(ajaxurl,{action:"gf_feed_is_active_"+e,feed_id:t,is_active:r?0:1,nonce:jQuery("#feed_list").val()},function(e){e.success?n.toggleFeedSwitch(o,r):(n.toggleFeedSwitch(o,!r),alert(e.data.message))}).fail(function(e,t,i){n.toggleFeedSwitch(o,!r),alert(i)}),!0},n.deleteFeed=function(e){t("#single_action").val("delete"),t("#single_action_argument").val(e),t("#gform-settings").submit()},n.duplicateFeed=function(e){t("#single_action").val("duplicate"),t("#single_action_argument").val(e),t("#gform-settings").submit()}}(window.gaddon=window.gaddon||{},jQuery);var gfMergeTagsObj=function(e,t){var m=this;m.form=e,m.elem=t,m.init=function(){m.elem.data("mergeTags")||(m.mergeTagList=jQuery('<ul id="gf_merge_tag_list" class=""></ul>'),m.mergeTagListHover=!1,m.bindKeyDown(),m.initAutocomplete(),m.addMergeTagIcon(),m.mergeTagIcon.find("a.open-list").on("click.gravityforms",function(){var e=jQuery(this),t=m.getTargetElement(e);m.mergeTagList.html(""),m.mergeTagList.append(m.getMergeTagListItems(t)),m.mergeTagList.insertAfter(e).show()}),m.mergeTagList.hover(function(){m.mergeTagListHover=!0},function(){m.mergeTagListHover=!1}),jQuery("body").mouseup(function(){m.mergeTagListHover||m.mergeTagList.hide()}),m.elem.data("mergeTags",m))},m.destroy=function(e){(e=m.elem?m.elem:e).next(".all-merge-tags").remove(),e.off("keydown.gravityforms"),e.autocomplete("destroy"),e.data("mergeTags",null)},m.bindKeyDown=function(){m.elem.on("keydown.gravityforms",function(e){var t=!(!m.elem.data("autocomplete")||!m.elem.data("autocomplete").menu)&&m.elem.data("autocomplete").menu.active;e.keyCode===jQuery.ui.keyCode.TAB&&t&&e.preventDefault()})},m.initAutocomplete=function(){m.elem.autocomplete({minLength:1,focus:function(){return!1},source:function(e,t){var i=m.extractLast(e.term);i.length<m.elem.autocomplete("option","minLength")?t([]):t(jQuery.map(m.getAutoCompleteMergeTags(m.elem),function(e){return m.startsWith(e,i)?e:null}))},select:function(e,t){var i=this.value.split(" ");return i.pop(),i.push(t.item.value),this.value=i.join(" "),m.elem.trigger("input").trigger("propertychange"),!1}})},m.addMergeTagIcon=function(){var e=m.elem.is("input")?"input":"textarea",t=m.getClassProperty(m.elem,"position");if(m.mergeTagIcon=jQuery('<span class="all-merge-tags '+t+" "+e+'"><a class="open-list tooltip-merge-tag" title="'+gf_vars.mergeTagsTooltip+'"></a></span>'),m.mergeTagIcon.data("targetElement",m.elem.attr("id")),m.getClassProperty(m.elem,"manual_position")){var i=".mt-"+m.elem.attr("id");jQuery(i).append(m.mergeTagIcon)}else m.elem.after(m.mergeTagIcon);m.mergeTagIcon.find(".tooltip-merge-tag").tooltip({show:{delay:1250},position:{my:"center bottom",at:"center-3 top-10"},content:function(){return jQuery(this).prop("title")}})},m.bindMergeTagListClick=function(e){m.mergeTagList.hide();var t=jQuery(e.target).data("value"),i=m.getTargetElement(e.target);m.isWpEditor(i)?InsertEditorVariable(i.attr("id"),t):InsertVariable(i.attr("id"),null,t),i.trigger("input").trigger("propertychange"),m.mergeTagList.hide()},this.getMergeTags=function(e,t,i,o,r,n){void 0===e&&(e=[]),void 0===o&&(o=[]);var a=[],s=[],l=[],c=[],u=[],d=[],g=[],f=[],p=[];if(i||c.push({tag:"{all_fields}",label:this.getMergeTagLabel("{all_fields}")}),!r){for(Q in e)if(e.hasOwnProperty(Q)){var m=e[Q];if(!m.displayOnly){var h=GetInputType(m);if(-1==jQuery.inArray(h,o)){if(m.isRequired)switch(h){case"name":var y,_,v,b,j=Copy(m);"extended"==m.nameFormat?(y=GetInput(m,m.id+".2"),v=GetInput(m,m.id+".8"),(b=Copy(m)).inputs=[y,v],s.push(b),delete j.inputs[0],delete j.inputs[3]):"advanced"==m.nameFormat&&(y=GetInput(m,m.id+".2"),_=GetInput(m,m.id+".4"),v=GetInput(m,m.id+".8"),(b=Copy(m)).inputs=[y,_,v],s.push(b),delete j.inputs[0],delete j.inputs[2],delete j.inputs[4]),a.push(j);break;default:a.push(m)}else s.push(m);IsPricingField(m.type)&&l.push(m)}}}if(0<a.length)for(Q in a)a.hasOwnProperty(Q)&&(u=u.concat(this.getFieldMergeTags(a[Q],n)));if(0<s.length)for(Q in s)s.hasOwnProperty(Q)&&(d=d.concat(this.getFieldMergeTags(s[Q],n)));if(0<l.length)for(Q in i||g.push({tag:"{pricing_fields}",label:this.getMergeTagLabel("{pricing_fields}")}),l)l.hasOwnProperty(Q)&&g.concat(this.getFieldMergeTags(l[Q],n))}var w=["ip","date_mdy","date_dmy","embed_post:ID","embed_post:post_title","embed_url","entry_id","entry_url","form_id","form_title","user_agent","referer","post_id","post_edit_url","user:display_name","user:user_email","user:user_login"];for(var Q in r&&(w.splice(w.indexOf("entry_id"),1),w.splice(w.indexOf("entry_url"),1),w.splice(w.indexOf("form_id"),1),w.splice(w.indexOf("form_title"),1)),HasPostField()&&!r||(w.splice(w.indexOf("post_id"),1),w.splice(w.indexOf("post_edit_url"),1)),w)-1==jQuery.inArray(w[Q],o)&&f.push({tag:"{"+w[Q]+"}",label:this.getMergeTagLabel("{"+w[Q]+"}")});var T=this.getCustomMergeTags();if(0<T.tags.length)for(Q in T.tags)if(T.tags.hasOwnProperty(Q)){var C=T.tags[Q];p.push({tag:C.tag,label:C.label})}var L={ungrouped:{label:this.getMergeGroupLabel("ungrouped"),tags:c},required:{label:this.getMergeGroupLabel("required"),tags:u},optional:{label:this.getMergeGroupLabel("optional"),tags:d},pricing:{label:this.getMergeGroupLabel("pricing"),tags:g},other:{label:this.getMergeGroupLabel("other"),tags:f},custom:{label:this.getMergeGroupLabel("custom"),tags:p}};return L=gform.applyFilters("gform_merge_tags",L,t,i,o,r,n,this)},this.getMergeTagLabel=function(e){for(groupName in gf_vars.mergeTags)if(gf_vars.mergeTags.hasOwnProperty(groupName)){var t=gf_vars.mergeTags[groupName].tags;for(i in t)if(t.hasOwnProperty(i)&&t[i].tag==e)return t[i].label}return""},this.getMergeGroupLabel=function(e){return gf_vars.mergeTags[e].label},this.getFieldMergeTags=function(e,t){void 0===t&&(t="");var o=[],r=GetInputType(e),n="list"==r?":"+t:"",a="",s="";if(-1<jQuery.inArray(r,["date","email","time","password"])&&(e.inputs=null),void 0!==e.inputs&&jQuery.isArray(e.inputs)){for(i in"checkbox"==r&&(a="{"+(s=GetLabel(e,e.id).replace("'","\\'"))+":"+e.id+n+"}",o.push({tag:a,label:s})),e.inputs)if(e.inputs.hasOwnProperty(i)){var l=e.inputs[i];"creditcard"==r&&-1<jQuery.inArray(parseFloat(l.id),[parseFloat(e.id+".2"),parseFloat(e.id+".3"),parseFloat(e.id+".5")])||(a="{"+(s=GetLabel(e,l.id).replace("'","\\'"))+":"+l.id+n+"}",o.push({tag:a,label:s}))}}else a="{"+(s=GetLabel(e).replace("'","\\'"))+":"+e.id+n+"}",o.push({tag:a,label:s});return o},m.getCustomMergeTags=function(){for(groupName in gf_vars.mergeTags)if(gf_vars.mergeTags.hasOwnProperty(groupName)&&"custom"==groupName)return gf_vars.mergeTags[groupName];return[]},this.getAutoCompleteMergeTags=function(e){var t=this.form.fields,o=e.attr("id"),r=1==this.getClassProperty(e,"hide_all_fields"),n=this.getClassProperty(e,"exclude"),a=this.getClassProperty(e,"option"),s=this.getClassProperty(e,"prepopulate");s&&(r=!0);var l=this.getMergeTags(t,o,r,n,s,a),c=[];for(group in l)if(l.hasOwnProperty(group)){var u=l[group].tags;for(i in u)u.hasOwnProperty(i)&&c.push(u[i].tag)}return c},this.getMergeTagListItems=function(e){var t=this.form.fields,o=e.attr("id"),r=1==this.getClassProperty(e,"hide_all_fields"),n=this.getClassProperty(e,"exclude"),a=this.getClassProperty(e,"prepopulate"),s=this.getClassProperty(e,"option");a&&(r=!0);var l=this.getMergeTags(t,o,r,n,a,s),c=this.hasMultipleGroups(l),u=[];for(group in l)if(l.hasOwnProperty(group)){var d=l[group].label,g=l[group].tags;if(!(g.length<=0))for(i in d&&c&&u.push(jQuery('<li class="group-header">'+d+"</li>")),g)if(g.hasOwnProperty(i)){var f=g[i],p=(d=gform.tools.stripSlashes(f.label),jQuery('<a class="" data-value="'+escapeAttr(f.tag)+'">'+escapeHtml(d)+"</a>"));p.on("click.gravityforms",m.bindMergeTagListClick),u.push(jQuery("<li></li>").html(p))}}return u},this.hasMultipleGroups=function(e){var t=0;for(group in e)e.hasOwnProperty(group)&&0<e[group].tags.length&&t++;return 1<t},m.getClassProperty=function(e,t){var o=(e=jQuery(e)).attr("class");if(!o)return"";var r=o.split(" ");for(i in r)if(r.hasOwnProperty(i)){var n=r[i].split("-");if("mt"==n[0]&&n[1]==t)return 3<n.length?(delete n[0],delete n[1],n):2==n.length||n[2]}return""},m.getTargetElement=function(e){var t=(e=jQuery(e)).parents("span.all-merge-tags").data("targetElement");return jQuery("#"+t.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g,"\\$&"))},m.isWpEditor=function(e){e=jQuery(e);return 1==this.getClassProperty(e,"wp_editor")},m.split=function(e){return e.split(" ")},m.extractLast=function(e){return this.split(e).pop()},m.startsWith=function(e,t){return 0===e.indexOf(t)},m.elem&&m.init()},FeedConditionObj=function(e){this.strings=isSet(e.strings)?e.strings:{},this.logicObject=e.logicObject,this.init=function(){gform.addFilter("gform_conditional_object","FeedConditionConditionalObject"),gform.addFilter("gform_conditional_logic_description","FeedConditionConditionalDescription"),jQuery(document).ready(function(){ToggleConditionalLogic(!0,"feed_condition")})},this.init()};function SimpleConditionObject(e,t){if(t.indexOf("simple_condition")<0)return e;var i=t.substring(17)+"_object";return window[i]}function FeedConditionConditionalObject(e,t){return"feed_condition"!=t?e:feedCondition.logicObject}function FeedConditionConditionalDescription(e,t,i,o){return"feed_condition"!=i?e:(t.actionType=t.actionType.replace("<select",'<select style="display:none;"'),t.objectDescription=feedCondition.strings.objectDescription,makeArray(t).join(" "))}function makeArray(e){var t=[];for(i in e)t.push(e[i]);return t}function isSet(e){return void 0!==e}jQuery(document).ready(function(){var e=jQuery(".gform-form-toolbar__form-title span:not(.gform-dropdown__trigger-text):not(.gform-dropdown__control-text):not(.gform-visually-hidden)");if(e){var t=e.clone().css({display:"inline",width:"auto",visibility:"hidden"}).appendTo(e);t.width()>e.width()&&jQuery(".gform-form-toolbar__form-title span").tooltip({position:{my:"left center",at:"right+6 center"},tooltipClass:"arrow-left"}),t.remove()}});var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeAttr(e){return String(e).replace(/["']/g,function(e){return entityMap[e]})}function escapeHtml(e){return String(e).replace(/[&<>"'`=\/]/g,function(e){return entityMap[e]})}var gform=window.gform||{};gform.components={},gform.components.dropdown=function(e){this.el=null,this.control=null,this.controlText=null,this.triggers=[],this.state={open:!1,unloading:!1},this.options={closeOnSelect:!0,container:document,detectTitleLength:!1,onItemSelect:function(){},reveal:"click",selector:"",showSpinner:!1,swapLabel:!0,titleLengthThresholdMedium:23,titleLengthThresholdLong:32},this.options=gform.tools.mergeObjects(this.options,gform.tools.defaultFor(e,{})),this.el=gform.tools.getNodes(this.options.selector,!1,this.options.container)[0],this.el?(this.titleEl=gform.tools.getNodes("gform-dropdown-control-text",!1,this.el)[0],this.storeTriggers(),this.bindEvents(),this.setupUI(),this.hideSpinner=function(){this.el.classList.remove("gform-dropdown--show-spinner")},this.showSpinner=function(){this.el.classList.add("gform-dropdown--show-spinner")}):gform.console.error("Gform dropdown couldn't find [data-js=\""+this.options.selector+'"] to instantiate on.')},gform.components.dropdown.prototype.handleChange=function(e){this.options.onItemSelect(e.target.dataset.value),this.options.showSpinner&&this.showSpinner(),this.options.swapLabel&&(this.controlText.innerText=e.target.innerText),this.options.closeOnSelect&&this.handleControl()},gform.components.dropdown.prototype.handleControl=function(){this.state.open?this.closeDropdown():this.openDropdown()},gform.components.dropdown.prototype.openDropdown=function(){this.state.open||(this.el.classList.add("gform-dropdown--reveal"),setTimeout(function(){this.el.classList.add("gform-dropdown--open"),this.control.setAttribute("aria-expanded","true"),this.state.open=!0}.bind(this),25),setTimeout(function(){this.el.classList.remove("gform-dropdown--reveal")}.bind(this),200))},gform.components.dropdown.prototype.closeDropdown=function(){this.state.open=!1,this.el.classList.remove("gform-dropdown--open"),this.el.classList.add("gform-dropdown--hide"),this.control.setAttribute("aria-expanded","false"),setTimeout(function(){this.el.classList.remove("gform-dropdown--hide")}.bind(this),150)},gform.components.dropdown.prototype.handleMouseenter=function(){"hover"!==this.options.reveal||this.state.open||this.state.unloading||this.openDropdown()},gform.components.dropdown.prototype.handleMouseleave=function(e){"hover"!==this.options.reveal||this.state.unloading||this.closeDropdown()},gform.components.dropdown.prototype.handleA11y=function(e){if(this.state.open)return 27===e.keyCode?(this.closeDropdown(),void this.control.focus()):void(9!==e.keyCode||gform.tools.getClosest(e.target,'[data-js="'+this.options.selector+'"]')||this.triggers[0].focus())},gform.components.dropdown.prototype.handleSearch=function(e){var t=e.target.value.toLowerCase();this.triggers.forEach(function(e){e.innerText.toLowerCase().includes(t)?e.parentNode.style.display="":e.parentNode.style.display="none"})},gform.components.dropdown.prototype.setupUI=function(){if("hover"===this.options.reveal&&this.el.classList.add("gform-dropdown--hover"),this.options.detectTitleLength){var e=this.titleEl?this.titleEl.innerText:"";e.length>this.options.titleLengthThresholdMedium&&e.length<=this.options.titleLengthThresholdLong?this.el.parentNode.classList.add("gform-dropdown--medium-title"):e.length>this.options.titleLengthThresholdLong&&this.el.parentNode.classList.add("gform-dropdown--long-title")}},gform.components.dropdown.prototype.storeTriggers=function(){this.control=gform.tools.getNodes("gform-dropdown-control",!1,this.el)[0],this.controlText=gform.tools.getNodes("gform-dropdown-control-text",!1,this.control)[0],this.triggers=gform.tools.getNodes("gform-dropdown-trigger",!0,this.el)},gform.components.dropdown.prototype.bindEvents=function(){gform.tools.delegate('[data-js="'+this.options.selector+'"]',"click",'[data-js="gform-dropdown-trigger"], [data-js="gform-dropdown-trigger"] > span',this.handleChange.bind(this)),gform.tools.delegate('[data-js="'+this.options.selector+'"]',"click",'[data-js="gform-dropdown-trigger"]',this.handleChange.bind(this)),gform.tools.delegate('[data-js="'+this.options.selector+'"]',"click",'[data-js="gform-dropdown-control"], [data-js="gform-dropdown-control"] *',this.handleControl.bind(this)),gform.tools.delegate('[data-js="'+this.options.selector+'"]',"keyup",'[data-js="gform-dropdown-search"]',this.handleSearch.bind(this)),this.el.addEventListener("mouseenter",this.handleMouseenter.bind(this)),this.el.addEventListener("mouseleave",this.handleMouseleave.bind(this)),this.el.addEventListener("keyup",this.handleA11y.bind(this)),document.addEventListener("keyup",this.handleA11y.bind(this)),document.addEventListener("click",function(e){!this.el.contains(e.target)&&this.state.open&&this.handleControl()}.bind(this)),addEventListener("beforeunload",function(){this.state.unloading=!0}.bind(this))},gform.components.alert={instances:[],getInstance:function(t){return gform.components.alert.instances.filter(function(e){return e.id===t.getAttribute("data-gform-alert-instance")})[0]},initializeInstance:function(e){if(!e.hasAttribute("data-gform-alert-instance")){var t=gform.tools.uniqueId("gform-alert"),i=e.hasAttribute("data-gform-alert-cookie")?e.getAttribute("data-gform-alert-cookie"):"";e.setAttribute("data-gform-alert-instance",t),e.classList.add("gform-initialized"),gform.components.alert.instances.push({id:t,cookie:i})}},initializeInstances:function(){gform.tools.getNodes('[data-js="gform-alert"]:not(.gform-initialized)',!0,document,!0).forEach(gform.components.alert.initializeInstance)},dismissAlert:function(e){var t=gform.tools.getClosest(e.target,'[data-js="gform-alert"]'),i=gform.components.alert.getInstance(t);t.style.display="none",i.cookie&&gform.tools.setCookie(i.cookie,form.id,1,!0)},bindEvents:function(){document.addEventListener("gform_init_alerts",gform.components.alert.initializeInstances),gform.tools.delegate("body","click",'[data-js="gform-alert-dismiss-trigger"]',gform.components.alert.dismissAlert)},init:function(){gform.components.alert.bindEvents(),gform.components.alert.initializeInstances()}},gform.initializeOnLoaded(gform.components.alert.init),gform.simplebar={instances:[],cleanInstances:function(){gform.simplebar.instances=gform.simplebar.instances.filter(function(e,t){return!!gform.tools.getNodes('[data-simplebar-instance="'+e.id+'"]',!1,document,!0)[0]||(gform.simplebar.instances[t].instance.unMount(),!1)})},getInstance:function(t){return gform.simplebar.instances.filter(function(e){return e.id===t.getAttribute("data-simplebar-instance")})[0].instance},initializeInstance:function(i){if(!i.hasAttribute("data-simplebar-instance")){var o=gform.tools.uniqueId("simplebar"),e=i.getAttribute("data-simplebar-delay"),t=e?parseInt(e,10):0;setTimeout(function(){var e=gform.tools.isRtl()?"rtl":"ltr";"rtl"==e&&i.setAttribute("data-simplebar-direction","rtl"),i.setAttribute("data-simplebar-instance",o),i.classList.add("gform-initialized");var t=new SimpleBar(i,{direction:e});gform.simplebar.instances.push({id:o,instance:t})},t)}},initializeInstances:function(){gform.simplebar.cleanInstances(),gform.tools.getNodes('[data-js="gform-simplebar"]:not(.gform-initialized)',!0,document,!0).forEach(gform.simplebar.initializeInstance)},bindEvents:function(){document.addEventListener("gform_render_simplebars",gform.simplebar.initializeInstances)},init:function(){window.SimpleBar&&(gform.simplebar.bindEvents(),gform.simplebar.initializeInstances())}},gform.initializeOnLoaded(gform.simplebar.init);