const mongoose = require('mongoose');
const Funcao = mongoose.model('Funcao');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; //obtem o parâmetro 'page' informado no GET                
    const consult = await Funcao.paginate({}, { page, limit: 10 });

    return res.json(consult);
  },

  async show(req, res) {
    const consult = await Funcao.findById(req.params.id);

    return res.json(consult);
  },

  async store(req, res) {
    const consult = await Funcao.create(req.body);

    return res.json(consult);
  },

  async update(req, res) {
    const consult = await Funcao.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(consult);
  },

  async remove(req, res) {
    await Funcao.findByIdAndRemove(req.params.id);

    return res.send();
  }
};