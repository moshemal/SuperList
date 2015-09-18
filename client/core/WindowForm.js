define(['jquery','core/request', 'text!./templates/Window.html'], 
	
	function($,request,addlistWindow){
		'use strict';
		
		function WindowForm(initObj){
		initObj = initObj || {};
		var that = this;
    this._dfd = $.Deferred();
   this._init = initObj;

    var frm = this.$ = $('#save');
	
	console.log(frm);
	
	
    setTimeout(function(){
       $('#addlist').on('click',function() {
           that.openWindow();
           that.saveListToDb(that);
		  return false;
       });
	   //return false;
        },500);
		
	
		}
		
		
   WindowForm.prototype.openWindow = function() {
      var htmlDom = $(addlistWindow);
	  $(htmlDom).kendoWindow({
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

  };
		
   WindowForm.prototype.destroy = function (that){
		that.$.off('click');
		that.$.remove();
	}		
		
		
	WindowForm.prototype.closeWindow = function(that) {
    var window = $('.input-group');
    window.data("kendoWindow").close();
	//that.destroy(that);
  };	
		
	WindowForm.prototype.updatelist = function() {
    $('#taskList').empty();
    request.upload();
  };
	
	WindowForm.prototype.saveListToDb = function(that){
        
		  $(document).delegate('#save', 'click', function(ev){
      var variable = $('.form-control').val();
		 console.log(variable);
		  console.log("in line 67 "+typeof variable +"= "+variable);
         if ( variable !== "") {
		 var name = variable;
           var promise = request.addNewTask(name
              //name: variable,
            // num: '',
             // task: []
            );
            promise.then(
			function() {
			that._dfd.resolve();
			console.log('secesssssssss');
            that.updatelist();
             that.closeWindow();
            }, 
			function() {
              that._dfd.reject();
              console.log('reject');
            });
			ev.preventDefault();
          }
		  else{
            alert('list name is empty');
			
          }
		  return false;
  });
  
  };

  
  
  
		
	return WindowForm;
});

       