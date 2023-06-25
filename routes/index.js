const express = require('express')

const routes = express.Router();

const controller = require('../controllers/CrudController');

const fileupload = require('../config/fileuploads');

routes.get('/', controller.index);
routes.post('/InsertBlog', fileupload, controller.AddData);
routes.get('/DlteBlog', controller.DeleteData);
routes.get('/EditBlog', controller.EditData);

module.exports = routes;