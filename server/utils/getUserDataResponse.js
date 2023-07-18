import UserDto from '../dtos/user-dto.js'
import tokenService from '../services/token-service.js'

const getUserDataResponse = async user => {
  const userDto = new UserDto(user)
  const tokens = tokenService.generateToken({ ...userDto })
  await tokenService.saveToken(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userDto,
  }
}

export default getUserDataResponse
