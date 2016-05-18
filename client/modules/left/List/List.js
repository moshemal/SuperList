define(['jquery','text!./List.html','core/request','kendo'],
function($, template,request){
'use strict';


var updateFunctions = [] ;
var listView = $(template);



var  createListView = function(selector){
        $("<h1>List</h1>").appendTo(selector);
		listView.appendTo(selector);
        
        listView.kendoListView({
            template: '<div class="listView"><span class="title">#:title#</span><button></button><p>#:count#</p></div>',
            selectable: true,
            change: function(){
                var select = this.select();
                for(var i=0; i<updateFunctions.length; i++){
                    updateFunctions[i]($(select[0]).find(".title").html());
                }
            }
        });

        getAllListView();	
    };

var getAllListView = function(listName){
	
	var promise = request.getAllLists();
	
	promise.then(function(data){
		var list = listView.data("kendoListView");
            
			var dataSource = new kendo.data.DataSource({
                data: data
            });
			
            list.setDataSource(dataSource);
            list.refresh();
			
			 if(listName){
                $(list.element).find(".title").each(function(){
                    if($(this).html() == listName)
                        list.select($(this).parent());
                });
            }
			
			$(".listView button").kendoButton({
                spriteCssClass: "k-icon k-i-pencil"  
            });
   
   for(var i=0; i<updateFunctions.length; i++){
                updateFunctions[i]('');
            }
       
		});	
};


 var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };




}); 



	

/**
define(['jquery', 'text!./list.html', 'text!./button.html', 'text!./addWindow.html', 'text!./editWindow.html', 'core/request', 'kendo'], function($, list, button, addWindow, editWindow, request){

    var updateFunctions = [];
    var listView = $(list);
    var addListButton = $(button);
    var addListWindow;
    var editListWindow;
    var createListView = function(selector){
		//var elem = document.createElement("img");
		//elem.setAttribute("src", "http://superlistapp.com/wp-content/uploads/2014/08/SuperlistLogo-text1-300x48.png");
		//elem.setAttribute("height", "40");
		//elem.setAttribute("width", "150");
		//elem.setAttribute("alt", "Flower");
        //$(elem).appendTo(selector);
        listView.appendTo(selector);
        //addListButton.appendTo(selector);

        //addListButton.kendoButton({
          //  click: function(e) {
            //    openAddWindow();
            //}
       // });


        listView.kendoListView({
            template: '<div class="listView"><span class="title">#:title#</span><button></button><p>#:count#</p></div>',
            selectable: true,
            change: function(){
                var select = this.select();
                for(var i=0; i<updateFunctions.length; i++){
                    updateFunctions[i]($(select[0]).find(".title").html());
                }
            }
        });

        getListView();
    };
	var createLogo = function(selector){
		var elem = document.createElement("img");
		elem.setAttribute("src", "http://superlistapp.com/wp-content/uploads/2014/08/SuperlistLogo-text1-300x48.png");
		elem.setAttribute("height", "40");
		elem.setAttribute("width", "150");
		elem.setAttribute("alt", "Flower");
        $(elem).appendTo(selector);
    
    };

	    var createAddButton = function(selector){

        //$("<h1>Lists</h1>").appendTo(selector);
        //listView.appendTo(selector);
        addListButton.appendTo(selector);

        addListButton.kendoButton({
            click: function(e) {
                openAddWindow();
            }
        });

        

        
    };
    var getListView = function(listName){
        request.getListView().then(function(data){
            var list = listView.data("kendoListView");
            var dataSource = new kendo.data.DataSource({
                data: data
            });
            list.setDataSource(dataSource);
            list.refresh();

            if(listName){
                $(list.element).find(".title").each(function(){
                    if($(this).html() == listName)
                        list.select($(this).parent());
                });
            }


            $(".listView button").kendoButton({
                spriteCssClass: "k-icon k-i-pencil",
                click: function(e) {
                    openEditWindow($(e.event.target).closest(".listView").find(".title").html());
                }
            });

            for(var i=0; i<updateFunctions.length; i++){
                updateFunctions[i]('');
            }
        })
    };

    var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };

    return {
        createListView: createListView,
		createAddButton: createAddButton,
        getListView: getListView,
        addFunctionForChanges: addFunctionForChanges,
		createLogo: createLogo
    }

});



**/
 





