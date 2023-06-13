const soap = require('soap');

const url = 'http://www.dneonline.com/calculator.asmx?WSDL';

const calculatorOperations = {
  adicionar: 'Add',
  subtrair: 'Subtract',
  multiplicar: 'Multiply',
  dividir: 'Divide',
};

const [_, __, a, b, operacao] = process.argv;

if (!Number.isInteger(parseInt(a)) || !Number.isInteger(parseInt(b))) {
  console.log('Os dois primeiros parâmetros devem ser inteiros.');
  process.exit(1);
}

if (!Object.keys(calculatorOperations).includes(operacao)) {
  console.log('A operação fornecida é inválida. As operações válidas são: adicionar, subtrair, multiplicar, dividir.');
  process.exit(1);
}

const args = {
  intA: parseInt(a),
  intB: parseInt(b),
};

soap.createClient(url, function (err, client) {
  if (err) {
    console.log('Erro ao criar o cliente SOAP:', err);
    process.exit(1);
  }

  const operationName = calculatorOperations[operacao];

  client[operationName](args, function (err, result) {
    if (err) {
      console.log('Erro ao chamar o método SOAP:', err);
      process.exit(1);
    }

    console.log(`Resultado da operação ${operacao}:`, result[`${operationName}Result`]);
  });
});