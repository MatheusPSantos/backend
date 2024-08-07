import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fazendas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('produtor_id').unsigned().references('id').inTable('produtores').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('produtor_id')
    })
  }
}
