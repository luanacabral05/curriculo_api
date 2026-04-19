import Sequelize from 'sequelize';
import pessoaModel from './pessoa';
import formacaoModel from './formacao';
import experienciaModel from './experiencia';
import habilidadeModel from './habilidade';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const models = {
  Pessoa: pessoaModel(sequelize, Sequelize.DataTypes),
  Formacao: formacaoModel(sequelize, Sequelize.DataTypes),
  Experiencia: experienciaModel(sequelize, Sequelize.DataTypes),
  Habilidade: habilidadeModel(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;
