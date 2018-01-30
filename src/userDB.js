"use strict"

const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

const dynamoDB = new AWS.DynamoDB();


function createUsersTable() {

  /* USERS TABLE Schema
      {
        username: String! // partition key
        userId: ID!
        email: String!
        local {
          password
        }
        services {
          profile: Boolean
        }
        status {
          verified: Boolean
        }

  */


  const params = {
    TableName: "Users",
    KeySchema: [
      { AttributeName: '_id', KeyType: 'HASH' },          // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: '_id', AttributeType: 'S' },
    ]
  }

  /* create table */
  dynamoDB.createTable(params, (err, data) => {
    if (err) {
      console.error(`Unable to create table. Error ${JSON.stringify(err)}`)
    } else {
      console.log(`Created table. Table description ${JSON.stringify(data)}`)
    }
  });
  
  /* add items */

}

const userDB = {

  '001': {
    _id: '001',
    username: 'duongtdn',
    services: {
      profile: true
    },
    status: {
      verified: true,
      active: true
    }
  }

}

const authDB = {
  'duongtdn': {
    userId: '001',
    local: {
      password: '123456'
    }
  }
}

function findUserByPassword(username, password) {

  const user = authDB[username];
  if (password === user.local.password) {
    return userDB[user.userId];
  }

  return null;
}

module.exports = { findUserByPassword }