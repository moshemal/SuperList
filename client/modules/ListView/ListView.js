define(['jquery', 'core/request'], 
function($,  request){
	'use strict';
		
	function ListView(initObj){
		initObj = initObj || {};
		var that = this;
        //var user = {} ;
		this._dfd = $.Deferred();
		
		//var htmlDom = this.$ = $(template);

		//this.$.find("#loginform").on('submit', function(ev){
			//console.log(ev);
			//var name = ev.target[0].value;
			
			//console.log(user);
			//var password = ev.target[1].value;
			var promise = request.upload();
			//promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			
			//return false;
		//});

	}

	
	//i want to see if i can take the user name
	//Login.prototype.setName = function (elem){
		//this.user = elem;
	//}
	
	//Login.prototype.getName = function (){
	
	////return	this.name;
	//}
	
	/**
	Login.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}
	**/
	ListView.prototype.resetDeferred = function (){
		this._dfd = new $.Deferred();
	}

	ListView.prototype.getPromise = function (){
		return this._dfd.promise();
	}

	/**
	Login.prototype.destroy = function (){
		this.$.off('submit');
		this.$.remove();
	}
**/
	return ListView;

});