define(['jquery','text!./EditOrRemForm.html','core/request','kendo'],
function($, template,request){
'use strict';


function EditOrRemForm(initObj){
		initObj = initObj || {};
		console.log("function 0 edit or rem :: hello from window editing or remove");
		var that = this;
		this._dfd = $.Deferred();
		var wndEdt = this.$ = $(template);
       //this.$.appendTo('body');
	   
	  /*WINDOW*/
       this.$.kendoWindow({
              modal: true, //for affect
              title: "Edit List",
			  width: "505px",
			  height: "150px",
			  actions: ["Close"],
               resizable: false ,
             visible: false
            }).data("kendoWindow");
	 
	 this.$.find("input").val(initObj);
	 
			/*for rename the name of the list*/
			this.$.find("#editform").on('click',"#btnEdit" ,function(ev){ //no good with submit
			//var newName = ev.target[0].value;
			var newName = $(ev.target).closest("#editform").find("input").val(); 
			//var  newName= this.$.find("input").val();
			console.log("function 1.1 edit or rem :: in edit "+newName);
			var promise = request.editList(initObj,newName);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});
		
		
		/*for remove the name of the list*/
			this.$.find("#editform").on('click',"#btnRem" ,function(ev){ //no good with submit
			console.log("function 1.2 edit or rem :: in remove");
			var promise = request.removeList(initObj);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});
		
		
		
}

EditOrRemForm.prototype.closeWin = function (){
		if (this.$){
		this.$.kendoWindow("close");
		console.log("function 2 edit or rem :: CLOSE WIN  edit or remove");
		
		} else {
			console.log("no element to CLOSE WIN  edit or remove");
		}
	}

/*action of window edit or remove after we Clicking".listsOfView  button"*/	
EditOrRemForm.prototype.openWin = function(){
		if (this.$){
		 this.$.data("kendoWindow").center();
		 this.$.data("kendoWindow").open();
		console.log("function 3 edit or rem :: Open WIN edit or remove");
		} else {
			console.log("no element to Open WIN  edit or remove");
		}
	}
			
EditOrRemForm.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

EditOrRemForm.prototype.getPromise = function(){
		return this._dfd.promise();
	}
		
EditOrRemForm.prototype.destroy = function(){
		this.$.off('submit');
		this.$.remove();
	}
return EditOrRemForm;
});


