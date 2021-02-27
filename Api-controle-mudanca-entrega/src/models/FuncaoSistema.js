const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FuncaoSistemaSchema = new mongoose.Schema({
  fk_idSistema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sistema',
  },
  fk_idFuncao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Funcao',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FuncaoSistemaSchema.plugin(mongoosePaginate);
mongoose.model('FuncaoSistema', FuncaoSistemaSchema); 