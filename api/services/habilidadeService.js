export const getAllHabilidades = async (models) => {
  return await models.Habilidade.findAll();
};

export const getHabilidadeById = async (id, models) => {
  return await models.Habilidade.findByPk(id);
};

export const createHabilidade = async (data, models) => {
  return await models.Habilidade.create(data);
};

export const updateHabilidade = async (id, data, models) => {
  return await models.Habilidade.update(data, {
    where: { id },
    returning: true,
  });
};

export const deleteHabilidade = async (id, models) => {
  return await models.Habilidade.destroy({ where: { id } });
};
