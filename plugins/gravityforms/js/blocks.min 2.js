!function(e){var t={};function r(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(o,a,function(t){return e[t]}.bind(null,a));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){},function(e,t,r){"use strict";r.r(t);r(0);var o=React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 508.3 559.5",width:"100%",height:"100%",focusable:"false","aria-hidden":"true",className:"dashicon dashicon-gravityforms"},React.createElement("g",null,React.createElement("path",{className:"st0",d:"M468,109.8L294.4,9.6c-22.1-12.8-58.4-12.8-80.5,0L40.3,109.8C18.2,122.6,0,154,0,179.5V380\tc0,25.6,18.1,56.9,40.3,69.7l173.6,100.2c22.1,12.8,58.4,12.8,80.5,0L468,449.8c22.2-12.8,40.3-44.2,40.3-69.7V179.6\tC508.3,154,490.2,122.6,468,109.8z M399.3,244.4l-195.1,0c-11,0-19.2,3.2-25.6,10c-14.2,15.1-18.2,44.4-19.3,60.7H348v-26.4h49.9\tv76.3H111.3l-1.8-23c-0.3-3.3-5.9-80.7,32.8-121.9c16.1-17.1,37.1-25.8,62.4-25.8h194.7V244.4z"})));const{PanelBody:a,Placeholder:l,SelectControl:n,TextControl:s,TextareaControl:i,ToggleControl:c,ToolbarButton:m,Tooltip:f}=wp.components,{InspectorControls:d,BlockControls:g}=wp.hasOwnProperty("blockEditor")?wp.blockEditor:wp.editor,{Component:u,Fragment:p}=wp.element,{__:b}=wp.i18n,{addQueryArgs:v}=wp.url;let{ServerSideRender:h}=wp.components;wp.hasOwnProperty("serverSideRender")&&(h=wp.serverSideRender);class y extends u{constructor(){super(...arguments),this.state={formWasDeleted:!1},this.setFormId=this.setFormId.bind(this);const{formId:e}=this.props.attributes;if(e){const t=y.getForm(e);t?t&&t.hasConditionalLogic&&this.props.setAttributes({formPreview:!1}):(this.props.setAttributes({formId:""}),this.state={formWasDeleted:!0})}}componentWillUnmount(){this.unmounting=!0}setFormId(e){let t=y.getForm(e);this.props.setAttributes({formId:e}),this.setState({formWasDeleted:!1}),t&&t.hasConditionalLogic&&this.props.setAttributes({formPreview:!1})}static getForm(e){return gform_block_form.forms.find(t=>t.id==e)}static getFormOptions(){let e=[{label:b("Select a Form","gravityforms"),value:""}];for(let t=0;t<gform_block_form.forms.length;t++){let r=gform_block_form.forms[t];e.push({label:r.title,value:r.id})}return e}openAdminPage(e,t){e.preventDefault();const r=v(gform_block_form.adminURL,t);window.open(r,"_blank","noopener")}externalControls(){let{formId:e}=this.props.attributes;if(!e)return null;const t={page:"gf_edit_forms",id:e},r={page:"gf_edit_forms",id:e,view:"settings"};return React.createElement(g,{key:"gform-block-custom-controls"},React.createElement(m,{key:"gform-block-edit-form-buttton",title:b("Edit Form","gravityforms"),onClick:e=>{this.openAdminPage(e,t)},className:"gform-block__toolbar-button"},React.createElement(f,{text:b("Edit Form","gravityforms")},React.createElement("i",{className:"gform-icon gform-icon--create"}))),React.createElement(m,{key:"gform-block-form-settings-button",label:b("Form Settings","gravityforms"),title:b("Form Settings","gravityforms"),onClick:e=>{this.openAdminPage(e,r)},className:"gform-block__toolbar-button"},React.createElement(f,{text:b("Form Settings","gravityforms")},React.createElement("i",{className:"gform-icon gform-icon--cog"}))))}render(){let{formId:e,title:t,description:r,ajax:m,tabindex:f,formPreview:g,fieldValues:u,imgPreview:v}=this.props.attributes;const{setAttributes:_,isSelected:k}=this.props,E=e=>this.setFormId(e.target.value);if(v)return React.createElement(p,null,React.createElement("img",{src:gform_block_form.preview,style:{margin:"0 auto",display:"block"}}));const R=[this.externalControls(),k&&gform_block_form.forms&&gform_block_form.forms.length>0&&React.createElement(d,{key:"inspector"},React.createElement(a,{title:b("Form Settings","gravityforms")},React.createElement(n,{label:b("Form","gravityforms"),value:e,options:y.getFormOptions(),onChange:this.setFormId}),e&&React.createElement(c,{label:b("Form Title","gravityforms"),checked:t,onChange:()=>_({title:!t})}),e&&React.createElement(c,{label:b("Form Description","gravityforms"),checked:r,onChange:()=>_({description:!r})})),e&&React.createElement(a,{title:b("Advanced","gravityforms"),initialOpen:!1,className:"gform-block__panel"},e&&!y.getForm(e).hasConditionalLogic&&React.createElement(c,{label:b("Preview","gravityforms"),checked:g,onChange:()=>_({formPreview:!g})}),React.createElement(c,{label:b("AJAX","gravityforms"),checked:m,onChange:()=>_({ajax:!m})}),React.createElement(i,{label:b("Field Values","gravityforms"),value:u,onChange:e=>{_({fieldValues:e})}}),React.createElement(s,{className:"gform-block__tabindex",label:b("Tabindex","gravityforms"),type:"number",value:f,onChange:e=>_({tabindex:e}),placeholder:"-1"}),React.createElement(p,null,"Form ID: ",e)))];if(!e||!g){const{formWasDeleted:t}=this.state;return[R,t&&React.createElement("div",{className:"gform-block__alert gform-block__alert-error"},React.createElement("p",null,b("The selected form has been deleted or trashed. Please select a new form.","gravityforms"))),React.createElement(l,{key:"placeholder",className:"wp-block-embed gform-block__placeholder"},React.createElement("div",{className:"gform-block__placeholder-brand"},React.createElement("div",{className:"gform-icon"},o),React.createElement("p",null,React.createElement("strong",null,"Gravity Forms"))),gform_block_form.forms&&gform_block_form.forms.length>0&&React.createElement("form",null,React.createElement("select",{value:e,onChange:E},y.getFormOptions().map(e=>React.createElement("option",{key:e.value,value:e.value},e.label)))),(!gform_block_form.forms||gform_block_form.forms&&0===gform_block_form.forms.length)&&React.createElement("form",null,React.createElement("p",null,b("You must have at least one form to use the block.","gravityforms"))))]}return[R,React.createElement(h,{key:"form_preview",block:"gravityforms/form",attributes:this.props.attributes})]}}var _=y;const{__:k}=wp.i18n,{registerBlockType:E}=wp.blocks;E("gravityforms/form",{title:k("Gravity Forms","gravityforms"),description:k("Select and display one of your forms.","gravityforms"),category:"embed",supports:{customClassName:!1,className:!1,html:!1},keywords:["gravity forms","newsletter","contact"],example:{attributes:{imgPreview:!0}},attributes:{formId:{type:"string"},title:{type:"boolean",default:!0},description:{type:"boolean",default:!0},ajax:{type:"boolean",default:!1},tabindex:{type:"string"},fieldValues:{type:"string"},formPreview:{type:"boolean",default:!0},imgPreview:{type:"boolean",default:!1}},icon:o,transforms:{from:[{type:"shortcode",tag:["gravityform","gravityforms"],attributes:{formId:{type:"string",shortcode:({named:{id:e}})=>parseInt(e).toString()},title:{type:"boolean",shortcode:({named:{title:e}})=>"true"===e},description:{type:"boolean",shortcode:({named:{description:e}})=>"true"===e},ajax:{type:"boolean",shortcode:({named:{ajax:e}})=>"true"===e},tabindex:{type:"string",shortcode:({named:{tabindex:e}})=>isNaN(e)?null:parseInt(e).toString()}}}]},edit:_,save:()=>null})}]);