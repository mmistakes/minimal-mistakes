---
layout: single
title: "IoT Hands On"
permalink: /iot-hands-on/
author_profile: false
sidebar:
  nav: "sbrc"
---

# Rede de objetos inteligentes IPv6

No primeiro experimento prático, será criada uma rede IPv6 de objetos inteligentes utilizando Cooja. O Contiki oferece uma implementação do 6LoWPAN em conjunto com o protocolo de roteamento RPL. Além disso, o SO também oferece suporte à pilha de protocolos µIP TCP/IP (veja Seção 1.3.3). Para começar, inicie o Cooja através do atalho da área de trabalho ou execute o comando abaixo e, em seguida, crie uma nova simulação ou compile o código para um nó real:
{: style="text-align: justify;"}

Inicie o Cooja executando os comandos abaixo:

```sh 
$ cd <DIR>+contiki/tools/cooja/
$ ant run
```

Para experimentação em nós reais, programe-os com os comandos abaixo:

```sh
$ cd <DIR>+contiki/examples/ipv6/sky-websense/
$ make TARGET=sky sky-websense.upload
```

Dando seguimento à prática, dispositivos [Tmote Sky](http://www.eecs.harvard.edu/~konrad/projects/shimmer/references/tmote-sky-datasheet.pdf){:target="_blank"} serão emulados. Um dos motes servirá como roteador de borda da rede de objetos IPv6. O roteador de borda é o dispositivo responsável por configurar um prefixo de rede e iniciar a construção da árvore de roteamento do RPL. Em outras palavras, o roteador de borda nada mais é que a raiz da árvore de roteamento e interlocutor entre a rede de objetos e a rede externa.
{: style="text-align: justify;"}


O código do roteador de borda está localizado em:

```sh
$ <DIR>+contiki/examples/ipv6/rpl-border-router/border-router.c
```

Com o Cooja aberto, vá até a aba de criação de mote e adicione um Sky mote. Na tela seguinte, compile e carregue, como firmeware, o código do roteador de borda. Finalmente adicione **1 mote** deste tipo.
{: style="text-align: justify;"}


Para experimentação em nós reais, remova todos os nós programados do websense.
Em seguida, programe o roteador de borda com o RPL:
{: style="text-align: justify;"}

```sh
$ cd <DIR>+contiki/examples/ipv6/sky-websense/
$ make TARGET=sky border-router.upload
```

Após configurar o roteador de borda, a próxima etapa é povoar a rede com objetos inteligentes (isto se estiver realizando simulação, pois já programamos nos passos anteriores os motes com o firmware sky-websense). O código `sky-websense.c` ajudará nesta fase.
{: style="text-align: justify;"}

O código do `sky-websense.c` está localizado em:

```sh
$ <DIR>+contiki/examples/ipv6/sky-websense/sky-websense.c
```

Este código é uma aplicação que produz “dados sensoriados” e prover acesso a estas informações via webserver. Adicione alguns motes desse tipo. É recomendável que o leitor investigue o código sky-websense.c para entender o que ele faz. Retorne para o Cooja. Na aba chamada “Network”, localize o roteador de borda e no seu menu de contexto selecione a opção mostrada abaixo. O Cooja informará que o roteador de borda criou um socket e está escutando na porta local `60001`. Em seguida inicialize a simulação.
{: style="text-align: justify;"}

No Menu-Contexto do Roteador de Borda selecione:

```sh
“Mote tools for sky/Serial socket (SERVER)"
```

Abra um novo terminal e execute os seguintes comandos:
{: style="text-align: justify;"}

Comandos para executar o programa `tunslip6`

Para simulação:

```sh
$ cd <DIR>+contiki/examples/ipv6/rpl-border-router/
$ make connect-router-cooja TARGET=sky
```

Se estiver executando em motes reais:

```sh
$ cd <DIR>+contiki/examples/ipv6/rpl-border-router/
$ make connect-router

Reinicie o roteador de borda (pressionando o botal reset no dispositivo) e note o endereço exibido do dispositivo
```

Estes comandos acabam por executar o programa `tunslip6`. O programa configura uma interface na pilha de protocolos do Linux, em seguida, conecta a interface ao socket em que o roteador de borda está escutando. O `tunslip6` fará com que todo o tráfego endereçado ao prefixo `aaaa::` seja direcionado para a interface do Cooja.
{: style="text-align: justify;"}

O `tunslip6` apresentará uma saída semelhante a mostrada na caixa de título Terminal 2 e o Cooja apresentará algo como mostrado na figura ao lado. Agora já é possível verificar se os Tmotes Sky emulados estão acessíveis através de ferramentas como o `ping6`.
{: style="text-align: justify;"}

<figure>
	<a href="/assets/images/sim-border-router.png"><img src="/assets/images/sim-border-router.png" alt="Simulation of the border router CONTIKI-OS."></a>
	<figcaption><a href="#" title="">Simulation of the border router CONTIKI-OS.</a></figcaption>
</figure>

Realize testes com os seguintes comandos:

```sh
$ ping6 aaaa::212:7401:1:101 (Roteador de borda)
$ ping6 aaaa::212:7402:2:202 (Tmote rodando sky-websense)

Note que o endereço para dispositivos reais terá um identificador de host diferente dos exibidos acima. 
```

Em seu navegador, acesse o endereço do roteador de borda `http://[aaaa::212:7401:1:101]/`
{: style="text-align: justify;"}

A rede de exemplo possui três motes e apresenta topologia exibida na figura abaixo, em que `˜:101` é o roteador de borda.
{: style="text-align: justify;"}

<figure>
	<a href="/assets/images/network-topology.png"><img src="/assets/images/network-topology.png" alt="Simulation of the border router CONTIKI-OS."></a>
	<figcaption><a href="#" title="Network Topology.">Network Topology.</a></figcaption>
</figure>

O Roteador de Borda responderá com:

```
Neighbors
fe80::212:7402:2:202
Routes
aaaa::212:7402:2:202/128 via fe80::212:7402:2:202 16711412s
aaaa::212:7403:3:303/128 via fe80::212:7402:2:202 16711418s
```

A resposta à requisição feita ao roteador de borda conterá duas partes. A primeira exibe a tabela de vizinhança, ou seja, os nós diretamente ligados na árvore de roteamento do RPL (Neighbor Table). A segunda lista os nós alcançáveis (Routes) e o próximo salto na rota até aquele destinatário.
{: style="text-align: justify;"}

Agora acesse, pelo navegador, os recursos (luminosidade e temperatura) providos pelos Tmotes rodado sky-websense como mostrado a seguir:
{: style="text-align: justify;"}

```
Neighbors
http://[IPv6 do Tmote]/
http://[IPv6 do Tmote]/l
http://[IPv6 do Tmote]/t
```

Exemplo de requisição:

```
Neighbors
http://[aaaa::212:7403:3:303]/l
```

Exemplo de resposta:`http://[aaaa::212:7403:3:303]/l`

<figure>
	<a href="/assets/images/websense-response.png"><img src="/assets/images/websense-response.png" alt="Simulation of the border router CONTIKI-OS."></a>
	<figcaption><a href="#" title="Websense Response.">Websense Response.</a></figcaption>
</figure>

# Erbium (Er) REST: Uma implementação CoAP no Contiki-OS

{% include video id="62dzCelBwIk" provider="youtube" %}


Esta prática abordará o uso de Representational State Transfer (REST) – Transferência de Estado Representacional. Para tanto, será utilizado o Erbium (Er), uma implementação do IETF CoAP de RTF 7252. O Er foi projetado para operar em dispositivos de baixa potência e tem código livre disponível junto com o sistema operacional Contiki. Para iniciar será feita uma breve revisão da implementação e uso do CoAP no Contiki.
{: style="text-align: justify;"}

A versão para dispositivos reais é apresentada em vídeo (veja aqui)
{: style="text-align: justify;"}

## CoAP Erbium Contiki

Nesta etapa será apresentado o uso do Erbium Contiki.

Mude para o seguinte diretório:

```sh
$ cd <DIR>+/contiki/examples/er-rest-example/
```

Neste diretório existe uma conjunto de arquivos de exemplo do uso do Erbium. Por exemplo, o arquivo er-example-server.c mostra como desenvolver aplicações REST do lado servidor. Já er-example-client.c mostra como desenvolver um cliente que consulta um determinado recurso do servidor a cada 10s. Antes de iniciar a prática é conveniente realizar algumas configurações. A primeira delas diz respeito aos endereços que serão utilizados. Deste modo, realize as operações abaixo:
{: style="text-align: justify;"}

Defina os endereços dos Tmotes no arquivo /etc/hosts

```
Adicione os seguintes mapeamentos:
aaaa::0212:7401:0001:0101 cooja1
aaaa::0212:7402:0002:0202 cooja2
```

Além disso, adicione a extensão Copper (CU) CoAP user-agent no Mozilla Firefox.

No arquivo er-example-server.c verifique se as macros “REST_RES_[HELLO e TOGGLE]” possuem valor 1 e as demais macros em 0. Em caso negativo, modifique de acordo. Agora as configurações preliminares estão prontas.
{: style="text-align: justify;"}

Na pasta do exemplo Erbium Rest execute o comando abaixo:

```sh
$ make TARGET=cooja server-only.csc
```

Este comando iniciará uma simulação previamente salva. Esta simulação consta 2 dispositivos Tmotes, o dispositivo de ID 1 é um roteador de borda e o ID 2 emula um dispositivo executando er-example-server.c como firmeware.
{: style="text-align: justify;"}

Em um novo terminal execute o comando abaixo:

```sh
$ make connect-router-cooja
```

Como na primeira prática anterior, este comando executará o programa tunslip6 e realizará o mesmo procedimento anteriormente citado. Inicie a simulação, abra o Mozilla Firefox e digite: coap://cooja2:5683/
{: style="text-align: justify;"} 

{% include figure image_path="/assets/images/copper-cooja2.png" alt="Cooja and Cooper" caption="Cooja and Cooper." %}{: .align-center}

Como resultado o Mozilla Firefox deverá abrir o ambiente do Copper. A Figura 1.12 exemplifica a situação atual. No lado esquerdo é possível verificar os recursos disponíveis pelo servidor (cooja2). Para experimentar os recursos providos pelo cooja2, selecione o recurso “hello”. Note que a URI foi alterada, em seguida, pressione o botão “GET” do ambiente Copper e observe o resultado. Já no recurso “toggle” pressione o botão “POST” e observe que o LED RED do cooja2 (no simulador) estará ligado, repita o processo e verifique novamente o LED.
{: style="text-align: justify;"}

É recomendável que os leitores alterem os recursos disponíveis pelo cooja2 no arquivo er-example-server.c modificando os recursos ativos no CoAP server convenientemente. Para fazer isto, comente ou descomente os “rest_activate_resource()” presentes no código. No material extra do curso, existem outras simulações e exemplos de uso. Vale ressaltar, que o mote emulado (Tmote Sky) apresenta limitações de memória, como a maioria, dos objetos inteligentes e, por esse motivo, nem sempre todos os recursos poderão está ativo ao mesmo tempo. Em caso de excesso de memória, o simulador ou compilador para o dispositivo alertará tal problema.
{: style="text-align: justify;"}

##### Fontes

* [Contiki example Sky websense](https://github.com/contiki-os/contiki/tree/master/examples/ipv6/sky-websense)

* [A Quick Introduction to the Erbium (Er) REST Engine](https://github.com/contiki-os/contiki/tree/master/examples/er-rest-example)