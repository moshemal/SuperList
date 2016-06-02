define(['jquery', 'text!./item.html', 'core/request', 'kendo'], function($, item, request){

    var rightView = $('<div></div>');
    var updateFunctions = [];

    function createRightView(selector){
        rightView.appendTo(selector);
    }

    var openItem = function(listName,itemName){

        request.getItem(listName,itemName).then(function(data){
            rightView.empty();
            var currentItem = $(item).clone();
            currentItem.find("input#title").val(data.title);
            currentItem.find("input#starting_date").val(data.starting_date);
            currentItem.find("input#end_date").val(data.end_date);
            currentItem.find("textarea#comments").html(data.comments);
            if(data.check)
                currentItem.find("input#check").attr("checked", "checked");


            currentItem.find("#itemSave").kendoButton({
                click: function(){
                    request.editItem(listName,itemName,currentItem.find("form").serialize()).then(function(){
                        for(var i=0; i<updateFunctions.length; i++){
                            updateFunctions[i](listName,itemName);
                        }
                    });
                }
            });

            currentItem.find("#itemRemove").kendoButton({
                click: function(){
                    request.removeItem(listName,itemName).then(function(){
                        for(var i=0; i<updateFunctions.length; i++){
                            updateFunctions[i](listName,itemName);
                        }
                        emptyRightSide();
                    });
                }
            });

            currentItem.appendTo(rightView);
        });
    };

    var emptyRightSide = function(){
        rightView.empty();
    };

    var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };

    return {
        createRightView: createRightView,
        openItem: openItem,
        addFunctionForChanges: addFunctionForChanges,
        emptyRightSide: emptyRightSide
    }

});