define(['jquery', 'text!./template.html', 'core/request'], function($, template, request){
	'use strict';
		
	function AddTask(initObj){
		initObj = initObj || {};
		var that = this;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template); //template.html
		
		
		
		 setTimeout(function(){
		this.$.find("#newtask").on('click', function(){
			 that.openWindow();
           that.saveListToDb(that);
			return false;
		});
		},80);

	}

	AddTask.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}
	
	AddTask.prototype.resetDeferred = function(){
		this._dfd = $.Deferred();
	}

	AddTask.prototype.getPromise = function(){
		return this._dfd.promise();
	}

	AddTask.prototype.destroy = function(){
		this.$.off('submit');
		this.$.remove();
	}
	
	
	//interenet gitHub
	AddTask.prototype.openWindow = function(){
		 $(template()).kendoWindow({
        width: "250px",
        height: "80px",
        title: "Creat new list",
        resizable: false,
        actions: ["Close"],
        position: {
          top: "12%",
          left: "5%"
        }
      }).data("kendoWindow").open();	
	}
	
	
	//interenet gitHub
	AddTask.prototype.uploadTaskList = function(){
		('#taskList').empty();
		request.upload();		
	}
	
	AddTask.prototype.closeWindow = function(){
    var window = $('.createTask');
    window.data("kendoWindow").close();
  };
	
	
	AddTask.prototype.saveListToDb = function(that){
        this.$.find("#newtask").on('submit', function(ev){
          var variable= ev.target[0].value; //the user name
          if ( variable !== "") {
            var promise = request.addNewList({
              name: variable,
              num: '',
              task: []
            });
            promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
          }
		  
		  else{
            alert('list name is empty');
          }
		  return false;
  });
}
	

	return AddTask;

});