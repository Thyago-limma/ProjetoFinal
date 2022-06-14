const Filme = require("../models/Filmes");
let message = "";
let type = "";
const orderById = { order: [["id", "ASC"]] }; 

const Op = require("sequelize").Op;


const getAll = async (req, res) => {
    try{
        const filmes = await Filme.findAll(orderById);
        res.render("index",{
            filmes,
            message,
            type,
            filmeSearch: [],
        });
    }catch(err){
        res.status(500).send({err: err.message});
    };
};



const getById = async (req,res) =>{
    try{
        const filme = await Filme.findByPk(req.params.id);
        const filmes = await Filme.findAll(orderById);
        res.render("detalhes", {
            filme,
            message,
            type,
            filmeSearch: [],
        });
    }catch(err){
        res.status(500).send({err: err.message});
    }
}



const criar = (req,res) => {
    try{
        res.render("criar", {message,type});
    }catch(err){
        res.status(500).send({err:err.message});
    }
};



const criacao = async (req,res) => {
    try{
        const filme = req.body;

        if(
            !filme.nome ||
            !filme.genero ||
            !filme.imagem ||
            !filme.diretor ||
            !filme.ano ||
            !filme.descricao     
        ){
            message = "Preencha Todos os Campos Para Cadastro!";
            type = "danger";
            return res.redirect("/criar");
        }
        await Filme.create(filme);
        res.redirect("/");
    }catch(err){
        res.status(500).send({err:err.message});
    };
}



const editar1 = async (req,res) =>{
    const filme = await Filme.findByPk(req.params.id);

    if(!filme){
        res.render("editar", {
            message: "Filme não Encontrado!",
            type: "danger",
        });
    }
    res.render("editar",{
        filme,
        message: "Editado com Sucesso!",
        type:"success",
    });
};



const editar = async (req,res) =>{ 
    try{
        const filme = await Filme.findByPk(req.params.id);
        const {nome, genero, imagem, diretor, ano, descricao} = req.body;

        filme.nome = nome;
        filme.genero = genero;
        filme.imagem = imagem;
        filme.diretor = diretor;
        filme.ano = ano;
        filme.descricao = descricao;

        const filmeEditado = await filme.save();
        // res.render("editar", {
        //     filme: filmeEditado,
        //     message: "Filme Editado"

        res.redirect("/");
        res.render("message");
        // });
    }catch(err){
        res.status(500).send({err:err.message});
    };
};



const deletar = async (req,res) => {
    try{
      const filme = await Filme.findByPk(req.params.id);
  
      if(!filme){
        res.render("deletar", {
          message: "Filme não foi encontrado!",
          type: "danger",
        });
      }
      res.render("deletar", {
        filme, message: "Filme Deletado com Sucesso",
        type: "success",
      });
    }catch (err) {
      //deu erro, venha nesse caminho
      res.status(500).send({ err: err.message }); 
  }
  };



  const deletar1 = async (req,res) => {
    const filme = await Filme.findByPk(req.params.id);
  
    if(!filme){
      res.render("deletar", {
        message: "Filme não encontrado",
        type,
      });
    }
  
    await filme.destroy();
    res.redirect("/");
  };

  

  const pesquisaNome = async (req, res) => {
    try {
      const filme = await Filme.findAll({
        where: {
        
          nome: {
            
            [Op.like]: `%${req.body.filme}%`, 
          },
        },
        order: [["id", "ASC"]],
      });
  
      if (filme.length == 0) {
        message = "Filme não foi encontrado",
        type = "danger"
        return res.redirect("/"); 
      }
  
      res.render("index", {
        filmes: [],
        message,
        type,
        filmeSearch: filme,
      });
    } catch (err) {
    
      res.status(500).send({ err: err.message }); 
    }
  };
  


module.exports = {
    getAll,
    getById,
    criar,
    criacao,
    editar1,
    editar,
    deletar,
    deletar1,
    pesquisaNome
};
