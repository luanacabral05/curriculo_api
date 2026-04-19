import * as pessoaService from '../services/pessoaService';

export const getAll = async (req, res, next) => {
  try {
    const pessoas = await pessoaService.getAllPessoas(req.context.models);
    return res.status(200).json(pessoas);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const pessoa = await pessoaService.getPessoaById(req.params.pessoaId, req.context.models);
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    return res.status(200).json(pessoa);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const pessoa = await pessoaService.createPessoa(req.body, req.context.models);
    return res.status(201).json(pessoa);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const [count, [pessoa]] = await pessoaService.updatePessoa(
      req.params.pessoaId,
      req.body,
      req.context.models,
    );
    if (count === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    return res.status(200).json(pessoa);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const count = await pessoaService.deletePessoa(req.params.pessoaId, req.context.models);
    if (count === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
