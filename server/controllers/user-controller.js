import userService from '../services/user-service.js'
import ApiError from '../exceptions/api-error.js'
import { validationResult } from 'express-validator'

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // throw ApiError.BadRequest('Validation error', errors.array())
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { email, password } = req.body
      const userData = await userService.createUser(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        httpOnly: true,
      })
      res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        httpOnly: true,
      })

      res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }
  async activate(req, res, next) {
    try {
      await userService.activate(req.params.link)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
