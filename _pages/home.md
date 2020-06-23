---
title: " "
layout: splash
permalink: /
image_sliders:
  - slider1
nortan_intro:
  - image_path: /assets/images/logo.svg
    alt: "A NORTAN"
    title: "A NORTAN"
    excerpt: "Nortan Projetos foi fundada em 2020 com um propósito: transformar conhecimento e informação em resultados financeiros em benefício de nossos consultores e parceiros.<br><br>
    A Nortan proporciona um ambiente colaborativo de consultores de alta performance voltados para a prestação de serviços relacionados à produção, gestão e solução de espaços para construção civil e meio ambiente.<br><br>
    Nossa visão é ser a maior rede colaborativa de consultores de engenharia e arquitetura, sendo referência como uma rede de conexões que proporciona múltiplos canais de venda no mercado, segurança, visibilidade e valorização profissional.<br><br>Trabalhe com a Nortan de qualquer lugar do Brasil e descubra o seu valor."
    btn_label: "Saiba mais"
    btn_class: "btn--inverse"
    url: "/sobre/"
    btn2_label: "Faça parte da equipe"
    btn2_class: "btn--success"
    url2: "http://plataforma.nortanprojetos.com"
areas_atuacao:
  - title: "ÁREAS DE ATUAÇÃO"
    excerpt: "Somos uma empresa multimercado que trabalha com projetos arquitetônicos, design de interiores, acompanhamento de obras, impermeabilização de obras, projeto hidrossanitário, elétrico, licenciamento ambiental de empreendimentos e recursos hídricos.<br><br>Abaixo segue nossa linha da Construção Civil"
feature_row:
  - image_path: /assets/images/arqDesign.png
    alt: "ARQUITETURA E DESIGN DE INTERIORES"
    title: "ARQUITETURA E DESIGN E INTERIORES"
    excerpt: "Somos especializados em projetos residenciais. Fazemos o atendimento personalizado para concepção do projeto junto ao cliente, cuidando do exterior e do interior da sua residência até que seu lar esteja pronto para morar."
  - image_path: /assets/images/projComp.jpg
    alt: "PROJETOS COMPLEMENTARES"
    title: "PROJETOS COMPLEMENTARES"
    excerpt: "Planejamos toda a infraestrutura de suporte do seu empreendimento. Projetos estruturais econômicos, projetos hidrossanitário e elétrico sustentáveis, buscando a reutilização da água e aproveitamento de energia de fontes renováveis."
  - image_path: /assets/images/imperm.jpg
    alt: "IMPERMEABILIZAÇÃO"
    title: "IMPERMEABILIZAÇÃO"
    excerpt: "Ter tranquilidade em tempos chuvosos não tem preço. Somos especializados em identificação de pontos de infiltração, levando soluções eficientes para sua obra. Executamos pensando na segurança à longo prazo, por isso damos 5 anos de garantia."
contato:
  - title: "CONTATO"
    excerpt: "Rua Hamilton de Barros Soutinho, 1866, Sala 12, Jatiúca, Maceió, Alagoas<br>contato@nortanprojetos.com<br>(82) 99916-4578"
---

{% include slider.html selector="slider1" %}

{% include feature_row id="nortan_intro" type="left" img_style="padding: 50px;"%}

{% include feature_row id="areas_atuacao" type="wide" title_aligment='text-center' propeties='data-aos="fade-left" style="border-bottom: 0px solid;"' %}

{% include feature_row title_size="h4" propeties='data-aos="fade-up"' %}

{% include feature_row id="contato" type="center" propeties='data-aos="fade-right" style="border-bottom: 0px solid;"' %}

{% include contact_map.html %}
