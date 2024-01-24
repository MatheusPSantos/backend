import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cultura from 'App/Models/Cultura'

export default class extends BaseSeeder {
  public async run() {
    await Cultura.createMany([
      { nome: 'Soja' },
      { nome: 'Milho' },
      { nome: 'Algodão' },
      { nome: 'Café' },
      { nome: 'Cana de Açucar' },
    ])
  }
}
