import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fazendas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('fazenda_cultura_id').unsigned().references('id').inTable('fazenda_cultura')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fazenda_cultura_id')
    })
  }
}
