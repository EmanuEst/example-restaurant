const Dado = require("../models/Dado");

function formCardapio(req, res) {
  res.render("admin/cadastroItemCardapio");
}

async function saveItemCardapio(req, res) {
  const { nome, descricao, preco } = req.body;
  let img = req.file;

  if (img == null) {
    res.redirect("/cardapio/cadastro");
  } else {
    img = req.file.originalname;
    try {
      Dado.create({
        nome,
        descricao,
        preco,
        img,
      });
      res.redirect("/cardapio/cadastro");
    } catch (error) {
      console.log(error);
    }
  }
}

function formEdicaoCardapio(req, res) {
  const id = req.params.id;
  Dado.findByPk(id)
    .then((dados) => {
      if (dados == undefined) {
        res.redirect("/cardapio/editCardapio");
      } else {
        res.render("admin/editcardapio", { dados });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/cardapio/itemCardapio");
    });
}

function salvaAltCardapio(req, res) {
  const { id, nome, descricao, preco } = req.body;

  Dado.update({ nome, descricao, preco }, { where: { id: id } })
    .then(async () => {
      await req.flash("success", "Dados do usuário alterado com sucesso!");
      res.redirect("/cardapio/item-cardapio");
    })
    .catch(async (err) => {
      console.log(err);
      await req.flash("error", "Usuário ou senha inválida, tente novamente!");
      res.redirect("/cardapio/item-cardapio");
    });
}

async function listaItemCardapio(req, res) {
  const msgError = await req.consumeFlash("error");
  const msgSuccess = await req.consumeFlash("success");
  Dado.findAll().then((dados) => {
    res.render("admin/itemCardapio", { dados, msgSuccess, msgError });
  });
}

function deleteCardapio(req, res) {
  const id = req.body.id;
  if (id == undefined || id == "") {
    res.redirect("/cardapio/item-cardapio");
  } else {
    Dado.destroy({
      where: { id: id },
    })
      .then(() => {
        res.redirect("/cardapio/item-cardapio");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = {
  formCardapio,
  saveItemCardapio,
  salvaAltCardapio,
  formEdicaoCardapio,
  listaItemCardapio,
  deleteCardapio,
};
