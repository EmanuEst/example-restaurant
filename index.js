const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { flash } = require('express-flash-message');

const Dado = require('./models/Dado');
const adminRoutes = require('./routes/AdminRoutes');
const cardapioRoutes = require('./routes/CardapioRoutes');

const app = express();

//View engine
app.set("view engine", "ejs");

app.use(express.static("public"));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3030;

//sessions
app.use(
  session({
    secret: "Qualquer coisa",
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
  })
);

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.get('/', (req, res) => {
  res.render('paginaInicial');
})


app.get('/cardapio', (req, res) => {

  Dado.findAndCountAll().then((total) => {
    let pages = total.count; //total de registros

    if (pages <= 3) {
      pages = 0;
    }
    Dado.findAll({
      limit: 3,
      order: [["id", "DESC"]],
    }).then((dados) => {
      res.render("cardapio", { dados, current: 1, pages });
    });
  });
});

app.get('/pagina/:page', (req, res) => {
  const perPage = 3;
  var current = req.params.page;

  Dado.findAll({
    limit: perPage,
    offset: perPage * current - perPage,
    order: [["id", "ASC"]],
  }).then((dados) => {
    Dado.findAndCountAll().then((total) => {
      const count = total.count;
      const pages = count / perPage;
      res.render("pagina", {
        dados,
        current,
        pages,
      });
    });
  });

});

app.use('/admin', adminRoutes);
app.use('/cardapio', cardapioRoutes);

app.get('/sobre', (req, res) => {
  res.render('sobre')})
  
app.get('/contatos', (req, res) => {
  res.render('contatos')})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});