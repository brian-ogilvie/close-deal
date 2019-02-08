# CloseDeal
CloseDeal is a clone of Etsy, or LetGo, where users can post items for sale, browse other products for sale by users, post reviews on products, and add products to their shopping cart.

## Deployed App
[CloseDeal](https://close-deal-app.herokuapp.com/)

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

### Wireframes
<details><summary>Landing Page</summary>
<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1549592574/Project%203/Wireframe--Landing%20Page.png" alt="landing page">
</details>
<details><summary>Product Detail Page</summary>
<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1549592630/Project%203/Wireframe--Product%20Detail.png" alt="product detail">
</details>

### Database Schema
<details><summary>ERD from LucidChart.com</summary>
<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1549583897/Project%203/Entity%20Relational%20Diagram.png" alt="ERD">
</details>

### Component Hierarchy
<details><summary>Component Wireframe from LucidChart.com</summary>
<img src="https://res.cloudinary.com/brian-ogilvie/image/upload/v1549522953/Project%203/Component%20Hierarchy.png" alt="hierarchy">
</details>

### Dependencies
#### Front-End
- react & react-dom
- react-router-dom
- axios
- moment

#### Back-End
- Express
- Morgan
- body-parser
- pg & pg-hstore
- sequelize

#### Back-End Authentication
- bcrypt
- passport
- passport-jwt
- jsonwebtoken
- jwt-decode

#### Misc
- Concurrently

### Dev Dependencies
- Nodemon

## Acknowledgements
User authentication was made possible by MANY tutorials, most noteably [this one](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669) by Rishi Prasad on Medium.
