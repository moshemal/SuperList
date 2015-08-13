define(['kendo', 'text!./templates/WindowCreateList.html'], 
	function(undefined, template){
	var windowHtml = $(template);
		$("#windowButton").append(windowHtml);
		
		
		 var wnd = $("#window");
          

		  //create a button of plus
		  $(".open-button").kendoButton({
		  spriteCssClass: "k-icon k-i-plus"
		  });
		  
		  
		  
		  var buttonOpen = $(".open-button");
		  buttonOpen.data("kendoButton");
		  
          buttonOpen.bind("click", function() {
            wnd.data("kendoWindow");
			wnd.open();
            $(this).hide();
          });

          $(".close-button").click(function(){
            // call 'close' method on nearest kendoWindow
            $(this).closest("[data-role=window]").kendoWindow("close");
          });//

		  
		 
          if (!wnd.data("kendoWindow")) {
            wnd.kendoWindow({
			
              modal: true,
			  width: "505px",
              title: "Craete New List",
              close: function() {
                $(".open-button").show();
              },
              visible: false
            });
			wnd.data("kendoWindow").center();
			
          }
        });
		
		
		