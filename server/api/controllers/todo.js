var mongodb = require('mongodb');
var Task = require('../models/task');

var getNumOfDocs = function(model, query, callback) {
    model.count(query, function(err, docs) {
        if (err) throw err
        
        callback(null, docs);
    });
}

module.exports = {
    listTasks(req, res, next) {
        var query = {};
        if(req.query.status) {
            query = {'status': req.query.status};
        }
        Task.find(query).sort("-status").exec(function(err, docs) {
            if (err) { 
                res.status(409).json({'error': err.message});
            }
            
            getNumOfDocs(Task, query, function(err, count) {
                if (err) { return console.log(err.message); }
                
                res.status(200).json({'data': docs, 'count': count});
            });
        });
    },
    addTask(req, res, next) {
        var data = req.body;
        
        var task = Task({
            'name': data.name,
            'description': data.description
        });
        
        task.save(function(err, docs) {
            if (err) { 
                res.status(409).json({'error': err.message}); 
            }
            
            res.status(201).json({'result': docs});
        });
    },
    removeTask(req, res, next) {
        var ObjectID = new mongodb.ObjectID(req.params.id);
        
        Task.remove({'_id': ObjectID}, function(err, result) {
            if (err) { 
                res.status(409).json({'error': err.message}); 
            }
            
            res.status(200).json({'result': result});
        });
    },
    changeStatusTask(req, res, next) {
        var ObjectID = new mongodb.ObjectID(req.params.id);
        var status = req.body.status;
        
        
        Task.update({'_id': ObjectID}, {status: status}, function(err, result) {
            if (err) { 
                res.status(409).json({'error': err.message}); 
            }
            
            res.status(200).json({'result': result});
        });
    }
};