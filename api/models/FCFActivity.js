/**
* FCFActivity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:"fcf_activity",
  autoCreatedAt:false,
  autoUpdatedAt:false,
  autoPK:false,
  migrate:'safe',  // don't update the tables!


  connection:"appdev_default",



  attributes: {

    date_start : {
        type : "date"
    }, 

    date_end : {
        type : "date"
    }, 

    default_image : {
        type : "string",
        size : 255
    }, 

    team : {
        type : "integer",
        size : 11
    }, 

    createdBy : {
        type : "integer",
        size : 11
    }, 

    approvedBy : {
        type : "integer",
        size : 11
    }, 

    status : {
        type : "string",
        size : 255
    }, 

    id : {
        type : "integer",
        size : 10,
        primaryKey : true,
        autoIncrement : true
    }, 

    createdAt : {
        type : "datetime"
    }, 

    updatedAt : {
        type : "datetime"
    }, 


  }
};

