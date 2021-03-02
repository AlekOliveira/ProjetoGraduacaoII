//Foi utilizado o semantic versioning para definir a versao de um arquivo.
// versao == dia.mes.ano.build

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const VersaoSchema = new mongoose.Schema({  
  fk_idArquivo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Arquivo',
  },
  data: {
    type: Date,
    required: true,
  },
  build: {
    type: String,
    required: true,      
  },
  caminho: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VersaoSchema.plugin(mongoosePaginate);
mongoose.model('Versao', VersaoSchema); 