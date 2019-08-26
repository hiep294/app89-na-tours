const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
   }
})

module.exports = (order) => {
   const clientURL = process.env.CLIENT_URL
   const token = jwt.sign({ orderId: order._id }, process.env.JWT_SECRET, {
      expiresIn: '999 days'
   })
   // set link: url/confirmation?orderId=token
   const confirmedLink = `${clientURL}/confirmation?token=${token}`
   const mailOptions = {
      from: `${process.env.USER_EMAIL}`,
      to: `${order.email}`,
      subject: `Natour Order Confirmation ID ${order._id}`,
      html: `
         <p>Dear ${order.name.split(' ')[0]},</p>
         <p>This email is sent from ${clientURL}. We have recently received your order of our tour:</p>
         <div>
            <h2>${order.typeTour}</h2>
            <ul>
               <li>Name: ${order.name}</li>
               <li>Phone: ${order.phone}</li>
               <li>Address: ${order.address}</li>
               <li>Total: $${order.total}</li>
               <li>Order At: ${moment((order.createdAt)).format('DD/MM/YY HH:mm')}</li>
            </ul>
         </div>
         <p>Please confirm your order by clicking the following link</p>
         <a href="${confirmedLink}" target="_blank">${confirmedLink}</a>
         <p>Best regards,</p>
         <p>Natours team!</p>
      `
   }

   transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log('Email sent: ' + info.response)
      }
   })
}
