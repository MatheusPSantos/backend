import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'
import Cultura from 'App/Models/Cultura'
import Endereco from 'App/Models/Endereco'
import Fazenda from 'App/Models/Fazenda'
import Produtor from 'App/Models/Produtor'
import { cnpj, cpf } from 'cpf-cnpj-validator'

export default class FazendasController {
  async store({ request, response }: HttpContextContract) {
    try {
      Logger.info('cadastrando uam fazenda')
      const payload = request.only([
        'nome',
        'cidade',
        'estado',
        'area_total',
        'area_agricultavel',
        'area_vegetacao',
        'culturas',
      ])

      const { produtor_doc } = request.qs()
      let documentoProdutorFormatado

      if (cnpj.isValid(produtor_doc)) {
        documentoProdutorFormatado = cnpj.format(produtor_doc)
      }

      if (cpf.isValid(produtor_doc)) {
        documentoProdutorFormatado = cpf.format(produtor_doc)
      }

      const produtor = await Produtor.findBy('documento', documentoProdutorFormatado).then((res) =>
        res?.toObject()
      )
      if (!produtor) {
        return response.notFound('produtor não cadastrado ou não encontrado pelo documento.')
      }

      if (payload.area_agricultavel + payload.area_vegetacao > payload.area_total) {
        return response.badRequest(
          'a soma da área de vegetação e de agricultável não deve ser maior que a áre total'
        )
      }

      const novoEndereco = await Endereco.create({
        cidade: payload.cidade,
        estado: payload.estado,
      })

      const novaFazenda = new Fazenda()
      novaFazenda.nome = payload.nome
      novaFazenda.area_agricultavel = payload.area_agricultavel
      novaFazenda.area_total = payload.area_total
      novaFazenda.area_vegetacao = payload.area_vegetacao
      novaFazenda.endereco_id = novoEndereco.id
      novaFazenda.produtor_id = produtor.id

      if (payload.culturas && payload.culturas.length > 0) {
        await novaFazenda.save()
        const culturas = await Cultura.query()
          .whereIn('id', payload.culturas)
          .exec()
          .then((res) => res.map((r) => r.$attributes.id))
        await novaFazenda.related('culturas').attach(culturas)
      }
      await novaFazenda.save()

      Logger.info('salvando endereco da fazenda')
      return response.created(payload)
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async update({ request, response }: HttpContextContract) {
    try {
      const fazendaId = request.param('id')
      const payload = request.only([
        'nome',
        'area_total',
        'area_vegetacao',
        'area_agricultavel',
        'culturas',
      ])

      const fazenda = await Fazenda.findBy('id', Number(fazendaId))
      if (fazenda) {
        fazenda.merge(payload)

        if (payload.culturas && payload.culturas.length > 0) {
          await fazenda.save()
          const culturas = await Cultura.query()
            .whereIn('id', payload.culturas)
            .exec()
            .then((res) => res.map((r) => r.$attributes.id))
          await fazenda.related('culturas').attach(culturas)
        }

        const fazendaAtual = await fazenda.save()
        return response.ok(fazendaAtual)
      }

      return response.badRequest('Fazenda não encontrada ou não existe')
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async listQuantity({ response }: HttpContextContract) {
    try {
      const quantidade = await (await Fazenda.all()).length
      return response.ok({ quantidade })
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async listaQuantityPerState({ response }: HttpContextContract) {
    try {
      const porEstado = await Database.rawQuery(`
        SELECT e.estado AS estado, COUNT(f.id) AS quantidade_fazendas
        FROM fazendas f JOIN enderecos e ON f.endereco_id = e.id
        GROUP BY e.estado;
      `)

      return response.ok(porEstado.rows)
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async listQuantityByCuture({ response }: HttpContextContract) {
    try {
      const porCultura = await Database.rawQuery(`
        SELECT c.nome AS cultura,	COUNT(fc.fazenda_id) AS quantidade_fazendas
        FROM culturas c JOIN fazenda_cultura fc ON c.id = fc.cultura_id
        GROUP BY c.nome;
    `)
      return response.ok(porCultura.rows)
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async listPerSoilUsage({ response }: HttpContextContract) {
    try {
      const porUsoDoSolo = await Database.rawQuery(`
        SELECT SUM(area_vegetacao) AS total_vegetacao, SUM(area_agricultavel) AS total_agricultavel
        FROM fazendas;
      `)
      return response.ok({ area: porUsoDoSolo.rows[0], unidade: 'ha' })
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }

  async totalArea({ response }: HttpContextContract) {
    try {
      const totalarea = await Database.rawQuery(`SELECT SUM(area_total) AS total FROM fazendas;`)
      return response.ok({ area: totalarea.rows[0], unidade: 'ha' })
    } catch (error) {
      Logger.error(error)
      return response.internalServerError()
    }
  }
}
