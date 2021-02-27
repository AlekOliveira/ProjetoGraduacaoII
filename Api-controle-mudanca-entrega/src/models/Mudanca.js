const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MudancaSchema = new mongoose.Schema({
  fk_idSistema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sistema',
  },
  fk_idTipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tipo',
  },
  fk_idStatusMudanca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StatusMudanca',
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

MudancaSchema.plugin(mongoosePaginate);
mongoose.model('Mudanca', MudancaSchema); 