import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Fazenda from './Fazenda'

export default class Produtor extends BaseModel {
  public static table = 'produtores'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public documento: string

  @hasMany(() => Fazenda)
  public fazendas: HasMany<typeof Fazenda>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
