import nodemailer from 'nodemailer'

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 587,
      secure: false,
      auth: {
        user: 'antonnode@mail.ru',
        pass: 'yiHMqB8iznJjX0DdLcCV',
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'antonnode@mail.ru',
      to,
      subject: 'Account activation for ' + process.env.API_URL,
      text: '',
      html: `
              <div>
                  <h1>Please click on the link to activate your account</h1>
                  <a href="${link}">${link}</a>
              </div>
          `,
    })
  }
}
export default new mailService()
