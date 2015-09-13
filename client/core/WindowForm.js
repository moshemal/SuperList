define(['jquery','core/request', 'text!./templates/Window.html', 'kendo'], 
	
	function($,request,addlistWindow){
		'use strict';
		
		function WindowForm(){
		var that = this;
    this._dfd = $.Deferred();
  //  this._init = initObj;

    var frm = this.$ = $('#save');
	
	console.log(frm);
	
	
    setTimeout(function() {

       $('#addlist').on('click',function() {
           that.openWindow();
           that.saveListToDb(that);
       });
        },80);
		
		
		
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
		
	WindowForm.prototype.closeWindow = function() {
    var window = $('.input-group');
    window.data("kendoWindow").close();
  };	
		
	WindowForm.prototype.updatelist = function() {
    $('#taskList').empty();
    request.upload();
  };
	
	WindowForm.prototype.saveListToDb = function(that){
        $(document).delegate('#save', 'click', function(){
          var variable = $('.form-control').val();
		  console.log(variable);
          if ( variable !== "") {
            var promise = request.addNewTask({
              task: variable
              //num: '',
              //task: []
            });
            promise.then(function() {
              that._dfd.resolve();
              that.updatelist();
              that.closeWindow();
            }, function() {
              that._dfd.reject();
              console.log('reject');
            });
          }else{
            alert('list name is empty');
          }
  });
};

		
	return WindowForm;
});

       