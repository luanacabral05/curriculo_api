export const getAllPessoas = async (models) => {
  return await models.Pessoa.findAll();
};

export const getPessoaById = async (id, models) => {
  return await models.Pessoa.findByPk(id, {
    include: [
      { model: models.Formacao },
      { model: models.Experiencia },
      { model: models.Habilidade },
    ],
  });
};

export const createPessoa = async (data, models) => {
  return await models.Pessoa.create(data);
};

export const updatePessoa = async (id, data, models) => {
  return await models.Pessoa.update(data, {
    where: { id },
    returning: true,
  });
};

export const deletePessoa = async (id, models) => {
  return await models.Pessoa.destroy({ where: { id } });
};
