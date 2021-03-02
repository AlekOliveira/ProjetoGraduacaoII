const mongoose = require('mongoose');
const Sistema = mongoose.model('Sistema');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; //obtem o parâmetro 'page' informado no GET                
    const consult = await Sistema.paginate({}, { page, limit: 10 });

    return res.json(consult);
  },

  async show(req, res) {
    const consult = await Sistema.findById(req.params.id);

    return res.json(consult);
  },

  async store(req, res) {
    const consult = await Sistema.create(req.body);

    return res.json(consult);
  },

  async update(req, res) {
    const consult = await Sistema.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(consult);
  },

  async remove(req, res) {
    await Sistema.findByIdAndRemove(req.params.id);

    return res.send();
  }
};