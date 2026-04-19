const pessoa = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('pessoa', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'O nome não pode estar vazio.' },
      },
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
    },
    endereco: {
      type: DataTypes.STRING,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Este e-mail já está em uso.' },
      validate: {
        notEmpty: { msg: 'O e-mail não pode estar vazio.' },
        isEmail: { msg: 'Informe um e-mail válido.' },
      },
    },
    linkedin: {
      type: DataTypes.STRING,
    },
    objetivo: {
      type: DataTypes.TEXT,
    },
  });

  Pessoa.associate = (models) => {
    Pessoa.hasMany(models.Formacao, { onDelete: 'CASCADE' });
    Pessoa.hasMany(models.Experiencia, { onDelete: 'CASCADE' });
    Pessoa.hasMany(models.Habilidade, { onDelete: 'CASCADE' });
  };

  return Pessoa;
};

export default pessoa;
