!function(t,n){n(document).ready(function(){t.init()});var o,e,s,i,r,l,u=!1;function a(){n("#gform-lock-request-status").html(s.noResponse),n("#gform-lock-request-button").attr("disabled",!1).text(s.requestAgain),l=!!(u=!1),wp.heartbeat.interval(30)}t.init=function(){i=gflockingVars.hasLock,o=gflockingVars.objectID,e=gflockingVars.objectType,r=gflockingVars.lockUI,s=gflockingVars.strings,function(){wp.heartbeat.interval(30),n("#wpwrap").append(r);var c="gform-refresh-lock-"+e,a="gform-request-lock-"+e;n(document).on("heartbeat-send."+c,function(t,e){var r={};o&&n("#gform-lock-dialog").length&&0!=i&&(r.objectID=o,e[c]=r)}),n(document).on("heartbeat-send."+a,function(t,e){var r={};if(!u)return e;r.objectID=o,e[a]=r}),n(document).on("heartbeat-tick."+c,function(t,e){var r,o,a;e[c]&&((r=e[c]).lock_error||r.lock_request)&&(a=r.lock_error||r.lock_request,(e=n("#gform-lock-dialog")).length&&(e.is(":visible")?r.lock_error?n("#gform-reject-lock-request-button").is(":visible")&&(r.lock_error.avatar_src&&(o=n('<img class="avatar avatar-64 photo" width="64" height="64" />').attr("src",r.lock_error.avatar_src.replace(/&amp;/g,"&")),e.find("div.gform-locked-avatar").empty().append(o)),n("#gform-reject-lock-request-button").hide(),e.show().find(".currently-editing").text(r.lock_error.text)):r.lock_request&&n("#gform-lock-request-status").html(r.lock_request.text):(a.avatar_src&&(o=n('<img class="avatar avatar-64 photo" width="64" height="64" />').attr("src",a.avatar_src.replace(/&amp;/g,"&")),e.find("div.gform-locked-avatar").empty().append(o)),e.show().find(".currently-editing").text(a.text),r.lock_request?n("#gform-reject-lock-request-button").show():n("#gform-reject-lock-request-button").hide(),e.find(".wp-tab-first").focus())))}),n(document).on("heartbeat-tick."+a,function(t,e){var r,o;if(e[a]&&(r=e[a]).status&&(o=r.status,n("#gform-lock-dialog").length))switch("pending"!=o&&(clearTimeout(l),u=l=!1),o){case"granted":n("#gform-lock-request-status").html(s.gainedControl),n("#gform-take-over-button").show(),n("#gform-lock-request-button").hide(),i=!0;break;case"deleted":n("#gform-lock-request-button").text(s.requestAgain).attr("disabled",!1),n("#gform-lock-request-status").html(s.rejected);break;case"pending":n("#gform-lock-request-status").html(s.pending)}})}(),n("#gform-lock-request-button").click(function(){var t=n(this);t.text("Request sent"),t.attr("disabled",!0),n("#gform-lock-request-status").html(""),u=!!1,wp.heartbeat.interval(5),l=setTimeout(a,12e4),n.getJSON(ajaxurl,{action:"gf_lock_request_"+e,object_id:o}).done(function(t){n("#gform-lock-request-status").html(t.html)}).fail(function(t,e,r){r=e+", "+r;n("#gform-lock-request-status").html(s.requestError+": "+r)})}),n("#gform-reject-lock-request-button").click(function(){n.getJSON(ajaxurl,{action:"gf_reject_lock_request_"+e,object_id:o,object_type:e}).done(function(t){n("#gform-lock-dialog").hide()}).fail(function(t,e,r){r=e+", "+r;n("#gform-lock-request-status").html(s.requestError+": "+r),n("#gform-lock-dialog").hide()})})}}(window.gflocking=window.gflocking||{},jQuery);