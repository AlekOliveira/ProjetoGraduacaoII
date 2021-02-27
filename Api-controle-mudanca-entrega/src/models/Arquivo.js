const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FuncaoSistemaSchema = new mongoose.Schema({
  caminho: {
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FuncaoSistemaSchema.plugin(mongoosePaginate);
mongoose.model('FuncaoSistema', FuncaoSistemaSchema); 