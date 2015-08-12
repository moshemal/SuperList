define(['jquery', 'text!./template.html', 'core/request'], function($, template, request){
	'use strict';
		
	function Create(initObj){
		initObj = initObj || {};
		var that = this;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template);
		this.$.on('submit', function(ev){
			console.log(ev);
			var name = ev.target[0].value;
			var password = ev.target[1].value;
			var properties = ev.target[2].name + ": " + ev.target[2].value + ", \r\n" + ev.target[3].name + ": " + ev.target[3].value
			var promise = request.createUser(name, password, properties);
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