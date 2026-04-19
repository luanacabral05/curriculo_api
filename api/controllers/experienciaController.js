import * as experienciaService from '../services/experienciaService';

export const getAll = async (req, res, next) => {
  try {
    const experiencias = await experienciaService.getAllExperiencias(req.context.models);
    return res.status(200).json(experiencias);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const experiencia = await experienciaService.getExperienciaById(req.params.experienciaId, req.context.models);
    if (!experiencia) {
      return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    return res.status(200).json(experiencia);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const experiencia = await experienciaService.createExperiencia(req.body, req.context.models);
    return res.status(201).json(experiencia);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const [count, [experiencia]] = await experienciaService.updateExperiencia(
      req.params.experienciaId,
      req.body,
      req.context.models,
    );
    if (count === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    return res.status(200).json(experiencia);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const count = await experienciaService.deleteExperiencia(req.params.experienciaId, req.context.models);
    if (count === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
