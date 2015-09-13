define(['jquery', 'text!./templates/WindowCreateList.html', 'kendo'], 
	
	function($, NewTask){
		'use strict';
	//console.log($);
	
	function getJButton(type){
		var buttonHtml;
		switch (type){
			case "buttonPlus":  buttonHtml = $(NewTask); //
									break;
			default:    buttonHtml = $(NewTask);
		}
		return $(buttonHtml);
	}

	//first step
	function createButton(type, selector){ //for now its "NewTask", "#newList"
		var jButton = getJButton(type); //will return WindowCreateList.html
		var container = $(selector); //"#newList"
		container.css({
			width: "100%",
			height: "100%"
		});
		
		jButton.appendTo(selector);
		
		$(".open-button").kendoButton({
		  spriteCssClass: "k-icon k-i-plus"
		  });
		  
		   var wndHtml = $("#window");
		  
		  var buttonOpen = $(".open-button").data("kendoButton");
		  
          buttonOpen.bind("click", function() {
            wndHtml.data("kendoWindow").open();
            $(this).hide();
          });

          $(".close-button").click(function(){
             //call 'close' method on nearest kendoWindow
            $(this).closest("[data-role=window]").kendoWindow("close");
          });//

		  
		 
		 //create Window
    
	if (!wndHtml.data("kendoWindow")) {
            wndHtml.kendoWindow({
			
              modal: true,
			  width: "505px",
              title: "Create New List",
              close: function() {
                $(".open-button").show();
              },
              visible: false
            });
			wndHtml.data("kendoWindow").center();
			
         }	


		 
	}//end create Button Plus

	
	
	
	
	
	
	
	
	return {
		createButton: createButton
	}
});

       