var nodemailer = require('nodemailer');
module.exports = async function (email, message, type, userName) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: String(process.env.EMAIL),
            pass: String(process.env.EMAIL_PASSWORD)
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions;
    if (type == "confirm") {
        mailOptions = {
            from: '"Phantom Contact" <' + String(process.env.EMAIL) + '>',
            to: email,
            subject: '👋 Please confirm your email',
            html: '<html><h1>  Hi,' + userName + ' 😊 </h1> <p> you should confirm your email to complete sign up </p> <h2> <a href="http:/localhost:8080/confirm?token=' + message + '&type=signup" target ="_blank">Confirm</a></h2></html>'
        };
    }
    else if (type == "forget Password") {
        mailOptions = {
            from: '"Phantom Contact" <' + String(process.env.EMAIL) + '>',
            to: email,
            subject: '👋 Please reset your password ',
            html: '<html><h1>   Hi,' + userName + ', 😊 </h1> <p> please, do not worry at all  </p> <p> follow this link to reset your password  </p> <h2> <a href="http:/localhost:8080/reset_password?token=' + message + '" target ="_blank">Reset Password</a></h2></html>'
        };
    }

    else if (type == "Delete account") {
        mailOptions = {
            from: '"Phantom Contact" <' + String(process.env.EMAIL) + '>',
            to: email,
            subject: '😔 Sure delete account ',
            html: '<html><h1>  Hi,' + userName + '  </h1> <p>Really, We are very sad because you will leave us </p> <p>We have been very happy with you </p> <p>follow this link  and return to us  <p></p> <h2> <a href=http:/localhost:8080" target ="_blank">phantom</a></h2></html>'
        };
    }
    else {
        mailOptions = {
            from: '"Phantom Contact" <' + String(process.env.EMAIL) + '>',
            to: email,
            subject: 'Phantom SAMA has A Message FOR YOU ^^',
            text: message
        };
    }

    transporter.sendMail(mailOptions);
    return 1;
};