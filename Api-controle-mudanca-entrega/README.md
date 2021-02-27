# O que é uma apiREST?
Uma api rest tem como objetivo fornecer uma maior flexibilidade ao front end para o tratamento de dados, de forma que uma única api possa atender diferentes plataformas, assim permitindo que a construção de um único backend implementado com NodeJS possa servir para inúmeros projetos nas mais variadas linguagens ou simplesmente apenas para consulta de informações.

# Qual o motivo de usar Node neste projeto?
O nodeJS se trata de interpretador de JavaScript no qual permite o seu uso em aplicações backend para efetuar requisições ou obter respostas de um servidor, assim como o acesso à bancos de dados e etc.

# Algumas bibliotecas e ferramentas utilizadas no desenvolvimento do projeto
- Mongoose
- Express
- Nodemon
- Docker 
- MongoDB
- Insomnia
- Robo3T

# Alguns passos a serem seguidos
- Faça um clone do repositório e abra o terminal no diretório da pasta do projeto.
- Instale as dependências com o comando **npm install**.
- Instale o [Docker](https://www.docker.com)
- Agora com o docker instalado, no terminal digite **docker pull mongo**. Assim um container do mongoDB será instalado.
- Para inicializar o mongo, você deve redirecionar as portas através do comando **docker run --name mongodb -p 27017:27017 -d mongo**
- Use o comando **docker ps -a** para verificar se o container do mongo está rodando, caso não esteja basta digitar o comando
**docker start nomeDoContainer**
  
# Inicializando o servidor
- No terminal, utilize o comando **npm run dev**

# Alguns exemplos uso através do Insomnia (você pode testar em qualquer outra aplicação)
- BaseUrl a ser utilizada: http://localhost:3001/api
### Listagem de todos os elementos da base de dados (com uso de paginação para melhor desempenho)
![img](https://github.com/AlekOliveira/apiREST/blob/master/images/listagem.png)
### Listagem de um item específico
![img](https://github.com/AlekOliveira/apiREST/blob/master/images/itemespec.png)
### Update de um item específico
![img](https://github.com/AlekOliveira/apiREST/blob/master/images/update.png)
### Inclusão de um item
![img](https://github.com/AlekOliveira/apiREST/blob/master/images/create.png)













