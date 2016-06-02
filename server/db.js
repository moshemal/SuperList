var fs = require('fs');




function getListView(user){
    console.log(user);
    if(user){
        var files = fs.readdirSync('./db/' + user + '/lists');
        var output = [];
        for(var i = 0; i<files.length; i++){
            var count = 0;
            var count = JSON.parse(fs.readFileSync('./db/' + user + '/lists/' + files[i], 'utf8')).items.length;
            output.push({title: files[i].split('.')[0],id: i,count: count});
        }
        return output;
    }
    return {};
}

function addList(user, listName){
    if(user){
        fs.stat('./db/' + user + "/lists/" + listName + ".json", function(err, stat){
            if (stat){
                return;
            } else {
                fs.writeFile('./db/' + user + "/lists/" + listName + ".json",JSON.stringify({"items": []}), 'utf8');
            }
        });
    }
}

function editList(user, oldName, newName){
    if(user){
        fs.stat('./db/' + user + "/lists/" + oldName + ".json", function(err, stat){
            if (stat){
                fs.stat('./db/' + user + "/lists/" + newName + ".json", function(err, stat1){
                        if(!stat1) {
                            console.log("Changing the name of the list '"+oldName+"' to '"+newName+"'");
                            fs.renameSync('./db/' + user + "/lists/" + oldName + ".json", './db/' + user + "/lists/" + newName + ".json");
                        }
                    }
                );
            }
        });
    }
}

function removeList(user, listName){
    if(user){
        fs.stat('./db/' + user + "/lists/" + listName + ".json", function(err, stat){
            if (stat){
                console.log("Removing the list '" + listName);
                fs.unlink('./db/' + user + "/lists/" + listName + ".json");
            }
        });
    }
}

function getItems(user, listName){
    if(user){
        return JSON.parse(fs.readFileSync('./db/' + user + '/lists/'  + listName + ".json", 'utf8'));
    }
    return {};
}

function getItem(user, listName, itemName){
    if(user){
        var list = JSON.parse(fs.readFileSync('./db/' + user + '/lists/'  + listName + ".json", 'utf8'));
        for(var i = 0; i<list.items.length; i++){
            if(list.items[i]["title"] == itemName)
                return list.items[i];
        }
    }
    return {};
}

function addItem(user,listName,itemName){
    if(user) {
        var list = JSON.parse(fs.readFileSync('./db/' + user + '/lists/' + listName + ".json", 'utf8'));
        var addThis = true;
        for(var i = 0; i<list.items.length; i++){
            if(list.items[i]["title"] == itemName)
                addThis = false;
        }
        if(addThis)
            list.items.push({"title": itemName});
        fs.writeFileSync('./db/' + user + '/lists/' + listName + ".json", JSON.stringify(list), 'utf8');
    }
}

function editItem(user,listName,itemName,properties){
    if(user) {
        var list = JSON.parse(fs.readFileSync('./db/' + user + '/lists/' + listName + ".json", 'utf8'));
        for(var i = 0; i<list.items.length; i++){
            if(list.items[i]["title"] == itemName){
                delete properties.listName;
                delete properties.itemName;
                list.items[i] = properties;
                list.items[i]["title"] = itemName;
                fs.writeFileSync('./db/' + user + '/lists/' + listName + ".json", JSON.stringify(list), 'utf8');
                return;
            }
        }
    }
}

function removeItem(user,listName,itemName){
    if(user){
        var list = JSON.parse(fs.readFileSync('./db/' + user + '/lists/' + listName + ".json", 'utf8'));
        for(var i = 0; i<list.items.length; i++){
            if(list.items[i]["title"] == itemName){
                list.items.splice(i, 1);
                fs.writeFileSync('./db/' + user + '/lists/' + listName + ".json", JSON.stringify(list), 'utf8');
                return;
            }
        }
    }
}

//exports.createUser = createUser;
exports.getListView = getListView;
exports.addList = addList;
exports.editList = editList;
exports.removeList = removeList;
exports.getItems = getItems;
exports.getItem = getItem;
exports.addItem = addItem;
exports.editItem = editItem;
exports.removeItem = removeItem;