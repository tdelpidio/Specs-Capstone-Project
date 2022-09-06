let list = []
let reviewList = []

const sequelize = require('./sequelize')

module.exports = {
    addRestaurant: async (req,res) => {
        const {restaurant} = req.body
        await sequelize.query(`
        INSERT INTO restaurants (restaurant_name)
        VALUES ('${restaurant}')
        
        `)
        res.status(200).send(`Successfully added ${restaurant}`)
    },
    // getRestaurantList: async (req,res) => {
    //     let info = await sequelize.query(`
    //         SELECT * FROM restaurants
    //     `)
    //     res.status(200).send(info[0])
    // },

    addReview: async (req,res) => {
        const {review} = req.body
        reviewList.push(review)
        res.status(200).send('Thanks for your review!')
    },
    // deleteReview: async (req,res) => {
    //     const {id} = req.params
    //     reviewList.splice(1, id)
    //     res.status(200).send(reviewList)
    // }

}