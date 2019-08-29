# Open-Encoder API
##### Frontend
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Sobre a aplicação
O Open-Encoder é uma aplicação criada com o intuito de ser uma plataforma aberta de encoding de vídeos. 

A aplicação em front-end funciona mantendo uma lista de Encodings feitos no **Local Storage** do navegador. Dessa forma, você não perde os seus encodings mesmo quando o navegador é fechado, ou quando você sai da página. 

**A sua lista de encodings é sempre mantida a não ser que os dados temporários do navegador sejam excluídos.**

A aplicação tem a funcionalidade de converter arquivos de vídeo de um formato **não compatível** com os padrões da web para um formato que seja **compatível** com os padrões da web. 


#### Link da API REST: https://api.open-encoder.caiovitor.com:8080/
#### Link do projeto backend no GitHub: https://github.com/caiovitord/Backend-Open-Encoder

### Features do front-end
* ##### Comunicação de **rede criptografada**, utilizando protocolo HTTPS
* ##### Conteinerização da aplicação por meio de **Docker**

# Como compilar e executar o seu próprio site

### 1 - Configurar o ambiente
Você pode criar a sua própria instância do front-end do Open-Encoder. Para isso, é necessário ter o ambiente configurado com o **NodeJS**.

### 2 - Clonar o projeto
Com o ambiente de desenvolvimento configurado com o Node, faça o download deste projeto.
Abra a pasta raiz do projeto com a sua IDE preferida.
##### Recomendo que seja utilizado o ambiente Visual Studio Code

### 3 - Configurar o endpoint da API REST
O primeiro e único passo para configurar a sua aplicação é inserir o endpoint do seu backend.

Navegue pelo projeto até o arquivo **confguration.ts**, contido em src\environments\configuration.ts


Observe o código-fonte:
```sh
export const APP_CONFIGURATION = {
  serverBaseUrl: "https://api.open-encoder.caiovitor.com:8080" + "/api/v1"
};
```
Agora basta substituir https://api.open-encoder.caiovitor.com:8080 pelo seu endpoint.
Simples assim! O seu projeto está pronto para ser compilado e testado.

## 3 - Compilar

Após trocar o seu endpoint, execute os seguintes comandos:
```sh
npm install
ng serve
```
O primeiro build pode demorar alguns minutos, até que o NodeJS faça download de todas as bibliotecas.
Após executar o comando ng serve, o seu site já está disponível na porta 4200

Acesse: http://localhost:4200

# Como fazer um deploy em um servidor NGINX utilizando Docker
O docker é a forma mais prática de criar uma instância do seu servidor. 
O docker cria um *container* para a sua aplicação rodar isoladamente, facilitando assim o gerenciamento e o *deploy* da sua aplicação.
Saiba mais sobre o docker com os seguintes links:
 - [Tutorial oficial de como instalar o Docker no Windows ](https://docs.docker.com/docker-for-windows/install/)
 - [Tutorial oficial de como instalar o Docker no Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
 - [Site oficial do Docker](https://www.docker.com/get-started)
 - [Comandos básicos do Docker](https://medium.com/dockerbr/principais-comandos-docker-f9b02e6944cd)

Agora que você já tem o Docker instalado, vamos compilar a sua aplicação em uma **imagem docker**. 
Em seguida, vamos criar um **container** que executa uma instância dessa imagem compilada.

Para compilar a sua imagem, execute o seguinte comando na pasta raiz no projeto.
```sh
docker build -t front-open-encoder .
```
Atenção! 
 - Existe um **ponto** no final do comando acima.
 - Pode ser necessário executar o comando como administrador.

Com isso, aguarde o docker compilar a sua aplicação e gerar uma imagem.
Após finalizar o **build**, você já pode criar um **container** que executa o servidor.

Para isso, rode o seguinte comando. Observe que você pode optar por alterar a porta de serviço do servidor.
```sh
##Configurando o servidor para executar na porta 80
docker run -p 80:80 front-open-encoder

##Configurando o servidor para executar na porta 81
docker run -p 81:80 front-open-encoder
```
Após rodar o comando acima, o console irá te mostrar o output da aplicação em funcionamento. 

#### Pronto! O seu servidor NGINX já está sendo executado e o seu site já está acessível  na porta escolhida.

Caso você não esteja familiarizado com o docker, não deixe de conferir os links acima para saber como gerenciar as suas aplicações (containers).


# Verificar o funcionamento do servidor

Agora que sua aplicação já está rodando, você deve verificar se ela está funcionando.
No seu navegador preferido, acesse o link da aplicação por meio do IP local ou domínio.

Acesse no browser, o link do tipo:
 - http://localhost:4200 (Caso tenha utilizado o comando **ng serve**)
 - http://192.168.1.16 (Ip ou domínio do computador com servidor NGINX)


Agora você pode desfrutar da sua própria API REST de codificação de vídeos.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
