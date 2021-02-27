const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FuncaoSchema = new mongoose.Schema({
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

FuncaoSchema.plugin(mongoosePaginate);
mongoose.model('Funcao', FuncaoSchema); 