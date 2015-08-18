define(['jquery', 'text!./templates/Menu.html', 'kendo'], 
	function($, Menu){
		'use strict';
	//console.log($);
	
	function getJMenu(type){
		var menuHtml;
		switch (type){
			//case "2U":  menuHtml = $(l2U); //
									//break;
			case "panalBar":  menuHtml = $(Menu); //
									break;
			default:    menuHtml = $(Menu);
		}
		return $(menuHtml);
	}

	function createMenu(type, selector){ //for now its "3W", "#container"
		var jMenu = getJMenu(type); //will return Menu.html
		var container = $(selector); //"#megaStore"
		container.css({
			width: "100%",
			height: "100%"
		});
		jMenu.appendTo(selector);
		
		//the craetion of kendo from libery vendours of kendoSplitter
		$("#menu").kendoMenu();

/***
var menuHtml = $(template);
//console.log(menuHtml);
	$("#megaStore").append(menuHtml);
	console.log(menuHtml);
	//layoutHtml.kendoMenu();
$("#menu").kendoMenu();


**/


				
	}//create menu

	return {
		createMenu: createMenu
	}
});