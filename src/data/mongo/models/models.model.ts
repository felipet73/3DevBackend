import mongoose, { Schema } from 'mongoose';


const modelsSchema = new mongoose.Schema( {

  name: {
    type: String,
    required: [ true, 'Name is required' ],
    //unique: true,
  },
  datecreated: {
    type: Date,
    default: Date.now(),
  },
  file: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  urn: {
    type: String,
  },
  main: {
    type: Boolean,
  },
  open: {
    type: Boolean,
  },
  defaultView: {
    type: String,
  },
  /*user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }*/
  
}, { timestamps: true } );


modelsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
  },
})


export const ModelsModel = mongoose.model('Models', modelsSchema);

