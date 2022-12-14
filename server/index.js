const express = require('express')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 4000
const sequelize = require('./sequelize')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())


//Endpoints

app.get('/api/getStates', async (req,res) => {
    let states = await sequelize.query(`
        SELECT * FROM states
    `)
    res.status(200).send(states[0])
}),

app.get('/api/getRestaurants', async (req,res) => {
    let restaurants = await sequelize.query(`
        SELECT * FROM restaurants
    `)
    res.status(200).send(restaurants[0])
}),

app.post('/api/addUser', async (req,res) => {
    const {firstName, lastName, email, password} = req.body
    const checkEmail = await sequelize.query(`
        SELECT * FROM users WHERE email_address = '${email}'
    `)
    if(checkEmail[1].rowCount !== 0){
        res.status(401).send('An account has already been made with this email')
    } else {
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        await sequelize.query(`
        INSERT INTO users(first_name, last_name, email_address, password)
        VALUES (
            '${firstName}',
            '${lastName}',
            '${email}',
            '${passwordHash}')
        `)
        const userInfo = await sequelize.query(`
        SELECT user_id, first_name, last_name, email_address FROM users WHERE email_address = '${email}'
        `)
    res.status(200).send(userInfo)
}
}),

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body
    const validUser = await sequelize.query (`
        SELECT * FROM users
        WHERE email_address = '${email}'
    `)
    if(validUser[1].rowCount === 1) {
        if(bcrypt.compareSync(password, validUser[0][0].password)){
            let userData = {
                id: validUser[0][0].user_id,
                name: validUser[0][0].first_name,
                email
            }
            res.status(200).send(userData)
        } else {
            res.status(401).send('Incorrect password')
        }
    } else {
        res.status(401).send('Incorrect email')
    }
})

app.post('/api/addRestaurant', async (req,res) => {
    const {name, type, city, state, website} = req.body
    await sequelize.query(`
    INSERT INTO restaurants (restaurant_name, restaurant_type,  city, state, website)
    VALUES ('${name}',
    '${type}',
    '${city}',
    '${state}',
    '${website}')
    
    `)
    res.status(200).send(`Successfully added!`)
}),

app.post('/api/getRestaurantList', async (req,res) => {
    const {state} = req.body
    console.log(req.body)
    const selectedState = await sequelize.query (`
        SELECT * FROM restaurants
        WHERE state = '${state}'
    `)
        res.status(200).send(selectedState[0])
}),

app.post('/api/addReview', async (req,res) => {
    const {user, name, review_notes} = req.body
    console.log(req.body)
    await sequelize.query(`
    INSERT INTO reviews (user_name, name, review_notes)
    VALUES ('${user}',
    '${name}',
    '${review_notes}')
    
    `)
    res.status(200).send('Thanks for your review!')
})

app.post('/api/getReview', async (req,res) => {
    const {restaurantName} = req.body
    console.log(req.body)
    const selectedReview = await sequelize.query (`
        SELECT * FROM reviews
        WHERE name = '${restaurantName}'
    `)
        res.status(200).send(selectedReview[0])
}),


app.listen(PORT, () => console.log(`Running on ${PORT}`))
