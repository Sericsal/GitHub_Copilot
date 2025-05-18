const readline = require('readline');
const { luhnCheck } = require('./luhn'); // <-- Import the Luhn function
function getBandeira(numeroCartao) {
    const regras = [
        {
            bandeira: "American Express",
            regex: /^3[47][0-9]{13}$/,
            digitos: 15
        },
        {
            bandeira: "Diners Club",
            regex: /^30[0-9]{12}$/,
            digitos: 14
        },
        {
            bandeira: "MasterCard",
            regex: /^(5[1-5][0-9]{14}|2(2[2-9][1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[01][0-9]|720)[0-9]{12})$/,
            digitos: 16
        },
        {
            bandeira: "Visa",
            regex: /^4[0-9]{15}$/,
            digitos: 16
        },
        {
            bandeira: "Elo",
            regex: /^(4011|4312|4389|51|6)[0-9]{12,15}$/,
            digitos: 16
        },
        {
            bandeira: "Discover",
            regex: /^(6011[0-9]{12}|65[0-9]{14}|64[4-9][0-9]{13})$/,
            digitos: 16
        },
        {
            bandeira: "EnRoute",
            regex: /^2[0-9]{14}$/,
            digitos: 15
        },
        {
            bandeira: "JCB",
            regex: /^35[0-9]{14}$/,
            digitos: 16
        },
        {
            bandeira: "Voyager",
            regex: /^8[0-9]{14}$/,
            digitos: 15
        },
        {
            bandeira: "Hipercard",
            regex: /^6062[0-9]{12}$/,
            digitos: 16
        },
        {
            bandeira: "Aura",
            regex: /^50[0-9]{14}$/,
            digitos: 16
        }
    ];

    const numero = numeroCartao.replace(/\D/g, '');

    for (const regra of regras) {
        if (numero.length === regra.digitos && regra.regex.test(numero)) {
            return regra.bandeira;
        }
    }
    return "Bandeira não identificada";
}

// Permitir entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o número do cartão: ', (input) => {
    const bandeira = getBandeira(input);
    if (bandeira !== "Bandeira não identificada" && luhnCheck(input)) {
        console.log(`${bandeira} - Número válido`);
    } else if (bandeira !== "Bandeira não identificada") {
        console.log(`${bandeira} - Número inválido pelo algoritmo de Luhn`);
    } else {
        console.log("Número inválido ou bandeira não identificada");
    }
    rl.close();
});