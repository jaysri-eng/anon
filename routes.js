const express = require('express')

const Joi = require('@hapi/joi')
//import mongoose from 'mongoose';
const { Schema, default: mongoose } = require('mongoose');

const { postName, getNameId, firstPost, getPosts,getNames, getP, incrementLikes} = require('./db');
const { ObjectId, Db, MongoClient } = require('mongodb');

// Initialize a new router instance
const router = express.Router()
const {nameSchema,postSchema} = require('./schema')

// Define the schema for the item
// Each item will have a `name`, which is a string
// and a `quantity`, which is a positive integer



/*//routes for names
router.get("/names",NameController.all);
router.get("/names/create",NameController.create);
router.get("/names/:username",NameController.find);
router.get("/names/:username/posts",NameController.getAllNames);

//routes for posts
router.get("/posts",PostController.all);
router.get("/posts/:username/create",PostController.create);
*/






// A new POST route is created using the `router` objects `post` method
// providing the route and handler as the arguments

router.post('/names', (req, res) => {
    // We get the item from the request body
    const item = req.body
  
    // The itemSchema is used to validate the fields of the item
    //const Sch = db.model('sch',itemSchema)    
    /*const result = nameSchema.validate(item)
    if (result.error) {
      // if any of the fields are wrong, log the error and return a 400 status
      console.log(result.error)
      res.status(400).end()
      return
    }*/
    
    // If the validation passes, insert the item into the DB
    postName(item)
      .then(() => {
        // Once the item is inserted successfully, return a 200 OK status
        res.status(200).end()
      })
      .catch((err) => {
        // If there is any error in inserting the item, log the error and
        // return a 500 server error status
        console.log(err)
        res.status(500).end()
      })
  })
  
  router.post('/posts', (req, res) => {
    // We get the item from the request body
    const item = req.body
  
    // The itemSchema is used to validate the fields of the item
    //const Sch = db.model('sch',itemSchema)    

    /*const result = postSchema.validate(item)
    if (result.error) {
      // if any of the fields are wrong, log the error and return a 400 status
      console.log(result.error)
      res.status(400).end()
      return
    }*/
    
    // If the validation passes, insert the item into the DB
    firstPost(item)
      .then(() => {
        // Once the item is inserted successfully, return a 200 OK status
        res.status(200).end()
      })
      .catch((err) => {
        // If there is any error in inserting the item, log the error and
        // return a 500 server error status
        console.log(err)
        res.status(500).end()
      })
  })

router.get('/getPost', (req, res) => {
    
    // `getItems` returns a new promise which resolves with the result
    getPosts()
      .then((items) => {
        // The promise resolves with the items as results
        items = items.map((item) => ({
          // In mongoDB, each object has an id stored in the `_id` field
          // here a new field called `id` is created for each item which 
          // maps to its mongo id
          id: item._id,
          post: item.post,
        }))
  
        // Finally, the items are written to the response as JSON
        res.json(items)
      })
      .catch((err) => {
        // If there is an error in getting the items, we return a 500 status
        // code, and log the error
        console.log(err)
        res.status(500).end()
      })
  })

  router.get('/getNames', (req, res) => {
    // `getItems` returns a new promise which resolves with the result
    getNames()
      .then((items) => {
        // The promise resolves with the items as results
        items = items.map((item) => ({
          // In mongoDB, each object has an id stored in the `_id` field
          // here a new field called `id` is created for each item which 
          // maps to its mongo id
          id: item._id,
          name: item.name,
        }))
  
        // Finally, the items are written to the response as JSON
        res.json(items)
      })
      .catch((err) => {
        // If there is an error in getting the items, we return a 500 status
        // code, and log the error
        console.log(err)
        res.status(500).end()
      })
  })

  router.get('/getp',(req,res) => {
    getP().then((items) => {
      items = items.map((item) => ({
        id: item._id,
        post: item.post,
        name: item.name,
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })

  router.post('/like',(req,res) => {
    item = req.body
    incrementLikes().then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      // If there is any error in inserting the item, log the error and
      // return a 500 server error status
      console.log(err)
      res.status(500).end()
    })
  })
module.exports = router