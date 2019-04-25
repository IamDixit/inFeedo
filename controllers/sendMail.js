"use strict";
/* 
    *sendgrid - External API to send email
*/
const sgMail = require('@sendgrid/mail');
const config = require('../configurations/appConfig');
const logger = require('logger').createLogger('logs/app.txt');
sgMail.setApiKey(config.sendGrid);

const methods = {
  /* 
    *sendMail - Send Email to user 
    parms- toAddress, Msg
  */
  sendMail: function (toAddress, Msg) {
    let receiverMail;
    if(config.sendEmail == null){
      receiverMail = toAddress;
    } else{
      receiverMail = config.sendEmail;
    }
    const msg = {
      to: receiverMail,
      from: 'mailinfeedo@gmail.com',
      subject: 'Good Morning From Infeedo',
      html: Msg,
    };

    sgMail.send(msg)
      .then(res => {
        logger.info("Send email to: "+ receiverMail);
        console.log("Send email to: "+ receiverMail);
      }).catch(err => {
        console.log(err);
      });
  },

   /* 
      *constructMsg - Constructs HTML format email for user
      parms- data
  */
  constructMsg(data){
    let string = "<p>Hi, " + data.name + "<br/>Good Morning! Have a wonderful day ahead!</p>";
    string = string + "<h3>UserInfo</h3><p>"+ data.name + "<br/>Phone Number"+ data.phone + "<br/> Afflicated To: "+data.afflicated_to;
    this.sendMail(data.email, string);
  }
}

module.exports = methods;