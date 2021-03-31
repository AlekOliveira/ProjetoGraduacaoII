const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ArquivoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ArquivoSchema.plugin(mongoosePaginate);
mongoose.model('Arquivo', ArquivoSchema); 