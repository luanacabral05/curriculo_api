export const getAllFormacoes = async (models) => {
  return await models.Formacao.findAll();
};

export const getFormacaoById = async (id, models) => {
  return await models.Formacao.findByPk(id);
};

export const createFormacao = async (data, models) => {
  return await models.Formacao.create(data);
};

export const updateFormacao = async (id, data, models) => {
  return await models.Formacao.update(data, {
    where: { id },
    returning: true,
  });
};

export const deleteFormacao = async (id, models) => {
  return await models.Formacao.destroy({ where: { id } });
};
