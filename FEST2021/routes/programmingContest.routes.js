const express = require("express");
const router = express.Router();

const{ensureAuthenticated, addUserData}=require("../middlewares/auth.middleware");

const {getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC, getEditPC,postEditPC}=require('../controllers/programmingContest.controllers')
router.get('/register',ensureAuthenticated,addUserData,getPC)
router.post('/register',ensureAuthenticated,addUserData,postPC)
router.get('/list',ensureAuthenticated,addUserData,getPCList)
router.get('/pc-delete/:id',ensureAuthenticated,addUserData,deletePC)
router.get('/pc-paymentDone/:id',ensureAuthenticated,addUserData,paymentDonePC)
router.get('/pc-select/:id',ensureAuthenticated,addUserData,selectPC)
router.get('/pc-edit/:id',ensureAuthenticated,addUserData,getEditPC)
router.post('/pc-edit',ensureAuthenticated,addUserData,postEditPC)


module.exports=router;