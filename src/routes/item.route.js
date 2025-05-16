const express = require("express")
const itemRouter = express.Router
const itemController = require("../controllers/item.controller")
const multer = require("multer")
//================================================================

itemRouter.post('/create', itemController.createItem)

itemRouter.get('/items', itemController.getAllItem)

itemRouter.get('/:id_item', itemController.getItemByID)

itemRouter.update('/:id_item', itemController.updateItem)

itemRouter.delete('/:id_item', itemController.deleteItem)

//=================================================================

module.exports = itemRouter;