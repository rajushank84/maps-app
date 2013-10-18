dataUtils = function() {};

dataUtils.getAllItems = function(callback) {
    var listData = function(err, collection) {
            collection.find().toArray(function(err, results) {
                myData = results;
                return(callback(myData));
            });
        };
        
    this.doDbOperation(listData);
};

dataUtils.saveItem = function(data, callback) {
    var insertData = function(err, collection) {
            collection.insert(data);
            return(callback());
        };

    this.doDbOperation(insertData);
};

dataUtils.deleteItem = function(data, callback) {
    var removeData = function(err, collection) {
            collection.remove(data);
            return(callback());
        };

    this.doDbOperation(removeData);
};

dataUtils.doDbOperation = function(data) {
    var Client = this.getDbClient(),
        dbDetails = this.getDbDetails();
 
    Client.open(function(err, pClient) {
        Client.authenticate(dbDetails['userName'], dbDetails['password'], {authdb: dbDetails['db']},  function(err, success) {
            Client.collection('items', data);
            Client.close();
        });
    });
};

dataUtils.getDbDetails = function() {
    var configuration = 'live';

    if(configuration === 'live') {
        return({
            'userName': '',
            'password': '',
            'db': 'mongodb',
            'server': 'ds031607.mongolab.com',
            'port': 31607
        });
    }
    else {
        return({
            'userName': '',
            'password': '',
            'db': 'test',
            'server': '127.0.0.1',
            'port': 27017
        });
    }
};

dataUtils.getDbClient = function() {
    var Db = require('mongodb').Db,
        Server = require('mongodb').Server,
        dbDetails = this.getDbDetails(),
        server = new Server(dbDetails['server'], dbDetails['port'], {auto_reconnect : true}),
        Client = new Db(dbDetails['db'], server);

    return Client;  
}; 

module.exports = dataUtils;

