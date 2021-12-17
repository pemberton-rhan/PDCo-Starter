!function(){var e=acf.FieldSetting.extend({type:"repeater",name:"collapsed",events:{"focus select":"onFocus"},onFocus:function(e,t){var i=t,a=[];a.push({label:i.find('option[value=""]').text(),value:""});t=this.fieldObject.$(".acf-field-list:first");acf.getFieldObjects({list:t}).map(function(e){a.push({label:e.prop("label"),value:e.prop("key")})}),acf.renderSelect(i,a)}});acf.registerFieldSetting(e)}(jQuery),function(t){var e=acf.FieldSetting.extend({type:"flexible_content",name:"fc_layout",events:{"blur .layout-label":"onChangeLabel","click .add-layout":"onClickAdd","click .duplicate-layout":"onClickDuplicate","click .delete-layout":"onClickDelete"},$input:function(e){return t("#"+this.getInputId()+"-"+e)},$list:function(){return this.$(".acf-field-list:first")},getInputId:function(){return this.fieldObject.getInputId()+"-layouts-"+this.field.get("id")},getFields:function(){return acf.getFieldObjects({parent:this.$el})},getChildren:function(){return acf.getFieldObjects({list:this.$list()})},initialize:function(){var e=this.$el.parent();e.hasClass("ui-sortable")||e.sortable({items:"> .acf-field-setting-fc_layout",handle:".reorder-layout",forceHelperSize:!0,forcePlaceholderSize:!0,scroll:!0,stop:this.proxy(function(e,t){this.fieldObject.save()})}),this.updateFieldLayouts()},updateFieldLayouts:function(){this.getChildren().map(this.updateFieldLayout,this)},updateFieldLayout:function(e){e.prop("parent_layout",this.get("id"))},onChangeLabel:function(e,t){var i=t.val(),t=this.$input("name");""==t.val()&&acf.val(t,acf.strSanitize(i))},onClickAdd:function(e,t){var i=this.get("id"),a=acf.uniqid("layout_");$layout=acf.duplicate({$el:this.$el,search:i,replace:a,after:function(e,t){var i=t.find(".acf-field-list:first");i.children(".acf-field-object").remove(),i.addClass("-empty"),t.find(".acf-fc-meta input").val("")}}),acf.getFieldSetting($layout).$input("key").val(a),this.fieldObject.save()},onClickDuplicate:function(e,t){var i=this.get("id"),a=acf.uniqid("layout_");$layout=acf.duplicate({$el:this.$el,search:i,replace:a});i=acf.getFieldObjects({parent:$layout});i.length&&(i.map(function(e){e.wipe(),e.updateParent()}),acf.doAction("duplicate_field_objects",i,this.fieldObject,this.fieldObject)),acf.getFieldSetting($layout).$input("key").val(a),this.fieldObject.save()},onClickDelete:function(e,t){if(e.shiftKey)return this.delete();this.$el.addClass("-hover");acf.newTooltip({confirmRemove:!0,target:t,context:this,confirm:function(){this.delete()},cancel:function(){this.$el.removeClass("-hover")}})},delete:function(){if(!this.$el.siblings(".acf-field-setting-fc_layout").length)return alert(acf.__("Flexible Content requires at least 1 layout")),!1;this.getFields().map(function(e){e.delete({animate:!1})}),acf.remove(this.$el),this.fieldObject.save()}});acf.registerFieldSetting(e);new acf.Model({actions:{sortstop_field_object:"updateParentLayout",change_field_object_parent:"updateParentLayout"},updateParentLayout:function(e){var t=e.getParent();t&&"flexible_content"===t.prop("type")?(t=e.$el.closest(".acf-field-setting-fc_layout"),t=acf.getFieldSetting(t),e.has("parent_layout")||e.prop("parent_layout",0),e.prop("parent_layout",t.get("id"))):e.prop("parent_layout",null)}})}(jQuery),function(e){var t=acf.FieldSetting.extend({type:"clone",name:"display",render:function(){var e=this.field.val();this.$fieldObject.attr("data-display",e)}});acf.registerFieldSetting(t);t=acf.FieldSetting.extend({type:"clone",name:"prefix_label",render:function(){var e="";this.field.val()&&(e=this.fieldObject.prop("label")+" "),this.$("code").html(e+"%field_label%")}});acf.registerFieldSetting(t);t=acf.FieldSetting.extend({type:"clone",name:"prefix_name",render:function(){var e="";this.field.val()&&(e=this.fieldObject.prop("name")+"_"),this.$("code").html(e+"%field_name%")}});acf.registerFieldSetting(t);new acf.Model({filters:{select2_args:"select2Args"},select2Args:function(e,t,i,a,l){return"acf/fields/clone/query"==i.ajaxAction&&(e.closeOnSelect=!1,l.data.ajaxData=this.ajaxData),e},ajaxData:function(t){return t.fields={},acf.getFieldObjects().map(function(e){t.fields[e.prop("key")]={key:e.prop("key"),type:e.prop("type"),label:e.prop("label"),ancestors:e.getParents().length}}),t.title=e("#title").val(),t}})}(jQuery);