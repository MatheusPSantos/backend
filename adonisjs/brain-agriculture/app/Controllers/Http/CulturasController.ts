import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Cultura from 'App/Models/Cultura'

export default class CulturasController {
  async store({ request, response }: HttpContextContract) {
    Logger.info('adicionando uma cultura ao sistema.')
    const payload = request.only(['nome'])
    let cultura = await Cultura.findBy('nome', payload.nome)

    if (cultura) {
      return response.conflict()
    }
    cultura = await Cultura.create(payload)
    return response.created(cultura)
  }

  async list({ response }: HttpContextContract) {
    Logger.info('retornando as culturas existentes no sistema.')
    return response.ok(await Cultura.all())
  }
}
