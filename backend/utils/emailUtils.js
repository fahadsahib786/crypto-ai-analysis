import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
});

const sendOtpEmail = async (username,to, otp) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to,
    subject: 'Your OTP Code',
    text: `
    Dear ${username},

      Your One-Time Password (OTP) code is: **${otp}**

      Please use this code to complete your authentication. If you did not request this OTP, please ignore this message.

      Thank you for your attention.

      Best regards,  
      Smallcap.ai
    
    `,
  };

  await transporter.sendMail(mailOptions,(error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      reject('Error sending email: ' + error.toString());
    } else {
      console.log(`Email sent: ${info.response}`);
      resolve('Email sent: ' + info.response);
    }
  });
};

const sendAnalysisEmail = async (to,analysis) => {
  console.log(analysis)
  const mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to,
    subject:"Token Analysis Report",
    text:analysis
  }

  return new Promise((resolve,reject) => {
    transporter.sendMail(mailOptions,(err,info) => {
      if(err){
        console.log(`Error while sending Analysis Email ${err} `)
        reject(`Error while sending Analysis Email ${err} `)
      }else{
        console.log(`Analysis Email sent Sucessfully ${info.response}`)
        resolve("Success")
      }
    })
  })
}


const sendSubscriptionEmail = async (to, plan) => {
    const mailOptions = {
      from: process.env.EMAIL_SERVICE_USER,
      to,
      subject: 'Subscription Update',
      text: `You have successfully subscribed to the ${plan} plan.`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  export { sendOtpEmail, sendSubscriptionEmail,sendAnalysisEmail };
  