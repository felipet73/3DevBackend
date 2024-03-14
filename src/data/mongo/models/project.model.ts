import mongoose, { Schema } from 'mongoose';


const projectSchema = new mongoose.Schema( {

  name: {
    type: String,
    required: [ true, 'Name is required' ],
    unique: true,
  },
  datecreated: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  
  models: {
    type: [Schema.Types.ObjectId],
    ref: 'Models',
    required: true
  },

}, { timestamps: true } );


projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
  },
})


export const ProjectModel = mongoose.model('Projects', projectSchema);

