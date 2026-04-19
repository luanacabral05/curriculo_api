import * as habilidadeService from '../services/habilidadeService';

export const getAll = async (req, res, next) => {
  try {
    const habilidades = await habilidadeService.getAllHabilidades(req.context.models);
    return res.status(200).json(habilidades);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const habilidade = await habilidadeService.getHabilidadeById(req.params.habilidadeId, req.context.models);
    if (!habilidade) {
      return res.status(404).json({ error: 'Habilidade não encontrada.' });
    }
    return res.status(200).json(habilidade);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const habilidade = await habilidadeService.createHabilidade(req.body, req.context.models);
    return res.status(201).json(habilidade);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const [count, [habilidade]] = await habilidadeService.updateHabilidade(
      req.params.habilidadeId,
      req.body,
      req.context.models,
    );
    if (count === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada.' });
    }
    return res.status(200).json(habilidade);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const count = await habilidadeService.deleteHabilidade(req.params.habilidadeId, req.context.models);
    if (count === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada.' });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
