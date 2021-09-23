#  Sistema de Licitação
**Sistema de Licitação** (**SL**) é um sistema interno da ABC para criar, editar e exportar documentos usados no processo de licitação.

##  Visão Geral
O SL permite a manipulação de dois tipos de documentos:
* Documento Base (**DocB**)
* Documento (**Doc**)

Um DocB possui um **Nome** e diversas **Seções**. Cada **Seção** de um DocB contém um **Nome** e múltiplos **Itens**. Existem 3 tipos de **Itens**:
1. **Nota** - [Texto Explicativo + Nível de Indentação]
2.  **Texto** - [Texto + Entrada de texto + Nível de Indentação]
3.  **Opções** - [Descrição + Subdescrição + Opções + Nível de Indentação]

O **Item Nota** tem papel explicativo e não é exportado ao final do processo de preenchimento de um Doc. Os **Itens Texto** e **Opções**, por outro lado, são exportados e podem ser manipulados durante o preenchimento de um Doc. Todos os **Itens** apresentam um Nível de Indentação, que serve para estruturar o DocB e consequentemente o Doc.

Um Doc é um documento que precisa ser preenchido, avaliado e então exportado. Um Doc é criado a partir de um DocB. Além do preenchimento, é possível a inserção de novos **Itens** do tipo **Texto** em um Doc.

Além da criação de DocB*s* e Doc*s*, o SL possui um subsistema de **Mensagens**, que serve para troca de mensagens entre **Analistas** e outros usuários.

## Usuários, Permissões e Responsabilidades
Para o SL existem dois tipos de usuários:
* **Analista**
* **Usuário Comum**

Segue algumas regras que define as permissões e responsabilidade de cada tipo de usuário:
1. Apena o **Analista** pode criar e editar DocB*s*
2. O preenchimento de Doc*s* é permitido a todos os usuários, desde que aquele usuário tenha criado o Doc
3. Um **Analista** não pode editar um Doc criado por outro usuário (preencher itens, adicionar itens, remover itens). É permitido, porém, que ele visualize o conteúdo do Doc
4. Um **Usuário Comum** não pode editar ou visualizar um Doc criado por outro usuário
5. Após o preenchimento de um Doc, um **Analista** deve avaliá-lo. Se houver algum problema no preenchimento do Doc, o **Analista** deve apontar via o subsistema de **Mensagens**.
6. Um Doc avaliado e com todas as pendências resolvidas não pode mais ser editado. Nesse ponto, é possível exportar o Doc para um formato aceito pelo **SEI - Governo GO**.