define(['jquery', 'text!./template.html', 'core/request'], function($, template, request){
	'use strict';
		
	function Create(initObj){
		initObj = initObj || {};
		var that = this;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template); //template.html
		
		this.$.on('submit', function(ev){
			//alert("the type  "+ev.target[2]);
			
			var name = ev.target[0].value; //the user name
			var password = ev.target[1].value; //the password
			var fullName = ev.target[2].value;//
			var job = ev.target[3].value;//
			
			//for writing to propeties.json this the my way 
			//maybe will find another way of fixing that
			var properties={
			full : fullName, //the value name
			job : job
			}; 
			
			//alert("the type  "+typeof properties);
			var promise = request.createUser(name, password, properties); //go to request.js and write the data base of the user
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});

	}

	Create.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}
	
	Create.prototype.resetDeferred = function (){
		this._dfd = $.Deferred();
	}

	Create.prototype.getPromise = function (){
		return this._dfd.promise();
	}

	Create.prototype.destroy = function (){
		this.$.off('submit');
		this.$.remove();
	}

	return Create;

});