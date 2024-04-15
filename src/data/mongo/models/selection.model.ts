import mongoose, { Schema } from 'mongoose';


const selectionsSchema = new mongoose.Schema( {

  name: {
    type: String,
    required: [ true, 'Name is required' ],
    //unique: true,
  },
  datecreated: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
  },
  ids: {
    type: [String],
  },
  image: {
    type: String,
  },
  type: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  }
  
}, { timestamps: true } );


selectionsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
  },
})


export const SelectionModel = mongoose.model('Selections', selectionsSchema);

