export const getAllExperiencias = async (models) => {
  return await models.Experiencia.findAll();
};

export const getExperienciaById = async (id, models) => {
  return await models.Experiencia.findByPk(id);
};

export const createExperiencia = async (data, models) => {
  return await models.Experiencia.create(data);
};

export const updateExperiencia = async (id, data, models) => {
  return await models.Experiencia.update(data, {
    where: { id },
    returning: true,
  });
};

export const deleteExperiencia = async (id, models) => {
  return await models.Experiencia.destroy({ where: { id } });
};
