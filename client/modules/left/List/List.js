define(['jquery','text!./List.html','core/request','kendo'],
function($, template,request){
'use strict';


var updateFunctions = [] ;
var listView = $(template);



var createListView = function(selector){
	
	/*append the list to the layout*/
        $("<h1>Lists</h1>").appendTo(selector);
        listView.appendTo(selector);
  
	/*define a list view from kendo ui*/
        listView.kendoListView({
            template: '<div class="listView"><span class="k-icon k-insertUnorderedList"></span><span class="title">#:title#</span><button></button><p>#:count#</p></div>',
            selectable: true,  //witch element will be edited
			change : function(){//Fires when the list view selection has changed.
				//handle event
				var select = this.select; //jQuery the selected items if called without arguments.
				for(var i=0; i<updateFunctions.length; i++){
					console.log($(select[0]).find(".title").html());
                    updateFunctions[i]($(select[0]).find(".title").html());
                }
			}
			
        });
      
        getAllListsView();
		console.log("hello 6");//hello 4 is last need to see what will i do with this
    };
	
	
	
	
 var getAllListsView = function(listName){
	
	 var promise = request.getAllListsView();//form request.js getting the DB from the server
		 
       promise.then(function(data){
		   console.log("hello 4");
            var list = listView.data("kendoListView");//
            var dataSource = new kendo.data.DataSource({//the data
                data: data
            });
            list.setDataSource(dataSource);//insert the data of the list
            list.refresh();//was recommand to do will find a better explain
			
			$(".listView  button").kendoButton({
               spriteCssClass: "k-icon k-i-pencil" 	  
           });   

			
            if(listName){
                $(list.element).find(".title").each(function(){
                    if($(this).html() == listName)
                        list.select($(this).parent());
                });
            }    
        },
		function(){
			console.log("failed");		
		});
		console.log("hello 5  is printed before 'hello 4'+ request\n" 
		+ "have TIME OUT we might ");
		return false;
    };


	var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };


return {
	   createListView : createListView,
       getAllListsView : getAllListsView,
	   addFunctionForChanges : addFunctionForChanges
	
}

}); 





	

/**
define(['jquery', 'text!./list.html', 'text!./button.html', 'text!./addWindow.html', 'text!./editWindow.html',
 'core/request', 'kendo'], function($, list, button, addWindow, editWindow, request){

    var updateFunctions = [];
    var listView = $(list);
    var addListButton = $(button);
    var addListWindow;
    var editListWindow;
    var createListView = function(selector){
		
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
 





