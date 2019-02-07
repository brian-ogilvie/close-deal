# CloseDeal
The CloseDeal is a clone of Etsy, or LetGo, where users can post items for sale, browse other products for sale by users, post reviews on products, and add products to their shopping cart.

## Deployed App
[CloseDeal](http://doesntworkyet.com)

## To Contribute to Our Project

### Project Management
View our Kanban board on Trello [here](https://trello.com/b/Kokd8Ev1/project-3)


### Installation
- Fork and clone this repository
- <code>cd</code> into the new directory
- Enter the following commands in your Terminal or CLI:
    - <code>npm install</code>
    - <code>npm run db:init</code>
    - <code>npm run db:reset</code>
    - <code>npm run db:seed</code>
    - <code>npm start</code>
- Get to coding!

### Database Schema
<details><summary>ERD from LucidChart.com</summary>
<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1549293157/Project%203/Entity_Relational_Diagram.png" alt="ERD">
</details>

### Dependencies
#### Front-End
- react & react-dom
- react-router-dom
- axios

#### Back-End
- Express
- Morgan
- body-parser
- pg & pg-hstore
- bcrypt
- sequelize

#### Misc
- Concurrently

### Dev Dependencies
- Nodemon
