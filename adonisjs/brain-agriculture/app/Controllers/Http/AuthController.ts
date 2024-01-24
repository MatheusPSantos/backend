import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Usuario from 'App/Models/Usuario'

export default class AuthController {
  async register({ request, response, auth }: HttpContextContract) {
    try {
      const payload = request.only(['email', 'senha'])
      const usuario = await Usuario.create(payload)
      const token = await auth.use('api').attempt(payload.email, payload.senha)
      return response.created({ usuario, token })
    } catch (error) {
      Logger.error(error)
      return response.internalServerError('Usuario ja existe')
    }
  }

  async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload = request.only(['email', 'senha'])
      const token = await auth.use('api').attempt(payload.email, payload.senha)
      return response.created(token)
    } catch (error) {
      Logger.error(error)
      return response.unauthorized()
    }
  }
}
