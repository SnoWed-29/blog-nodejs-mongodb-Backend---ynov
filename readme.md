# Blog API Routes and MongoDB Shell Equivalents

This API allows you to manage blogs and users. It includes routes for creating, reading, updating, and deleting blogs, as well as user registration and login.

## Base URL
http://localhost:3000/api

## Routes and MongoDB Shell Commands

### User Routes

#### Register a new user
- **Route:** `POST /users/register`
- **MongoDB Shell:** `db.users.insertOne({ username: "newuser", password: "hashedpassword" });`

#### Login a new user
- **Route:** `POST /users/register`
- **MongoDB Shell:** `db.users.findOne({ username: "newuser" });`

### Blog Routes 

#### Create Blog  
- **Route:** `POST /blogs/`
- **MongoDB Shell:** `db.blogs.insertOne({
  title: "Blog Title",
  content: "Blog Content",
    user: ObjectId("USER_ID")
});`

#### Get all Blog  
- **Route:** `GET /blogs/`
- **MongoDB Shell:** `db.blogs.insertOne({title: "Blog Title",content: "Blog Content",user: ObjectId("USER_ID")});`

#### Get single Blog  
- **Route:** `GET /blogs/:id`
- **MongoDB Shell:** `db.blogs.findOne({ _id: ObjectId("BLOG_ID") });`


#### update Blog  
- **Route:** `PUT /blogs/:id`
- **MongoDB Shell:** `db.blogs.updateOne({ _id: ObjectId("BLOG_ID") },{ $set: { title: "Updated Title", content: "Updated Content" } });`

#### delete Blog  
- **Route:** `DELETE /blogs/:id`
- **MongoDB Shell:** `db.blogs.deleteOne({ _id: ObjectId("BLOG_ID") });`

#### Get Blogs by User   
- **Route:** `GET /blogs/user/posts`
- **MongoDB Shell:** `db.blogs.find({ user: ObjectId("USER_ID") })`

#### Search Blogs   
- **Route:** `GET /blogs/search?title=SEARCH_TERM`
- **MongoDB Shell:** `db.blogs.find({ title: { $regex: "title", $options: "i" } });`
