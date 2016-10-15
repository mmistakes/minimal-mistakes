---
layout: page
---

<section class="mbr-section" id="form1-0" style="background-color: rgb(255, 255, 255); padding-top: 120px; padding-bottom: 120px;">
    
    <div class="mbr-section mbr-section__container mbr-section__container--middle">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-xs-center">
                    <h3 class="mbr-section-title display-2">Faça uma consulta</h3>
                    <small class="mbr-section-subtitle">A mensagem será enviada diretamente para um de nossos advogados.</small>
                </div>
            </div>
        </div>
    </div>
	<main class="container">
  <div class="contact">

    <div class="row">
      <div class="col-lg-6">
        <form role="form" method="POST" action="http://formspree.io/advocacia@baldoequeiroz.com.br">
          <input type="hidden" name="_next" value="http://www.baldoequeiroz.com.br/blog/obrigado" />
          <input type="hidden" name="_subject" value="Novo caso" />
          <input type="text" name="_gotcha" style="display:none" />

          <div class="form-group">
            <label for="InputName">Nome</label>
            <input type="text" class="form-control" name="name" id="InputName" placeholder="Seu Nome" required>
          </div>
          <div class="form-group">
            <label for="InputEmail">Email</label>

            <input type="email" class="form-control" id="InputEmail" name="_replyto" placeholder="seu@email.com" >
          </div>
          <div class="form-group">
            <label for="InputTel">Telefone</label>
            <input type="tel" class="form-control" id="InputTel" name="telefone" placeholder="(69) 2141-4037">
          </div>
          <div class="form-group">
            <label for="InputMessage">Mensagem</label>
            <textarea name="InputMessage" id="InputMessage" class="form-control" rows="5"  placeholder="Eu fui demitido e preciso de ajuda..."  ></textarea>
          </div>
          <input type="submit" name="submit" id="submit" value="Enviar" class="btn btn-info pull-right"> 
      </form>
          </div>
  </div>
</main>          
</section>