'use strict';

const repo = require('./repository');

module.exports.get = async (event, context) => {
  return repo.getAll().then((data) => {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }).catch((err) => {
    console.error('erro DB ', err);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Erro ao obter todos registros',
      }),
    };
  });
};

module.exports.getOne = async (event, context) => {
  const uuid = event.pathParameters['uuid'];
  if (!uuid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'uuid deve ser informado'
      })
    };
  }

  return repo.getOne(uuid).then((data) => {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }).catch((err) => {
    console.error('erro DB ', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao obter um registro',
      }),
    };
  });
};

module.exports.post = async (event, context) => {
  const data = JSON.parse(event.body);
  if (!data || !data.content) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Conteúdo deve ser informado'
      })
    };
  }

  return repo.save(data.content).then((data) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'cadastrado com sucesso'
      }),
    };
  }).catch((err) => {
    console.error('erro DB ', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao salvar',
      }),
    };
  });
};
