const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const VersaoSchema = new mongoose.Schema({  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VersaoSchema.plugin(mongoosePaginate);
mongoose.model('Versao', VersaoSchema); 