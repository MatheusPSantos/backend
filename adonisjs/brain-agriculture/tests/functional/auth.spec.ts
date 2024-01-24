import { test } from '@japa/runner'
import Usuario from 'App/Models/Usuario'

test.group('/auth', () => {
  test('deve registrar um novo usuario', async ({ client }) => {
    const userData = {
      email: 'test@example.com',
      senha: 'password123',
    }

    const response = await client.post('/registrar').json(userData)

    response.assertStatus(201)
  })

  test('não deve registrar um usuário com um e-mail existente', async ({ client }) => {
    const usuarioExistente = {
      email: 'existing@example.com',
      senha: 'password123',
    }
    await Usuario.create(usuarioExistente)
    const response = await client.post('/registrar').json({
      email: usuarioExistente.email,
      senha: 'password123',
    })

    response.assertStatus(500)
  })

  test('usuario deve fazer login', async ({ assert, client }) => {
    const userData = {
      email: 'test@example.com',
      senha: 'password123',
    }
    await Usuario.create(userData)

    const response = await client.post('/login').json(userData)
    response.assertStatus(201)
    assert.property(response.body(), 'token')
  })

  test('não deve logar com credencial inválida', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'nonexistent@example.com',
      senha: 'invalidPassword',
    })

    response.assertStatus(401)
  })
})
