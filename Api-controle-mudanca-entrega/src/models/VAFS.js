//Versao de um arquivo da funcao de um sistema

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const VAFSSchema = new mongoose.Schema({  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VAFSSchema.plugin(mongoosePaginate);
mongoose.model('VAFS', VAFSSchema); 