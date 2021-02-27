const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const SistemaSchema = new mongoose.Schema({
  fk_idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  porta: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SistemaSchema.plugin(mongoosePaginate);
mongoose.model('Sistema', SistemaSchema); 