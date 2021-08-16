<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Termo de Referência - Compra Direta</title>
  <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="styles/main.css">
  <link rel="stylesheet" href="styles/document.css">
  <link rel="stylesheet" href="styles/comments.css">
</head>
<body>
  <div class="body-content">
    <div class="panel panel-big">
      <div class="panel-header text-center">
        <h1>Termo de Referência - Compra Direta</h1>
      </div>

      <h3 class="mt-1 ms-4">Servidor: João Maria | Código xxx-xxxx-xxx | Status: Preenchimento</h3>

      <div class="document-item hidden-item m-3" id="document-item-1">
        <?php require __DIR__ . '/compra_direta/objeto.php'; ?>

        <hr>
        <button class="btn btn-primary m-3" style="float: left;">Anterior</button>
        <button class="btn btn-primary m-3" style="float: right;">Próximo</button>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-2">
        <h2 class="m-2">JUSTIFICATIVA</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-3">
        <h2 class="m-2">ESPECIFICAÇÕES TÉCNICAS</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-4">
        <h2 class="m-2">QUALIFICAÇÃO TÉCNICA</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-5">
        <h2 class="m-2">PRAZOS, LOCAIS, FORMA DE EXECUÇÃO E RECEBIMENTO</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-6">
        <h2 class="m-2">DOTAÇÃO ORÇAMENTARIA</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-7">
        <h2 class="m-2">OBRIGAÇÕES DA CONTRATADA</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-8">
        <h2 class="m-2">OBRIGAÇÕES DA CONTRATANTE</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-9">
        <h2 class="m-2">GARANTIA DO PRODUTO</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-10">
        <h2 class="m-2">INSTRUMENTO CONTRATUAL</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-11">
        <h2 class="m-2">ACOMPANHAMENTO E FISCALIZAÇÃO</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-12">
        <h2 class="m-2">PAGAMENTO</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-13">
        <h2 class="m-2">SANÇÕES</h2>
        <hr>
      </div>

      <div class="document-item hidden-item m-3" id="document-item-14">
        <h2 class="m-2">DISPOSIÇÕES FINAIS</h2>
        <hr>
      </div>

      <div class="comments mt-4">
        <p class="m-2">
          Aqui vão os comentários de correção
        </p>
      </div>

      <span id="items-selector" class="ms-3" style="float: left;"></span>
      <button class="btn btn-primary ms-5" style="float: left;">Voltar</button>
      <button class="btn btn-primary ms-2" style="float: left;">Salvar</button>
      <button class="btn btn-primary ms-2" style="float: left;">Concluir</button>

    </div>
  </div>

  <script src="scripts/custom_forms/input_text.js"></script>
  <script src="scripts/user/compra_direta.js"></script>
</body>
</html>