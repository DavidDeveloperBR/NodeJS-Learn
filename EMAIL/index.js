const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io' ,
    port: 2525,
    auth: {
      user: "d672086e8bb8ba",
      pass: "bc18cc495fc9ec"
    }
});


transporter.sendMail({
    from: 'David <david@mail.com>',
    to: 'to@mail.com',
    subject: 'Hello',
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err);
});