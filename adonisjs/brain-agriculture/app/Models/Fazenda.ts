import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Cultura from './Cultura'

export default class Fazenda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public area_total: number

  @column()
  public produtor_id: number

  @column()
  public endereco_id: number

  @column()
  public area_agricultavel: number

  @column()
  public area_vegetacao: number

  @manyToMany(() => Cultura, {
    pivotTable: 'fazenda_cultura',
    localKey: 'id',
    pivotForeignKey: 'fazenda_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'cultura_id',
  })
  public culturas: ManyToMany<typeof Cultura>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
