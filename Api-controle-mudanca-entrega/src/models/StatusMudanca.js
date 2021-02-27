const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const StatusMudancaSchema = new mongoose.Schema({
  fk_idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  fk_idMudanca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mudanca',
  },
  status: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StatusMudancaSchema.plugin(mongoosePaginate);
mongoose.model('StatusMudanca', StatusMudancaSchema); 