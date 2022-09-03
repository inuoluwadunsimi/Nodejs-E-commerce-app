const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')

const errorController = require('./controllers/error')
// const mongoConnect = require('./util/database').mongoConnect

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('6313e26cc2b9dd066e52d162')
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      console.log(err)
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect(
    'mongodb+srv://Inuoluwadunsimi:Thesaneman12_@cluster0.q9vetjz.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Inuoluwadunsimi',
          email: 'danielolaoladeinde@gmail.com',
          cart: {
            items: [],
          },
        })
        user.save()
      }
    })
    app.listen(4000)
  })
  .catch((err) => {
    console.log(err)
  })
