const { Sequelize } = require("sequelize");
const database = require("../database/bd");

const Filme = database.sequelize.define(
    
    "filme",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        genero:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        imagem:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        diretor:{
            type: Sequelize.STRING,
            allowNUll: false,
        },
        ano: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true, 
        timestamps: false,
        createdAt: false,
        updateAt: false,
    }
);

const initTable = async () => {
    await Filme.sync();
};

initTable();

module.exports = Filme;