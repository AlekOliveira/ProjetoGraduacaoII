const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TipoMudancaSchema = new mongoose.Schema({    
  tipo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TipoMudancaSchema.plugin(mongoosePaginate);
mongoose.model('TipoMudanca', TipoMudancaSchema); 