const mongoose = require('mongoose');
const Versao = mongoose.model('Versao');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; //obtem o parâmetro 'page' informado no GET                
    const consult = await Versao.paginate({}, { page, limit: 10 });

    return res.json(consult);
  },

  async show(req, res) {
    const consult = await Versao.findById(req.params.id);

    return res.json(consult);
  },

  async store(req, res) {
    const consult = await Versao.create(req.body);

    return res.json(consult);
  },

  async update(req, res) {
    const consult = await Versao.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(consult);
  },

  async remove(req, res) {
    await Versao.findByIdAndRemove(req.params.id);

    return res.send();
  }
};