Para ter acesso à documentacão de uso dos endpoints, basta  rodar o comando na pasta do projeto. Construido a partir do `endpoints-documentacao.json`.

```bash
npx serve docs 
```

Assim, acesse a url http://localhost:3000 para ver a documentacão das rotas da API


Ao rodar o projeto:

Subir o banco de dados, rodar o comando na pasta do projeto
```bash
docker-compose up -d
```

E rodar a API: 

```bash
npm run dev
```

Pode ser preciso alterar a variável de ambiente `PG_HOST`, caso não seja possível conectar ao banco de dados.

Para sabem qual o valor de `PG_HOST`, rode o comando:

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}' CONTAINER_ID
```
O comando retorna um IP, e você pode usar esse valor na variável `PG_HOST`. 
