import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fazendas'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('endereco_id').unsigned().references('enderecos.id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('endereco_id')
    })
  }
}
