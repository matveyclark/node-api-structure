const app = require('./app')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')

dotEnv.config({path: './config.env'})

const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection established! ')
})

const port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})