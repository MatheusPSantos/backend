import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Produtor from 'App/Models/Produtor'
import { cnpj, cpf } from 'cpf-cnpj-validator'

export default class ProdutoresController {
  async store({ request, response }: HttpContextContract) {
    try {
      Logger.info('Criando um novo produtor')
      const payload = request.only(['nome', 'documento'])
      if (cnpj.isValid(payload.documento) || cpf.isValid(payload.documento)) {
        const { documento } = payload
        payload.documento = cnpj.isValid(documento) ? cnpj.format(documento) : cpf.format(documento)
        let produtor = await Produtor.findBy('documento', payload.documento).then((res) =>
          res?.toObject()
        )

        if (produtor) {
          Logger.info('um registro já existe para esse documento ', payload.documento)
          return response.conflict()
        }
        produtor = await Produtor.create(payload)
        Logger.info('produtor criado com sucesso')
        return response.created(produtor)
      } else {
        Logger.error('Cpf ou CNPJ inválido')
        return response.badRequest({
          message: 'O campo "documento" deve ser um cpf ou cnpj válido',
        })
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  async update({ request, response }: HttpContextContract) {
    try {
      const payload = request.only(['nome', 'documento', 'fazendas'])
      const id = request.param('id')
      Logger.info(`Editando os dados do produtor ${payload.documento}`)
      const produtor = await Produtor.find(id)
      if (produtor) {
        produtor.merge(payload)
        const resultado = await produtor.save()
        return response.ok(resultado)
      }
      return response.badRequest({ message: 'produtor não exite na base de dados' })
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async delete({ request, response }: HttpContextContract) {
    try {
      const id = request.param('id')
      Logger.info(`deletando usuario ${id}`)
      const produtor = await Produtor.findOrFail(id)
      await produtor.delete()
      return response.ok('produtor deletado com sucesso.')
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async select({ request, response }: HttpContextContract) {
    try {
      const id = request.param('id')
      const produtor = await Produtor.findOrFail(id)
      return response.ok(produtor)
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async list({ response }: HttpContextContract) {
    try {
      return response.ok(await Produtor.all())
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }
}
