# Shoes-House API
## Description

This is a the backend repository for the React application `Shoes-House`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

### User

Users in the database have the following properties:

```js

const shoppingCartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  shoes: {
    type: []
  }},
);
module.exports = model("Cart", shoppingCartSchema);

const commentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  user_name:{
    type:String,
  },
  shoe_id: {
    type: Schema.Types.ObjectId, ref: 'Shoe',
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  }},
    {
    timestamps: true
    });
module.exports = model("Comment", commentSchema);

const shoesSchema = new Schema({
  brand: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  retailPrice: {
    type: Number,
  },
  size:{
    type:[],
    default:[36,37,38,39,40,41,42,43,44,45,46,47]
  },
    media: {
    type: [],
  }
});
module.exports = model("Shoe", shoesSchema);

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
  {
    timestamps: true
  });
module.exports = model("User", userSchema);

```
---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |
| GET all comments | GET | /api/v1/comments/:id | { id } | Private |
| POST a comment | POST | /api/v1/comments/:shoeId | { text, rating, user_name, shoeId, _id | Private |
| PUT a comment | PUT | /api/v1/comments/:commentId | { text, rating, commentId, _id | Private |
| DELETE a comment | DELETE | /api/v1/comments/:id | { commentId, _id } | Private
---

## Useful links

- [Presentation slides](https://slides.com/elurgonzalezr/minimal)
- [Frontend repository](https://github.com/elugon/ShoesHouse-Frontend)
- [Frontend deploy](https://shoes-house.netlify.app/)
- [Deployed REST API](https://shoes-house.herokuapp.com/)

