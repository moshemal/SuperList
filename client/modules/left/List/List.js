define(['jquery','text!./List.html','text!./BtnPlus.html','text!./AddWin.html','text!./EditOrRemWin.html','core/request','kendo'],
function($, lstView , btnPlus ,winAdd, winEdit, request){
'use strict';


var updateFunctions = [] ;
var listView = $(lstView);

var btnAdd =  $(btnPlus);
var addLstWin ;

var editWin ;


//
 var openAddWindow = function(){
        addLstWin = $(winAdd);
        addLstWin.appendTo('body');//
        addLstWin.kendoWindow({
            width: "600px",
            title: "Create New List",
            actions: [
                "Close"
            ],
            close: function(){
                var dialog = addLstWin.data("kendoWindow");
                dialog.destroy();
                addLstWin.remove();
                getAllListsView();
            },
            modal: true
        });

        var dialog = addLstWin.data("kendoWindow");
        dialog.center();

        addLstWin.find("#dialogListAdd").kendoButton({
			//
            click: function(){
                var dialog = addLstWin.data("kendoWindow");
                dialog.destroy();
                request.addList(addLstWin.find("input").val()).then(function(){
                    getAllListsView();
                },
				function(){
				console.log("failed");
				});
            }
        });
    };
	
	
var editOpenWin = function(listName){
	
	console.log("hello 7")
	if(listName === undefined || listName === ""){
		console.log("in editOpenWin " +listName);
        return;			
	}	
	   
	editWin = $(winEdit); //
            editWin.appendTo('body');
            editWin.kendoWindow({
                width: "600px",
                title: "Edit List Name",
                actions: [
                    "Close"
                ],
                close: function(){
                    var dialog = editWin.data("kendoWindow");
                    dialog.destroy();
                    editWin.remove();
                   getAllListsView();
                },
                modal: true
            });

            var dialog = editWin.data("kendoWindow");
            dialog.center();

            editWin.find("input").val(listName); //witch we will have the name of the list we want to edit (in the place holder)

            editWin.find("#dialogBtnEdit").kendoButton({ //if we click on Done button 
                click: function(){
                    var dialog = editWin.data("kendoWindow");
                    dialog.destroy();
                    request.editList(listName, editWin.find("input").val()).then(function(){
                     getAllListsView();
                    },
					function(){
					console.log("failed edit");
					});
                }
            });

           editWin.find("#dialogBtnRem").kendoButton({ //if we click on Remove button 
                click: function(){
                    var dialog = editWin.data("kendoWindow");
                    dialog.destroy();
                    request.removeList(listName).then(function(){
                        getAllListsView();
                    },
					function(){
					console.log("failed remove");
					});
                }
            });   
	   
	   
};	
	
	
//
var createListView = function(selector){
        $("<h1>Lists</h1>").appendTo(selector);
        listView.appendTo(selector);//append the list to the layout
		
		//
		btnAdd.appendTo(selector);
		btnAdd.kendoButton({
		click: function(e) {
                openAddWindow();
            }
		});
		
        listView.kendoListView({//define a list view from kendo ui
            template: '<div class="listView"><span class="k-icon k-insertUnorderedList"></span><span class="title">#:title#</span><button></button><p>#:count#</p></div>',
            selectable: true,  //witch element will be edited
			
			change : function(){//Fires when the list view selection has changed.
				var select = this.select; //jQuery the selected items if called without arguments.
				for(var i=0; i<updateFunctions.length; i++){
					console.log(select[0]);
                    updateFunctions[i]($(select[0]).find(".title").html());
                }
			}
        });
      
        getAllListsView();
		console.log("hello 6");//hello 4 is last need to see what will i do with this
    };
	
//		
 var getAllListsView = function(listName){
	 var promise = request.getAllListsView();//form request.js getting the DB from the server
		 console.log("hello" ,listName);
       promise.then(function(data){
		   console.log("hello 4");
            var list = listView.data("kendoListView");//
            var dataSource = new kendo.data.DataSource({//the data
                data: data
            });
            list.setDataSource(dataSource);//insert the data of the list
            list.refresh();//was recommand to do will find a better explain
			
			$(".listView  button").kendoButton({
               spriteCssClass: "k-icon k-i-pencil",
			   click : function(e){
				    editOpenWin($(e.event.target).closest(".listView").find(".title").html()); 
			   }
			   
           });   

			
            if(listName){
				console.log(listName);
                $(list.element).find(".title").each(function(){
                    if($(this).html() == listName)
                        list.select($(this).parent());
                });
            }

            for(var i=0; i<updateFunctions.length; i++){
                updateFunctions[i]('');
            }			
        },
		function(){
			console.log("failed ");		
		});
		
		return false;
    };

//
 var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };


return {
	   createListView : createListView,
       getAllListsView : getAllListsView,
	   addFunctionForChanges : addFunctionForChanges
	
}

}); 





	






