---
title: " "
layout: splash
permalink: /
image_sliders:
  - slider1
html_sliders:
  - slider2
nortan_intro:
  - image_path: /assets/images/logo.svg
    alt: "A NORTAN"
    title: "A NORTAN"
    excerpt: "A Nortan é uma plataforma que conecta Você à Consultores Técnicos nas áreas de Construção Civil e Meio Ambiente, mantendo a garantia, credibilidade e segurança de uma Empresa. Fundada em 2020 a Nortan carrega uma missão: Impulsionar a vida profissional dos nossos Consultores Técnicos, proporcionando segurança e eficiência para os associados e para nossos clientes.


    Para isso proporcionamos um ambiente colaborativo de consultores de alta performance voltados para prestação de serviços relacionados à produção, gestão e solução de espaços para construção civil e meio ambiente. A Nortan fornece uma equipe capacitada de Consultores Técnicos para resolver o seu problema e tirar seu sonho do papel. Trabalhe com a Nortan e tenha soluções completas para todo o ciclo do empreendimento.


    Nossa visão é ser a maior rede colaborativa de consultores da construção civil e meio ambiente, sendo uma referência como uma rede de conexões que proporciona múltiplos canais de venda no mercado, segurança, visibilidade e valorização profissional. Conheça a Nortan, e experimente o que é trabalhar com especialistas."
areas_atuacao:
  - title: "ÁREAS DE ATUAÇÃO"
feature_rows:
  - image_path: /assets/images/arquitetura.jpg
    alt: "Arquitetura"
    title: "Arquitetura e Design de Interiores"
    excerpt: "Fazemos projetos arquitetônicos com foco nas pessoas. Nossa especialidade é elaborar espaços que estejam de acordo com as reais necessidades do usuário e de forma a proporcionar verdadeira qualidade de vida além de soluções sustentáveis."
    icon: "far fa-handshake"
    url: ""
    btn_class: "btn--success"
    btn_label: "CONTRATE JÁ"
    btn_align: "center"
  - image_path: /assets/images/projEstru.jpg
    alt: "Projeto Complementares"
    title: "Projeto Complementares"
    excerpt: ' "Por uma obra sem surpresas" esse é nosso propósito, e uma obra sem surpresas só acontece com projetos em BIM. Você não tem seus projetos em 3d? você não tem um orçamento modelado da sua obra? Você ainda fica dando jeitinho na obra? 
    Você precisa da Nortan Engenharia.'
    icon: "far fa-handshake"
    url: ""
    btn_class: "btn--success"
    btn_label: "CONTRATE JÁ"
    btn_align: "center"
  - image_path: /assets/images/imperm.jpg
    alt: "Impermeabilização"
    title: "Impermeabilização"
    excerpt: "Desde a fundação à cobertura, a impermeabilização tem o poder de proteger seu patrimônio e seu bem estar. Invista no time que entende, nosso líder Paulo Cunha é referência no Estado, não atoa trabalhamos nas maiores construtoras do Estado. Impermeabilização de reservatórios confinados, lajes, estacionamentos, piscinas, calhas, estamos à disposição."
    icon: "far fa-handshake"
    url: ""
    btn_class: "btn--success"
    btn_label: "CONTRATE JÁ"
    btn_align: "center"
  - image_path: /assets/images/mediaTensao.jpg
    alt: "Instalações Elétricas"
    title: "Instalações Elétricas"
    excerpt: "Energia Solar, Subestações, Redes de Média Tensão, instalações residenciais e comerciais. Com a experiência da equipe Nortan, sua instalação será eficiente e segura. E não se preocupe com a burocracia, nosso serviço só acaba com a obra aprovada e energizada."
    icon: "far fa-handshake"
    url: ""
    btn_class: "btn--success"
    btn_label: "CONTRATE JÁ"
    btn_align: "center"
  - image_path: /assets/images/gerenciamento.jpg
    alt: "Construção Civil"
    title: "Construção Civil"
    excerpt: "Projeto, planejamento, CONSTRUÇÃO. Você sonha e a gente realiza!Trabalhamos por uma obra eficiente, ou seja, que tenha alto padrão técnico e de qualidade, mas que seja econômica. Nossa equipe multidisciplinar garante isso, temos o time certo para construir o seu sonho."
    icon: "far fa-handshake"
    url: ""
    btn_class: "btn--success"
    btn_label: "CONTRATE JÁ"
    btn_align: "center"
  - image_path: /assets/images/recuHidro.jpg
    alt: "Recursos Hídricos e Meio Ambiente"
    title: "Recursos Hídricos e Meio Ambiente"
    excerpt: "Regularizar sua Licença Ambiental e sua Outorga é só o primeiro passo. Trabalhamos pela sustentabilidade do seu empreendimento, Trabalhamos para garantir água para que você não perca produção. Monitoramento, estudos, avaliação de impactos, consultoria. Vamos além do papel, levamos a engenharia para sua empresa."
    icon: "far fa-handshake"
    url: ""
    btn_class: "btn--success"
    btn_label: "CONTRATE JÁ"
    btn_align: "center"

contato:
  - title: "CONTATO"
    excerpt: "Av. Comendador Gustavo Paiva, Sala 28, Mezanino, Norcon Empresarial, 2789, Mangabeiras, Maceió, Alagoas, 57037-532<br>contato@nortanprojetos.com<br>(82) 99916-4578"
---

{% include slider.html selector="slider1" %}

{% include feature_row id="nortan_intro" type="left" img_style="padding: 50px;" %}

{% include feature_row id="areas_atuacao" type="wide" title_aligment="text-center" properties='data-aos="fade-up" style="border-bottom: 0px solid;"' %}

{% include feature_row_slider id="feature_rows" selector="slider2" properties='data-aos="fade-left"' title_size="h4" %}

{% include feature_row id="contato" type="center" properties='data-aos="fade-up" style="border-bottom: 0px solid;"' %}

{% include contact_map.html %}
