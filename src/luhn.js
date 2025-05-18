function luhnCheck(numeroCartao) {
    const numero = numeroCartao.replace(/\D/g, '');
    let soma = 0;
    let deveDobrar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = parseInt(numero.charAt(i), 10);

        if (deveDobrar) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }

        soma += digito;
        deveDobrar = !deveDobrar;
    }

    return soma % 10 === 0;
}

module.exports = { luhnCheck };