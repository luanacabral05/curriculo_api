const formacao = (sequelize, DataTypes) => {
  const Formacao = sequelize.define('formacao', {
    instituicao: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'A instituição não pode estar vazia.' },
      },
    },
    curso: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'O curso não pode estar vazio.' },
      },
    },
    nivel: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'O nível não pode estar vazio.' },
      },
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
    },
    dataFim: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Em Andamento',
      validate: {
        notEmpty: { msg: 'O status não pode estar vazio.' },
      },
    },
  });

  Formacao.associate = (models) => {
    Formacao.belongsTo(models.Pessoa);
  };

  return Formacao;
};

export default formacao;
