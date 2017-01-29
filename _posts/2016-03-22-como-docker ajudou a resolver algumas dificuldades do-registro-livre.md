Em setembro comecei a trabalhar em um projeto Open Source chamado [Registro Livre](http://registrolivre.inf.br/#/) na [ThoughtWorks Brasil](https://medium.com/u/15bb753e5a63), que tem a intenção de criar um espaço onde contratos sociais, que podem ser obtidos em juntas comercias pelo Brasil, estejam mais acessíveis para facilitar o trabalho de jornalistas investigativos.

![Registro Livre um projeto Open Source para tornar aberto registros públicos](https://cdn-images-1.medium.com/max/800/1*ffx4MmRllrzqYZ2KTxxLUw.png)
Registro Livre um projeto Open Source para tornar aberto registros públicos

Como era um projeto que as pessoas desenvolviam em seu tempo livre, a rotatividade dos membros da equipe era grande, e queríamos encontrar uma forma fácil para que as novas pessoas pudessem contribuir, já que levava quase uma semana para configurar os ambientes de desenvolvimento.

Já havia uma abordagem através do Vagrant, que faz a virtualização de uma máquina inteira incluindo hardware e sistema operacional. Mas manter toda uma máquina virtual parecida com os ambiente de testes e produção era muito difícil, pois não era viável reproduzir o mesmo nos ambientes de Staging e Produção.

Foi então que surgiu a ideia de usar o Docker. Ele era capaz de nos ajudar nos dois problemas, tanto para termos um ambiente igual em todos os lugares, quanto para facilitar a entrada de novas pessoas no projeto.

![Docker](https://cdn-images-1.medium.com/max/800/1*Z2N3YdEpP4FqtIyawcHaZw.png){: .center-image}

Resolvemos primeiro atacar a dificuldade de montar o ambiente de desenvolvimento. Criamos dois Dockerfiles: um para a nossa aplicação e outro para o banco de dados.
O primeiro deles descreve como será nossa imagem para a app com Java 8 instalado e arquivo com extensão .jar para executá-la, como pode ser visto abaixo:

```
# Dockerfile_java
FROM java:openjdk-8-jdk
WORKDIR /usr/registrolivre
CMD java -jar registrolivre.jar
```

Já o segundo determina como será a imagem do banco de dados com Postgres e um script para popular alguns dados iniciais. Ao lidar com persistência de dados em containers, alguns cuidados são necessários - abordarei isso com detalhes em um próximo post.

```
# Dockerfile_db
FROM postgres:9.4
ADD create_initial_sgdb_data.sh /docker-entrypoint-initdb.d/create_initial_sgdb_data.sh
```

E para facilitar a nossa vida, também criamos um docker-compose, que é uma ferramenta do ecossistema Docker que nos ajuda a rodar e a conectar os dois containers, como no arquivo a seguir:

```
# docker-compose.yml
reglivre:
 image: registrolivre/java:latest
 restart: always
 ports:
   — “80:8080”
 links:
   — db
db:
 image: registrolivre/db
```

Como o Docker permite que tenhamos o mesmo ambiente em vários lugares virtualizando apenas um pequeno pedaço, conseguimos resolver o nosso problema de ter um ambiente igual em todos os lugares.

Com uma das nossas questões resolvidas, ficou faltando apenas facilitar a entrada de novos contribuidores. Para isso, utilizamos o Gradle como nosso gerenciador de tarefas para fazer tudo com somente um comando, que dividimos nas seguintes etapas:

dividimos nas seguintes etapas:
1. Fazer o build para gerar o nosso registrolivre.jar com toda a aplicação;
2. Criar as imagens que precisamos para executar os containers;
3. Copiar nosso jar para dentro do container;
4. E finalmente levantar nossos containers com banco de dados e aplicação, que vai executar o registrolivre.jar ao subir.

Chamamos esta tarefa de deployDocker, pois ela realiza o build e faz a aplicação rodar dentro do Docker. Assim todo novo contribuidor só vai precisar de poucos passos para rodar o Registro Livre:

- Baixar o código do [projeto no GitHub](https://github.com/ThoughtWorksInc/registrolivre);
- Instalar o Java, pois o Gradle precisa dele;
- Instalar o Docker Toolbox ou docker e docker-compose para quem usa Linux;
- Então rodar o comando mágico deployDocker e esperar a mágica acontecer.

**Não foram só flores, encontramos alguns espinhos**

Ao longo de todo esse processo passamos por algumas dificuldades com o Docker e o funcionamento de seu ecossistema. No início parece muita coisa para entender, mas isso faz parte do aprendizado e do crescimento do time. No time, fomos estudando cada um à sua maneira e compartilhando o conhecimento. Ao fim, valeu todo o esforço e conseguimos não só atingir o objetivo como também aprender com ele. Deixo aqui alguns materiais que nos ajudaram:

- O livro [Docker Up & Running](http://shop.oreilly.com/product/0636920036142.do), também disponível em português com o título [Primeiros passos com Docker](http://novatec.com.br/livros/primeiros-passos-docker/)
- O livro [Containers com Docker - do desenvolvimento a produção](https://www.casadocodigo.com.br/products/livro-docker)
- O [site do Rafael "Gomex" Gomes](http://techfree.com.br/), que tem muito conteúdo sobre Docker
- Além do site, ele tem um livro que está no LeanPub: https://leanpub.com/dockerparadesenvolvedores

### Conclusão
Depois de termos dificuldades por diferenças nos ambientes e passar por percalços para configurar o ambiente para novas pessoas no projeto, chega a dar prazer trazer uma nova pessoa para o time e ver como é fácil fazer tudo funcionar de forma tão simples hoje.
