'use strict';

var express = require('express');
var cors = require('cors');
var todo = require('./controllers/todo');
var router = express.Router();

router.get('/list', cors({ origin: true }), todo.listTasks);
router.post('/add', cors({ origin: true }), todo.addTask);
router.options('/:id/update/:type', cors({ origin: true }));
router.put('/:id/update/:type', cors({ origin: true }), todo.changeStatusTask);
router.options('/:id/delete', cors());
router.delete('/:id/delete', cors(), todo.removeTask);


router.use('*', function(req, res) {
    res.status(404).json({msg: 'Route not found.'})
});


module.exports = router;