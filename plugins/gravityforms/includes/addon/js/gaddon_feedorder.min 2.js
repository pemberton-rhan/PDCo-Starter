var GFFeedOrder=function(e){var o=this,i=jQuery;o.init=function(){o.options=e;i(".wp-list-table thead tr, .wp-list-table tfoot tr").append('<th class="sort-column"></th>'),i(".wp-list-table tbody tr").append('<td class="sort-column"><i class="gform-icon gform-icon--drag-indicator feed-sort-handle"></i></td>'),o.initSorting()},o.initSorting=function(){i(".wp-list-table tbody").sortable({cursor:"move",handle:".feed-sort-handle",placeholder:"feed-placeholder",tolerance:"pointer",create:function(){i(".wp-list-table").addClass("feed-list-sortable")},helper:o.fixSortableColumnWidths,start:o.setPlaceholderHeight,update:o.updateFeedOrder})},o.fixSortableColumnWidths=function(e,t){var o=t.children(),t=t.clone();return t.children().each(function(e){i(this).width(o.eq(e).width())}),t},o.getFeedOrder=function(){return i('.wp-list-table tbody .check-column input[type="checkbox"]').map(function(){return i(this).val()}).get()},o.setPlaceholderHeight=function(e,t){i(".wp-list-table .feed-placeholder").height(t.item.height())},o.updateFeedOrder=function(e,t){i.ajax(ajaxurl,{method:"POST",dataType:"JSON",data:{action:"gf_save_feed_order",addon:o.options.addon,form_id:o.options.formId,feed_order:o.getFeedOrder(),nonce:o.options.nonce}})},this.init()};