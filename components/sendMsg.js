const sendMsg = async (number_details,client, msg) => {
  await client.sendMessage(number_details._serialized, msg); // Envia a mensagem para o número de telefone
};

module.exports = sendMsg;
