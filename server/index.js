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

app.post('/api/addUser', async (req,res) => {
    const {firstName, lastName, email, password} = req.body
    const checkEmail = await sequelize.query(`
        SELECT * FROM users WHERE email_address = '${email}'
    `)
    if(checkEmail[1].rowCount !== 0){
        res.status(500).send('An account has already been made with this email')
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


app.get('/api/getRestaurantList', async (req,res) => {
    let info = await sequelize.query(`
        SELECT * FROM restaurants
    `)
    res.status(200).send(info[0])
}),

app.post('/api/addReview', async (req,res) => {
    const {review, enjoyed} = req.body
    await sequelize.query(`
    INSERT INTO reviews (review_notes, enjoyed)
    VALUES ('${review}',
    '${enjoyed}')
    
    `)
    res.status(200).send('Thanks for your review!')
})



app.listen(PORT, () => console.log(`Running on ${PORT}`))
