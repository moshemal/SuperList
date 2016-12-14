define(['jquery', 'text!./list.html', 'text!./button.html','text!./upBtn.html', 'text!./addWindow.html', 'text!./editWindow.html', 'core/request', 'kendo'], 
        function($, list, button,upBtn, addWindow, editWindow, request){

    var updateFunctions = [];
    var listView = $(list);
    var addListButton = $(button);
	var top = $(upBtn);
    var addListWindow;
    var editListWindow;

	/*window for adding a new list name*/
    var openAddWindow = function(){
        addListWindow = $(addWindow);
        addListWindow.appendTo('body');
        addListWindow.kendoWindow({
            width: "600px",
            title: "Create New List",
            actions: [
                "Close"
            ],
            close: function(){
                var dialog = addListWindow.data("kendoWindow");
                dialog.destroy();
                addListWindow.remove();
                getListView();
            },
            modal: true
        });

        var dialog = addListWindow.data("kendoWindow");
        dialog.center();

        addListWindow.find("#listDialogAddSubmit").kendoButton({
            click: function(){
                var dialog = addListWindow.data("kendoWindow");
                dialog.destroy();
                request.addList(addListWindow.find("input").val()).then(function(){
                    getListView();
                });
            }
        });
    };

	/*in the middle pane adding a new window adding*/
    var openEditWindow = function(listName){
        if(listName != undefined && listName != ""){
            editListWindow = $(editWindow);
            editListWindow.appendTo('body');
            editListWindow.kendoWindow({
                width: "600px",
                title: "Edit List Name",
                actions: [
                    "Close"
                ],
                close: function(){
                    var dialog = editListWindow.data("kendoWindow");
                    dialog.destroy();
                    editListWindow.remove();
                    getListView();
                },
                modal: true
            });

            var dialog = editListWindow.data("kendoWindow");
            dialog.center();

            editListWindow.find("input").val(listName);

            editListWindow.find("#listDialogEditSubmit").kendoButton({
                click: function(){
                    var dialog = editListWindow.data("kendoWindow");
                    dialog.destroy();
                    request.editList(listName,editListWindow.find("input").val()).then(function(){
                        getListView();
                    });
                }
            });

            editListWindow.find("#listDialogEditRemove").kendoButton({
                click: function(){
                    var dialog = editListWindow.data("kendoWindow");
                    dialog.destroy();
                    request.removeList(listName).then(function(){
                        getListView();
                    });
                }
            });
        }
    };

	/*craeting a left side*/
    var createListView = function(selector){
        top.appendTo("#top-pane");//only the name
        listView.appendTo("#middle-pane"); //the lists
        addListButton.appendTo("#bottom-pane"); //the button

		
        addListButton.kendoButton({//button plus a kendu libery
			// spriteCssClass: "k-icon k-si-plus", //the icon plus
            click: function(e) { //if we will click the button
                openAddWindow(); //the function that we have 
            }
        });
		
		top.kendoButton({
			
		});
		

		//list view middle-pane a kendu libery
        listView.kendoListView({
            template: '<div class="listView"><span class="title">#:title#</span><p>#:count#</p><button></button></div>',
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

	/*the db prmise*/
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
			
			
			
			$( ".listView" )
       .on( 'mouseover', function(e){
		   $(e.target).closest(".listView").find("button").show();
           $(e.target).closest(".listView").find("p").css({
			"margin": "6px",
             "position": "fixed",
             "float": "left",
             "left": "155px",
			 "font-family": "Comic Sans MS"
			 });	
         })
      .on('mouseleave',function(e) {
		  $(e.target).closest(".listView").find("button").hide();
		  $(e.target).closest(".listView").find("p").css({
			 "margin": "6px",
             "position": "",
			 "float": "right",
			 "left": "",
			 "font-family": "Comic Sans MS"
			 });	     	   
            });			
            
			

            for(var i=0; i<updateFunctions.length; i++){
                updateFunctions[i]('');
            }
        }, function(){
			console.log("failed");
		})
    };

    var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };

    return {
        createListView: createListView,
        getListView: getListView,
        addFunctionForChanges: addFunctionForChanges
    }

});