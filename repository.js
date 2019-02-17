'use strict';
const uuidv1 = require('uuid/v1');
const TABLE_NAME = 'Conteudo_Serverless';
const dynamoDbLib = require('./dynamodb-lib');

const getAll = function () {
  return dynamoDbLib.call('scan', {
    TableName: TABLE_NAME
  });
}

const getOne = function (uuid) {
  return dynamoDbLib.call('get', {
    TableName: TABLE_NAME,
    Key: {
      uuid: uuid
    }
  });
}

const save = function (content) {
  return dynamoDbLib.call('put', {
    TableName: TABLE_NAME,
    Item: {
      uuid: uuidv1(),
      content: content
    }
  });
}

module.exports = {
  getAll,
  getOne,
  save
};