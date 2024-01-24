/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/registrar', 'AuthController.register')
Route.post('/login', 'AuthController.login')

Route.group(() => {
  Route.post('', 'FazendasController.store')
  Route.patch('/:id', 'FazendasController.update')
  Route.get('', 'FazendasController.listQuantity')
  Route.get('/estado', 'FazendasController.listaQuantityPerState')
  Route.get('/cultura', 'FazendasController.listQuantityByCuture')
  Route.get('/solo', 'FazendasController.listPerSoilUsage')
  Route.get('/total', 'FazendasController.totalArea')
  Route.post('/culturas', 'CulturasController.store')
  Route.get('/culturas', 'CulturasController.list')
}).prefix('/fazenda').middleware('auth')

Route.group(() => {
  Route.post('', 'ProdutoresController.store')
  Route.patch('/:id', 'ProdutoresController.update')
  Route.delete('/:id', 'ProdutoresController.delete')
  Route.get('/:id', 'ProdutoresController.select')
  Route.get('', 'ProdutoresController.list')
}).prefix('/produtor').middleware('auth')
