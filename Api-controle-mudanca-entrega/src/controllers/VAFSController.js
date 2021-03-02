const mongoose = require('mongoose');
const VAFS = mongoose.model('VAFS');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; //obtem o parâmetro 'page' informado no GET                
    const consult = await VAFS.paginate({}, { page, limit: 10 });

    return res.json(consult);
  },

  async show(req, res) {
    const consult = await VAFS.findById(req.params.id);

    return res.json(consult);
  },

  async store(req, res) {
    const consult = await VAFS.create(req.body);

    return res.json(consult);
  },

  async update(req, res) {
    const consult = await VAFS.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(consult);
  },

  async remove(req, res) {
    await VAFS.findByIdAndRemove(req.params.id);

    return res.send();
  }
};