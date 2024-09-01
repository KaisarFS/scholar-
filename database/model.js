let config = require("./config");
const Sequelize = config.Sequelize;
const sequelize = config.sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

function table_matkul() {
  const Table = sequelize.define(
    "matkul",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "matkul",
    }
  );
  return Table;
}

function table_mahasiswa() {
  const Table = sequelize.define(
    "mahasiswa",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "mahasiswa",
    }
  );
  return Table;
}

function table_rencana_studi() {
  const Table = sequelize.define(
    "rencana_studi",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      id_mahasiswa: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mahasiswa', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      id_matkul: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'matkul', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "rencana_studi",
    }
  );      
  return Table;
}

db.matkul = table_matkul();
db.mahasiswa = table_mahasiswa();
db.rencana_studi = table_rencana_studi();

// Define associations
db.rencana_studi.belongsTo(db.mahasiswa, { foreignKey: 'id_mahasiswa', onDelete: 'CASCADE' });
db.rencana_studi.belongsTo(db.matkul, { foreignKey: 'id_matkul', onDelete: 'CASCADE' });
db.mahasiswa.hasMany(db.rencana_studi, { foreignKey: 'id_mahasiswa', onDelete: 'CASCADE' });
db.matkul.hasMany(db.rencana_studi, { foreignKey: 'id_matkul', onDelete: 'CASCADE' });

module.exports = db;
