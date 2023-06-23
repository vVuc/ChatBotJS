# WhatsApp Order Bot

Este é um bot de pedidos via WhatsApp, desenvolvido utilizando a biblioteca `whatsapp-web.js`. O bot permite aos clientes realizar pedidos de um menu pré-definido através de uma conversa no WhatsApp.

## Funcionalidades

- Apresentação inicial ao cliente quando um número de telefone é registrado pela primeira vez.
- Exibição do menu de opções.
- Exibição dos diferentes itens disponíveis no menu, divididos por categorias.
- Adição de itens ao carrinho de compras.
- Exibição do resumo do pedido antes de finalizá-lo.
- Coleta do nome do cliente e endereço de entrega.
- Envio de mensagem de confirmação do pedido.

## Configuração

Antes de executar o bot, é necessário realizar algumas configurações:

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório em seu ambiente local.
3. Instale as dependências do projeto executando o seguinte comando no diretório raiz do projeto:
   ```
   npm install
   ```
4. Abra o arquivo `config.js` e configure as seguintes informações:
   - `sessionPath`: caminho para o arquivo de sessão do WhatsApp. Este arquivo será gerado automaticamente.
   - `menuOptions`: definição das opções do menu. Adicione ou remova itens conforme necessário.
   - `getMessageStrings`: definição das mensagens utilizadas pelo bot. Personalize as mensagens de acordo com suas necessidades.
5. Após realizar as configurações, execute o bot com o seguinte comando:
   ```
   npm start
   ```

## Arquivos e Estrutura do Projeto

- `index.js`: ponto de entrada do aplicativo. Configura o cliente WhatsApp e define os eventos de mensagem.
- `stepByStep.js`: contém a lógica principal do bot. Controla o fluxo da conversa e realiza as ações de acordo com as interações do cliente.
- `sendMsg.js`: contém a função de envio de mensagens para números de telefone.
- `registerNumber.js`: responsável por registrar um novo número de telefone e enviar a apresentação inicial.
- `getCartMessagesAndTotalPrice.js`: função auxiliar para obter as mensagens dos itens adicionados ao carrinho.
- `handleFile.js`: contém as funções para manipulação dos dados do cliente, como leitura, atualização e registro.
- `configureData.js`: define as ações para configurar os dados do cliente, como alteração de estágio da conversa, adição de observações, endereço e produtos ao carrinho.
- `addPedidoReplyMsg.js`: função para adicionar um pedido ao carrinho e enviar uma mensagem de confirmação.
- `mocks/Strings.js`: arquivo de exemplo contendo as mensagens utilizadas pelo bot. Personalize de acordo com suas necessidades.
- `data/`: diretório para armazenar os arquivos JSON com os dados dos clientes registrados.

## Contribuição

Sinta-se à vontade para contribuir com este projeto, enviando sugestões, relatórios de problemas ou pull requests. Serão muito bem-vindos!

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).