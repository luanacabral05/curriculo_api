const experiencia = (sequelize, DataTypes) => {
  const Experiencia = sequelize.define('experiencia', {
    empresa: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'O nome da empresa não pode estar vazio.' },
      },
    },
    cargo: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'O cargo não pode estar vazio.' },
      },
    },
    atividade: {
      type: DataTypes.TEXT,
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: { msg: 'A data de início não pode estar vazia.' },
      },
    },
    dataFim: {
      type: DataTypes.DATEONLY,
    },
  });

  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa);
  };

  return Experiencia;
};

export default experiencia;
