<h2 class="m-2">OBJETO</h2>
<hr>

<div class="input-text">
  <h3>Descrição do objeto:</h3>
  <textarea class="input-text" cols="80" rows="3"></textarea>
  <p class="note">Deve ser de forma precisa, suficiente e clara, vedadas as especificações que, por excessivas, irrelevantes ou desnecessárias, limitem ou frustrem a competição, além de configurar a prática de ato antieconômico. Art. 40, I, Lei n. 8.666/93; / Art. 3º, II, Lei n. 10.520/02;</p>
</div>

<div class="input-radio">
  <h3>Tipo de contratação:</h3>
  <h4>Fornecimento de bens/materiais:</h4>
  <div class="radio-group">
    <input type="radio" name="Objeto-TipoContratacao">
    <label for="">Fornecimento em parcela única.</label>
    <br>

    <input type="radio" name="Objeto-TipoContratacao">
    <label for="">Fornecimento em mais de uma parcela (apresentar cronograma no item 10).</label>
  </div>
  <h4>Prestação de serviços:</h4>
  <div class="radio-group">
    <input type="radio" name="Objeto-TipoContratacao">
    <label for="">Prestação de serviços em regime de "empreitada" por preço global.</label>
    <br>

    <input type="radio" name="Objeto-TipoContratacao">
    <label for="">Prestação de serviços em regime de "empreitada" por preço unitário (sob demanda).</label>
  </div>
  <h4>Se prestação de serviço, é de natureza de execução continuada?</h4>
  <div class="radio-group">
    <input type="radio" disabled name="Objeto-TipoContratacaoPrestacaoServico">
    <label for="">Sim.</label>
    <div class="justify input-text">
      <h3>Justificar:</h3>
      <textarea class="input-text" cols="30" rows="1"></textarea>
      <p class="warning-note">Justificativa de serviço de execução continuada</p>
    </div>
    <br>

    <input type="radio" disabled name="Objeto-TipoContratacaoPrestacaoServico">
    <label for="">Não.</label>
  </div>
</div>

<div class="input-radio">
  <h3>Caracterização do objeto:</h3>
  <div class="radio-group">
    <input type="radio" name="Objeto-CaracterizacaoObjeto">
    <label for="">Bem ou serviço comum.</label>
    <p class="note">Segundo o Art. 3º, II, do Decreto nº 9.666/2020, são "bens cujos padrões de desempenho e qualidade possam ser objetivamente definidos pelo edital, por meio de especificações reconhecidas e usuais do mercado".</p>
    <br>

    <input type="radio" name="Objeto-CaracterizacaoObjeto">
    <label for="">Serviço comum de engenharia.</label>
    <p class="note">Serviços comuns de engenharia são aqueles serviços que necessitam da participação e do acompanhamento de profissional engenheiro habilitado, nos termos do disposto na Lei nº 5.194, de 24 de dezembro de 1966, e que são padronizados no mercado de forma que os serviços prestados pelas diversas empresas do ramo são passíveis de ser objetivamente comparados entre si em termos de desempenho e qualidade.</p>
    <p class="note">Para melhor compreensão do que sejam "serviços de engenharia", observar a definição e exemplos dados pela Orientação Técnica OT-IBR 002/2009-IBRAOP.</p>
  </div>
  <p class="note">Este modelo de termo de referência não deve ser utilizado para contratação de obras, ou de bens e serviços especiais nem de locações imobiliárias e alienações, porquanto estes tipos de contratação não poderão ser licitados através da modalidade de pregão (Art. 4º do Decreto nº 9.666/2020).</p>
</div>

<div class="input-radio">
  <h3>Forma de adjudicação:</h3>
  <div class="radio-group">
    <input type="radio" name="Objeto-FormaAjudicacao">
    <label for="">Por Item.</label>
    <br>

    <input type="radio" name="Objeto-FormaAjudicacao">
    <label for="">Por Lote.</label>
  </div>
  <p class="note">A Lei nº 8.666/93 e a jurisprudência do TCU estabelecem que a adjudicação por item é a regra a ser adotada nas licitações. Na adjudicação por item, cada item do objeto é licitado separadamente com possibilidade de ser adjudicado a licitantes distintos, e permite maior competitividade. A adjudicação por lote é considerada exceção e somente pode ser utilizada por razões técnicas e econômicas devidamente justificadas. Na adjudicação por lote a fase de lances se processa com ofertas para o valor total do lote e a adjudicação é realizada aos vencedores dos lotes, ainda que estes não tenham apresentado o melhor lance para cada item individualmente.</p>
</div>

<div class="input-radio">
  <h3>Critério de julgamento das propostas:</h3>
  <div class="radio-group">
    <input type="radio" name="Objeto-CriterioJulgamentoProposta">
    <label for="">Menor Preço.</label>
    <p class="note">É o critério padrão. As demais opções podem ser utilizadas conforme a especificidade do caso concreto e de acordo com as características de mercado.</p>
    <br>

    <input type="radio" name="Objeto-CriterioJulgamentoProposta">
    <label for="">Maior Desconto.</label>
    <br>

    <input type="radio" name="Objeto-CriterioJulgamentoProposta">
    <label for="">Menor Taxa.</label>
    <br>

    <input type="radio" name="Objeto-CriterioJulgamentoProposta">
    <label for="">Maior Oferta.</label>
  </div>
</div>