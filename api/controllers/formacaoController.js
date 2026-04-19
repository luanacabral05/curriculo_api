import * as formacaoService from '../services/formacaoService';

export const getAll = async (req, res, next) => {
  try {
    const formacoes = await formacaoService.getAllFormacoes(req.context.models);
    return res.status(200).json(formacoes);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const formacao = await formacaoService.getFormacaoById(req.params.formacaoId, req.context.models);
    if (!formacao) {
      return res.status(404).json({ error: 'Formação não encontrada.' });
    }
    return res.status(200).json(formacao);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const formacao = await formacaoService.createFormacao(req.body, req.context.models);
    return res.status(201).json(formacao);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const [count, [formacao]] = await formacaoService.updateFormacao(
      req.params.formacaoId,
      req.body,
      req.context.models,
    );
    if (count === 0) {
      return res.status(404).json({ error: 'Formação não encontrada.' });
    }
    return res.status(200).json(formacao);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const count = await formacaoService.deleteFormacao(req.params.formacaoId, req.context.models);
    if (count === 0) {
      return res.status(404).json({ error: 'Formação não encontrada.' });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
