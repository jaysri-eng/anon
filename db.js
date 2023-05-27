const { MongoClient } = require('mongodb')
const {User, Post} = require('./schema')

// define the connection string. If you're running your DB
// on your laptop, this would most likely be it's address
const connectionUrl = 'mongodb://localhost/:3000'

// Define the DB name. We will call ours `anonymouz`
const dbName = 'anonymouz'

// Create a singleton variable `db`
let db

// The init function retruns a promise, which, once resolved,
// assigns the mongodb connection to the `db` variable
const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
})

const postName = (name) => {
    const names = db.collection('names',{
        validator:{
            $jsonSchema: {
                required:['name'],
                properties: {
                    name: {
                        bsonType: 'string',
                        description: 'Name is required',
                    },
                }
            }
        },
        validationAction: 'error'
    })
    //const collection = db.collection('names')
    //db.collection('names').createIndex({"name": 1},{unique: true})
    return names.insertOne(name)
}

const getNameId = () => {
    const collection = db.collection('names')
    var id = db.collection('names')._id
    return id
}

const firstPost = (post) => {
    const posts = db.collection('posts',{
        validator:{
            $jsonSchema: {
                required:['post'],
                properties: {
                    post:{
                        bsonType: 'string',
                        description: 'Post is required'
                    }
                }
            }
        },
        validationAction: 'error'
    })
    //const collection = db.collection('posts',)
    return posts.insertOne(post)
}

const getPosts = () => {
    const collection = db.collection('posts')
    return collection.find().toArray()
}

const getNames = () => {
    const collection = db.collection('names')
    return collection.find().toArray()
}

const getP = () => {
    return Post.find().populate('name')
}

module.exports = {init, postName, getNameId, firstPost, getPosts,getNames,getP}

/*//controllers for routes
let NameController = {
    find: async (req,res) => {
      let found = await nameSchema.find({name: req.params.username})
      res.json(found)
    },
    all: async (req,res) => {
      let allNames = await nameSchema.find()
      res.json(allNames)
    },
    create: async (req,res) => {
      let newName = await nameSchema(req.body);
      let savedName = await newName.save()
      res.json(savedName)
    },
    getAllNames: async (req,res) => {
      let foundName = await nameSchema.find({name: req.params.username}).populate("posts");
      res.json(foundName);
    }
  }
  
  let PostController = {
    find: async (req,res) => {
      let found = await postSchema.find({post: req.params.postname})
      res.json(found)
    },
    all: async (req,res) => {
      let allPosts = await postSchema.find()
      res.json(allNames)
    },
    create: async (req,res) => {
      let newPost = await postSchema(req.body);
      let savedPost = await newPost.save()
      res.json(savedPost)
    },
    getAllPosts: async (req,res) => {
      let foundPost = await postSchema.find({post: req.params.post}).populate("names");
      res.json(foundPost);
    }
  }
  */