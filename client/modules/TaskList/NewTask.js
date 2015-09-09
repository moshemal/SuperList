define(['jquery', 'text!./template.html', 'core/request'], 
function($,addlistWindow, request){
	'use strict';
		
		function NewTask(initObj){
		initObj = initObj || {};
		var that = this;
        //var user = {} ;
		this._dfd = $.Deferred();

        var frm = this.$ = $('#save');

		
		//found on the interenet in gitHub
		setTime(function{
		
		that.openWindow();	 
	    that.newTaskToDB(that);

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
	
	//interenet gitHub
	NewTask.prototype.closeWindow = function (){
		var window = $('.input-group');
    window.data("kendoWindow").close();
	}
	
	//interenet gitHub
	NewTask.prototype.uploadTaskList = function (){
		('#taskList').empty();
		request.upload();		
	}
	
	//interenet gitHub
	NewTask.prototype.openWindow = function (){
		 $(addlistWindow()).kendoWindow({
              modal: true,
			  width: "505px",
              title: "Create New List",
               resizable: false,
             actions: ["Close"]
            });
			$(addlistWindow()).data("kendoWindow").center();	
	}
	
	//interenet gitHub
	NewTask.prototype.newTaskToDB = function (that){
		$('#save').on('click',function() {
        var promise = request.addNewTask({
          name: $('.form-control').val(),
          num: '',
          task: [{
            todo: '',
            isCompleted: ''
          }]
        });
		
		promise.then(function(){that._dfd.resolve()}, 
		function(){
		that._dfd.reject();
		console.log('reject');
		
		});
        that.uploadTaskList();
        that.closeWindow();
      });
  }
	
	 
	return NewTask;	
});
	
	
	
	
	
	
	
	
	
       