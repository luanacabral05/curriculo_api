import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models';
import * as routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

// Middleware de contexto: injeta os models em todas as requisições
app.use((req, res, next) => {
  req.context = { models };
  next();
});

// Middleware de log: exibe no console cada requisição recebida
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Rotas
app.use('/pessoas', routes.pessoa);
app.use('/formacoes', routes.formacao);
app.use('/experiencias', routes.experiencia);
app.use('/habilidades', routes.habilidade);

// Tratamento de erros global
app.use((error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: error.message });
  }
  return res.status(500).json({ error: error.message });
});

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === 'true';

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createSeedData();
  }
  // app.listen só funciona em ambiente local — no Vercel (serverless) não é necessário
  if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  }
});

const createSeedData = async () => {
  // --- Pessoa 1: Luana Cabral da Silva ---
  const luana = await models.Pessoa.create({
    nome: 'Luana Cabral da Silva',
    dataNascimento: '2005-02-06',
    endereco: 'Rua Trajano de Morais, 136 - Macaxeira, Recife, PE, Brasil',
    telefone: '(81) 8744-0753',
    email: 'cabral.luanasilva@gmail.com',
    linkedin: 'https://www.linkedin.com/in/luana-cabral-8562232ba',
    objetivo:
      'Estudante de Sistemas para Internet em busca de experiência na área de tecnologia, análise de dados e soluções digitais.',
  });

  await models.Formacao.create({
    pessoaId: luana.id,
    instituicao: 'Universidade Católica de Pernambuco (UNICAP)',
    curso: 'Tecnológico em Sistemas para Internet',
    nivel: 'Graduação Tecnológica',
    dataInicio: '2024-01-01',
    dataFim: null,
    status: 'Em Andamento',
  });

  await models.Experiencia.create({
    pessoaId: luana.id,
    empresa: 'Masterboi LTDA',
    cargo: 'Jovem Aprendiz',
    atividade: 'Atividades administrativas e aprendizado profissional.',
    dataInicio: '2024-01-01',
    dataFim: '2025-01-01',
  });

  await models.Experiencia.create({
    pessoaId: luana.id,
    empresa: 'Masterboi LTDA',
    cargo: 'Auxiliar de Soluções Digitais',
    atividade:
      'Desenvolvimento e manutenção de relatórios em Power BI, pipelines de dados com Microsoft Fabric, análise de dados e suporte a soluções digitais.',
    dataInicio: '2025-04-01',
    dataFim: null,
  });

  const habilidadesLuana = [
    { nome: 'Power BI', nivel: 'Intermediário' },
    { nome: 'Python', nivel: 'Básico' },
    { nome: 'SQL', nivel: 'Básico' },
    { nome: 'Engenharia de Dados', nivel: 'Básico' },
    { nome: 'Análise de Dados', nivel: 'Básico' },
  ];

  for (const h of habilidadesLuana) {
    await models.Habilidade.create({ pessoaId: luana.id, ...h });
  }

  // --- Pessoa 2: Izabel Cabral Rocha ---
  const izabel = await models.Pessoa.create({
    nome: 'Izabel Cabral Rocha',
    dataNascimento: null,
    endereco: 'Rua Trajano de Morais, 136, Recife, PE',
    telefone: '(81) 98761-1958',
    email: 'izabelcabral092@gmail.com',
    linkedin: null,
    objetivo:
      'Busco uma oportunidade para crescimento e desenvolvimento dentro da empresa, com o intuito de aprimorar minhas habilidades de comunicação com os clientes e expandir meu conhecimento em diversas áreas.',
  });

  await models.Formacao.create({
    pessoaId: izabel.id,
    instituicao: 'Ensino Regular',
    curso: 'Ensino Médio',
    nivel: 'Ensino Médio',
    dataInicio: null,
    dataFim: null,
    status: 'Concluído',
  });

  await models.Experiencia.create({
    pessoaId: izabel.id,
    empresa: 'FARMAFORMULA',
    cargo: 'Operadora de Caixa',
    atividade: 'Atendimento ao Cliente.',
    dataInicio: '2025-01-01',
    dataFim: null,
  });

  await models.Experiencia.create({
    pessoaId: izabel.id,
    empresa: 'Masterboi LTDA',
    cargo: 'Operador de Loja',
    atividade: 'Atendimento ao Cliente e Caixa.',
    dataInicio: '2020-09-01',
    dataFim: '2024-05-01',
  });

  await models.Experiencia.create({
    pessoaId: izabel.id,
    empresa: 'Karne Keijo Logistica Integrada LTDA',
    cargo: 'Operadora de Caixa',
    atividade: 'Atendimento ao Cliente.',
    dataInicio: '2016-12-15',
    dataFim: '2019-06-18',
  });

  const habilidadesIzabel = [
    { nome: 'Boa Comunicação', nivel: 'Avançado' },
    { nome: 'Trabalho em Equipe', nivel: 'Avançado' },
    { nome: 'Proatividade', nivel: 'Avançado' },
    { nome: 'Resiliência', nivel: 'Avançado' },
  ];

  for (const h of habilidadesIzabel) {
    await models.Habilidade.create({ pessoaId: izabel.id, ...h });
  }

  console.log('Dados de seed criados com sucesso!');
};

export default app;
