!function(t,s){s(document).ready(function(){t.init()});var o,e,c,i,r,l,u=!1;function a(){s("#gform-lock-request-status").html(c.noResponse),s("#gform-lock-request-button").attr("disabled",!1).text(c.requestAgain),l=!!(u=!1),wp.heartbeat.interval(30)}t.init=function(){i=gflockingVars.hasLock,o=gflockingVars.objectID,e=gflockingVars.objectType,r=gflockingVars.lockUI,c=gflockingVars.strings,function(){wp.heartbeat.interval(30),s("#wpwrap").append(r);var n="gform-refresh-lock-"+e,a="gform-request-lock-"+e;s(document).on("heartbeat-send."+n,function(t,e){var r={};o&&s("#gform-lock-dialog").length&&0!=i&&(r.objectID=o,e[n]=r)}),s(document).on("heartbeat-send."+a,function(t,e){var r={};if(!u)return e;r.objectID=o,e[a]=r}),s(document).on("heartbeat-tick."+n,function(t,e){var r,o,a,c;if(e[n]&&((r=e[n]).lock_error||r.lock_request)){if(c=r.lock_error?r.lock_error:r.lock_request,!(o=s("#gform-lock-dialog")).length)return;o.is(":visible")?r.lock_error?s("#gform-reject-lock-request-button").is(":visible")&&(r.lock_error.avatar_src&&(a=s('<img class="avatar avatar-64 photo" width="64" height="64" />').attr("src",r.lock_error.avatar_src.replace(/&amp;/g,"&")),o.find("div.gform-locked-avatar").empty().append(a)),s("#gform-reject-lock-request-button").hide(),o.show().find(".currently-editing").text(r.lock_error.text)):r.lock_request&&s("#gform-lock-request-status").html(r.lock_request.text):(c.avatar_src&&(a=s('<img class="avatar avatar-64 photo" width="64" height="64" />').attr("src",c.avatar_src.replace(/&amp;/g,"&")),o.find("div.gform-locked-avatar").empty().append(a)),o.show().find(".currently-editing").text(c.text),r.lock_request?s("#gform-reject-lock-request-button").show():s("#gform-reject-lock-request-button").hide(),o.find(".wp-tab-first").focus())}}),s(document).on("heartbeat-tick."+a,function(t,e){var r,o;if(e[a]&&(r=e[a]).status){if(o=r.status,!s("#gform-lock-dialog").length)return;switch("pending"!=o&&(clearTimeout(l),u=l=!1),o){case"granted":s("#gform-lock-request-status").html(c.gainedControl),s("#gform-take-over-button").show(),s("#gform-lock-request-button").hide(),i=!0;break;case"deleted":s("#gform-lock-request-button").text(c.requestAgain).attr("disabled",!1),s("#gform-lock-request-status").html(c.rejected);break;case"pending":s("#gform-lock-request-status").html(c.pending)}}})}(),s("#gform-lock-request-button").click(function(){var t=s(this);t.text("Request sent"),t.attr("disabled",!0),s("#gform-lock-request-status").html(""),u=!!1,wp.heartbeat.interval(5),l=setTimeout(a,12e4),s.getJSON(ajaxurl,{action:"gf_lock_request_"+e,object_id:o}).done(function(t){s("#gform-lock-request-status").html(t.html)}).fail(function(t,e,r){var o=e+", "+r;s("#gform-lock-request-status").html(c.requestError+": "+o)})}),s("#gform-reject-lock-request-button").click(function(){s.getJSON(ajaxurl,{action:"gf_reject_lock_request_"+e,object_id:o,object_type:e}).done(function(t){s("#gform-lock-dialog").hide()}).fail(function(t,e,r){var o=e+", "+r;s("#gform-lock-request-status").html(c.requestError+": "+o),s("#gform-lock-dialog").hide()})})}}(window.gflocking=window.gflocking||{},jQuery);