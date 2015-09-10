define(['jquery', 'text!./template.html', 'core/request'], function($, template, request){
	'use strict';
		
	function AddTask(initObj){
		initObj = initObj || {};
		var that = this;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template); //template.html
		
		this.$.on('submit', function(ev){
			//alert("the type  "+ev.target[2]);
			
			var task = ev.target[0].value; //the user name
			
			
			//for writing to propeties.json this the my way 
			//maybe will find another way of fixing that
			var properties={
			name : fullName, job : jobV
			}; 
			
			//alert("the type  "+typeof properties);
			var promise = request.createUser(name, password, properties); //go to request.js and write the data base of the user
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});

	}

	AddTask.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}
	
	AddTask.prototype.resetDeferred = function (){
		this._dfd = $.Deferred();
	}

	AddTask.prototype.getPromise = function (){
		return this._dfd.promise();
	}

	AddTask.prototype.destroy = function (){
		this.$.off('submit');
		this.$.remove();
	}
	
	
	//interenet gitHub
	AddTask.prototype.openWindow = function (){
		 $(addlistWindow()).kendoWindow({
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
	AddTask.prototype.uploadTaskList = function (){
		('#taskList').empty();
		request.upload();		
	}
	
	AddTask.prototype.closeWindow = function() {
    var window = $('.createTask');
    window.data("kendoWindow").close();
  };
	
	
	
	

	return AddTask;

});