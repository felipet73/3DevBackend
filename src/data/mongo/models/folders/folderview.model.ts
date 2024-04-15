import mongoose, { Schema } from 'mongoose';


const folderviewsSchema = new mongoose.Schema( {

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
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  model: {
    type: Schema.Types.ObjectId,
    ref: 'Models',
    required: true
  },
  views: {
    type: [Schema.Types.ObjectId],
    ref: 'Views',
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


folderviewsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( doc, ret, options ) {
    delete ret._id;
  },
})


export const FolderViewModel = mongoose.model('FolderViews', folderviewsSchema);

