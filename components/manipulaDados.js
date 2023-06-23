const fs = require('fs');

/**
 * Realiza operações de manipulação de dados em arquivos.
 * @param {string} action - Ação a ser executada ('PegarData', 'atualizarData', 'registrarData').
 * @param {string} fileName - Nome do arquivo.
 * @param {object} data - Dados a serem manipulados.
 */
const manipulaData = (action, fileName, data) => {
    switch (action) {
        case "PegarData":
            try {
                const newData = fs.readFileSync(fileName, 'utf8');
                console.log(`Sucesso na leitura do arquivo ${fileName}`);
                return newData;
            } catch (err) {
                console.log(`Não foi possível ler o arquivo ${fileName}`, err);
                break;
            }

        case "atualizarData":
            try {
                fs.writeFileSync(fileName, JSON.stringify(data), "utf8");
                console.log("Usuário atualizado com sucesso");
            } catch (err) {
                console.log("Não foi possível atualizar o registro do novo usuário", err);
            }
            break;

        case "registrarData":
            try {
                fs.writeFileSync(fileName, JSON.stringify(data));
                console.log("Usuário registrado com sucesso");
            } catch (err) {
                console.log("Não foi possível registrar o novo usuário", err);
            }
            break;
    }
};

module.exports = manipulaData;
