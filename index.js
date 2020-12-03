//Estou dizendo para ele criar uma variavel que requisita o expres e declaro uma variavel app que chama a função do express
const express = require('express')
const app = express()
//Estou configurando o bodyParser que é o que tras os dadso inseridos no formulario
const bodyParser = require("body-parser")
//Exportando conexão
const connection = require('./DataBases/databases')
//exportando model de ciração de tabelos no banco
const Pergunta = require("./DataBases/Pergunta")
//databases
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
//usar o EJS como view engine | renderizador de html
app.set('view engine', 'ejs')
//Carregamento de arquivos estaticos no express
app.use(express.static('public'))
//Carregamento do bodyPerser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas
app.get("/", (req, res) => {
    //Informa variavéis que irão ser apresentadas no index
    //responsavel por achar todas as perguntas -> select * from Perguntas   
    Pergunta.findAll({
        raw: true /*Para limpar dados desnecessario*/, order: [
            ["id", "DESC"] //crescente ASC || DESC = Decrescente
        ]
    }).then(pergunta => {
        //console.log(perguntas)
        res.render("index", {
            pergunta: pergunta
        });

    })
})
//Renderizando FORUM.EJS
app.get("/forum", (req, res) => {

    res.render("forum");

})
//Para redirecionar para uma pagina padrão pesquisando o id da pergunta
app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id
    //em pergunta encontre somente uma onde o id = var id
    Pergunta.findOne({
        where: { id: id }
        //depois mostre se a pergunta não for indefinida a pagina pergunta.ejs
    }).then(pergunta => {
        if (pergunta != undefined) {
            res.render("pergunta",{
                pergunta:pergunta
            })
        } else {
            res.redirect("/")
        }
    })
})
//Rota do BANCO
app.post("/save", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao //Inserir dados a tabela -> insert into pergunta titulo, descrição (xxx,xxx)

    Pergunta.create({
        titulo: titulo,
        descricao: descricao

        //Apos receber os dadso usuario sera redirecionado a pagina inicial
    }).then(() => {
        res.redirect("/");
    });
})

app.listen(8080, () => {
    console.log("Servidor rodando!")
})