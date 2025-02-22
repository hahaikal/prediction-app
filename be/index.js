const express = require('express');
const sequelize = require('./dbConfig')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 3000

const signUpRouter = require('./routers/signUp')
const signInRouter = require('./routers/signIn')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

sequelize.sync().then(() => {
    console.log('Database connected')
})
  
app.get('/', (req,res) => {
    res.status(200).json({
        Message : 'ok'
    })
})

app.use('/signup', signUpRouter)
app.use('/signin', signInRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})