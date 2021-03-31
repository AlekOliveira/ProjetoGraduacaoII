const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ClienteSchema.plugin(mongoosePaginate);
mongoose.model('Cliente', ClienteSchema); 