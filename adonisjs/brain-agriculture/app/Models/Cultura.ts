import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cultura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static capitalizaNomeCultura(cultura: Cultura) {
    if (cultura.$dirty.nome) {
      if (cultura.nome.length > 0) {
        const palavras = cultura.nome.split(' ')
        const textoCapitalizado = palavras
          .map((palavra) => {
            return palavra.charAt(0).toUpperCase() + palavra.slice(1)
          })
          .join(' ')

        return textoCapitalizado
      }
    }
  }
}
