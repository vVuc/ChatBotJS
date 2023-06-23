const fs = require('fs');
const manipulaData = (action, fileName, data) => {
    switch (action) {
        case "PegarData":
            const newData = fs.readFileSync(fileName, 'utf8', (err, dataR) => {
                if (err) {
                    console.log(`Não foi possível ler o arquivo ${fileName}`, err);
                } else {
                    console.log(`Sucesso na leitura do arquivo ${fileName}`);
                    return;
                }
            });
            return newData;

        case "atualizarData":
            fs.writeFile(fileName, JSON.stringify(data), "utf8", (err) => {
                if (err) {
                    console.log("Não foi possível atualizar o registro do novo usuário", err);
                    return;
                } else {
                    console.log("Usuário atualizado com sucesso");
                }
            });
            break;

        case "registrarData":
            fs.writeFile(fileName, JSON.stringify(data), (err) => {
                if (err) {
                    console.log("Não foi possível registrar o novo usuário", err);
                    return;
                } else {
                    console.log("Usuário registrado com sucesso");
                }
            });
            break;
    }
};

module.exports = manipulaData;