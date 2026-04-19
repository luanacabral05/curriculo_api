const habilidade = (sequelize, DataTypes) => {
  const Habilidade = sequelize.define('habilidade', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'O nome da habilidade não pode estar vazio.' },
      },
    },
    nivel: {
      type: DataTypes.STRING,
    },
  });

  Habilidade.associate = (models) => {
    Habilidade.belongsTo(models.Pessoa);
  };

  return Habilidade;
};

export default habilidade;
