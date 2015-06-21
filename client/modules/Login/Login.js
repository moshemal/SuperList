define(['jquery', 'text!./template.html', 'core/request'], function($, template, request){
	'use strict';
		
	function Login(initObj){
		initObj = initObj || {};
		var that = this;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template);
		this.$.on('submit', function(ev){
			console.log(ev);
			var name = ev.target[0].value;
			var password = ev.target[1].value;
			var promise = request.login(name, password);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});

	}

	Login.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}
	
	Login.prototype.resetDeferred = function (){
		this._dfd = $.Deferred();
	}

	Login.prototype.getPromise = function (){
		return this._dfd.promise();
	}

	Login.prototype.destroy = function (){
		this.$.off('submit');
		this.$.remove();
	}

	return Login;

});