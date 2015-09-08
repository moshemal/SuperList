define(['jquery', 'text!./template.html', 'core/request'], 
function($,addlistWindow, request){
	'use strict';
		
	function NewTask(initObj){
		initObj = initObj || {};
		var that = this;
        //var user = {} ;
		this._dfd = $.Deferred();
		
		//var htmlDom = this.$ = $(task);
		
		//found on the git hub
		var frame = this.$ = $('#save');
		 setTimeout(function(){
		 this.$.find("#taskform").on('on', function(){
		 that.openWindow();
		 that.saveTaskDB(that);
		 }); 
		 },80);

			
	return false;
		

	}
	
	
	
	NewTask.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}
	
	NewTask.prototype.resetDeferred = function (){
		this._dfd = new $.Deferred();
	}

	NewTask.prototype.getPromise = function (){
		return this._dfd.promise();
	}

	NewTask.prototype.destroy = function (){
		this.$.off('submit');
		this.$.remove();
	}
	
	NewTask.prototype.openWindow = function (){
	 $(addlistWindow()).kendoWindow({
        width: "250px",
        height: "80px",
        title: "Create New List",
        resizable: false,
        actions: ["Close"],
        position: {
          top: "12%",
          left: "5%"
        }
      }).data("kendoWindow").open();
	}

	NewTask.prototype.closeWindow = function (){
	$(".close-button").click(function(){
             //call 'close' method on nearest kendoWindow
            $(this).closest("[data-role=window]").kendoWindow("close");
          });//
	}
	
	NewTask.prototype.updateListOfTask = function (){
	
	}
	
	NewTask.prototype.saveTaskDB = function(that){
	 
	 $('#save').on('click',function() {
	 var promise = request.addNewTask({
	 name: $('.form-control').val(),
          num: '',
          task: [{
            todo: '',
            isCompleted: ''
          }]
        });
		console.log(promise);
   promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
	 that.updateListOfTask();
     that.closeWindow();
	});
	
	}	
	return NewTask;	
});
	
	
	
	
	
	
	
	
       