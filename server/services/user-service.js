import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import ApiError from '../exceptions/api-error.js'
import UserModel from '../models/user-model.js'
import getUserDataResponse from '../utils/getUserDataResponse.js'
import mailService from './mail-service.js'
import tokenModel from '../models/token-model.js'
import tokenService from './token-service.js'

class userService {
  async createUser(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`Email: ${email} already registered`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserModel.create({ email, password: hashPassword, activationLink })
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}${process.env.PORT}/api/activate/${activationLink}`
    )

    const userDataResponse = getUserDataResponse(user)
    return userDataResponse
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })

    if (!user) throw ApiError.BadRequest('Incrorrect user link')

    user.isActivated = true
    await user.save()
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) throw ApiError.BadRequest(`${email} not found`)

    const passwordComparing = bcrypt.compare(password, user.password)
    if (!passwordComparing) throw ApiError.BadRequest('Incorrect password')

    const userDataResponse = getUserDataResponse(user)
    return userDataResponse
  }
  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError()

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = tokenService.findTokenFromDB(refreshToken)

    if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError()

    const user = await UserModel.findById(userData.id)
    const userDataResponse = getUserDataResponse(user)

    return userDataResponse
  }
  async getUsers() {
    const users = await UserModel.find()
    return users
  }
}

export default new userService()
