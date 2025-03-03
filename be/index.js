const express = require('express');
const sequelize = require('./config/dbConfig')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 3000

const signUpRouter = require('./routers/signUp')
const signInRouter = require('./routers/signIn')
const addMatchRouter = require('./routers/addMatch')
const getMatchRouter = require('./routers/data')

app.use(cors())
app.use(express.json())
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
app.use('/addMatch', addMatchRouter)
app.use('/getMatch', getMatchRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})