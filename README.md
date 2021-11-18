#  Sistema de Licitação
**Sistema de Licitação** (**SL**) é um sistema interno da ABC para criar, editar e exportar documentos usados no processo de licitação.

##  Visão Geral
O SL permite a manipulação de dois tipos de documentos:
* Documento Base
* Documento

Um Documento Base possui um **Nome** e diversas **Seções**. Cada **Seção** de um DocB contém um **Nome** e múltiplos **Itens**. Existem, por hora, 3 tipos de **Itens**:
1. **Nota** - [Texto Explicativo + Recuo]
2. **Texto** - [Texto Fixo + Entrada de texto + Recuo]
3. **Opções** - [Descrição + Subdescrição + Opção + Opção com Entrada de texto + Recuo]

O **Item Nota** tem papel explicativo e não é exportado ao final do processo de preenchimento de um Documento. Os **Itens Texto** e **Opções**, por outro lado, são exportados e podem ser manipulados durante o preenchimento de um Documento. Todos os **Itens** apresentam um Recuo, que serve para estruturar o Documento Base e consequentemente o Documento.

Um Documento precisa ser preenchido, avaliado e então exportado. Um Documento é criado a partir de um Documento Base.

Além da criação de Documentos e Documentos Base, o SL possui um subsistema de **Mensagens**, que serve para troca de mensagens entre **Analistas** e outros usuários [AINDA NÃO IMPLEMENTADO], e um subsistema de **Análise de Documentos**.

## Usuários, Permissões e Responsabilidades
Existem dois subsistemas do SL que precisam de permissão para serem acessados:
* **Documentos Base**
* **Análise de Documentos**

Um usuário com permissão para manipular Documentos Base pode criá-los, editá-los ou excluí-los. Os Documentos Base criados servem de base, então, para a criação e preenchimento de Documentos. Após o preenchimento de um Documento, ele deve ser submetido à análise. Somente usuários com a devida permissão podem analisar um Documento e então aprová-lo ou recusá-lo.

Seguindo a ideia do último parágrafo, um Documento pode estar em três estados distintos: Edição, Análise ou Aprovado. Enquanto um Documento estiver em Edição todo o seu conteúdo passível de preenchimento pode ser alterado; é possível ver como o Documento ficará no SEI; não é possível exportar o Documento. Enquanto um Documento estiver em Análise, sua edição ou exportação ficam bloqueadas, sendo ainda permitido visualizar como o Documento ficará no SEI. Por fim, quando um Documento estiver Aprovado, não é mais possível editá-lo, mas é possível ver como ele vai ficar no SEI e também é possível exportar o Documento no formato do SEI.