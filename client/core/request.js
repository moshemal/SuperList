define(['jquery'], function($){
	
	'use strict';

    function isLoggedIn(){
        return $.ajax("/api/isLoggedIn", {
            method: "get"
        });
    }

    function login(name, password){
        return $.ajax("/api/login", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                user: 		name,
                password: password
            }
        });
    }

    function createUser (name, password, properties){
        return $.ajax("/api/createUser", {
          method: "post",
          success: function(data, a, xhr){
            console.log(data)
          },
          data: {
            user: 		name,
            password: password,
            properties: JSON.stringify(properties || {})
          }
        });
    }

    function getListView(){
        return $.ajax("/api/getListView", {
            method: "get"
        });
    }

    function addList(listName){
        return $.ajax("/api/addList", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                listName: listName
            }
        });
    }

    function editList(oldName, newName){
        return $.ajax("/api/editList", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                oldName: oldName,
                newName: newName
            }
        });
    }

    function removeList(listName){
        return $.ajax("/api/removeList", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                listName: listName
            }
        });
    }

    function getItems(listName){
        return $.ajax("/api/getItems", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                listName: listName
            }
        });
    }

    function getItem(listName, itemName){
        return $.ajax("/api/getItem", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                listName: listName,
                itemName: itemName
            }
        });
    }

    function addItem(listName, itemName){
        return $.ajax("/api/addItem", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                listName: listName,
                itemName: itemName
            }
        });
    }

    function editItem(listName, itemName, properties){
        return $.ajax("/api/editItem", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: "listName="+listName+"&itemName="+ itemName + (properties?("&"+properties):""),
            dataType : 'json'
        });
    }

    function removeItem(listName, itemName){
        return $.ajax("/api/removeItem", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                listName: listName,
                itemName: itemName
            }
        });
    }

	return {
        isLoggedIn:  isLoggedIn,
		login:       login,
        createUser:  createUser,
        getListView: getListView,
        addList: addList,
        editList: editList,
        removeList: removeList,
        getItems: getItems,
        getItem: getItem,
        addItem: addItem,
        editItem: editItem,
        removeItem: removeItem
	}
});