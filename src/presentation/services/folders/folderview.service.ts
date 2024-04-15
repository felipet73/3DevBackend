import { FolderViewModel } from '../../../data';
import { CreateFolderViewDto, CustomError, PaginationDto, UpdateFolderViewDto } from '../../../domain';

export class FolderViewService {

  // DI
  constructor() { }


  async createFolderView( createFolderViewDto: CreateFolderViewDto ) {

    //const folderViewExists = await FolderViewModel.findOne( { name: createFolderViewDto.name } );
    //if ( folderViewExists ) throw CustomError.badRequest( 'FolderView already exists' );

    try {

      const folderview = new FolderViewModel( createFolderViewDto );

      await folderview.save();

      return folderview;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



  async getFolderViews( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;
    try {

      const [ total, folderviews ] = await Promise.all( [
        FolderViewModel.countDocuments(),
        FolderViewModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )          
          .populate('model')
          //.populate('project')
          .populate('user')
          //.populate('project')
          //.populate('category')
          // .populate('user', 'name email')
      ] );


      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/folderviews?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: ( page - 1 > 0 ) ? `/api/folderviews?page=${ ( page - 1 ) }&limit=${ limit }` : null,

        folderviews: folderviews,
      };


    } catch ( error ) {
      throw CustomError.internalServer( 'Internal Server Error' );
    }

  }


  async getFolderViewsByProjectId( paginationDto: PaginationDto, id:string ) {

    const { page, limit } = paginationDto;
    try {

      const [ total, folderviews ] = await Promise.all( [
        FolderViewModel.countDocuments(),
        FolderViewModel.find({ project: id})

          //.skip( ( page - 1 ) * limit )
          //.limit( limit )          
          .populate('views')
          //.populate('project')
          //.populate('user')
          //.populate('project')
          //.populate('category')
          // .populate('user', 'name email')
      ] );


      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/folderviews?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: ( page - 1 > 0 ) ? `/api/folderviews?page=${ ( page - 1 ) }&limit=${ limit }` : null,

        folderviews: folderviews,
      };


    } catch ( error ) {
      throw CustomError.internalServer( 'Internal Server Error' );
    }

  }




  async updateFolderView( updateFolderViewDto: UpdateFolderViewDto ) {

    const folderViewExists = await FolderViewModel.findOne( { project: updateFolderViewDto.project, model: updateFolderViewDto.model } );
    if ( !folderViewExists ) throw CustomError.badRequest( 'FolderView doesn`t exists' );

    try {
      //const view = new ViewModel( updateViewDto );
      //await viewExists.update();
      const folderviewExists = await FolderViewModel.findOneAndUpdate({ project: updateFolderViewDto.project, model: updateFolderViewDto.model }, updateFolderViewDto, {
        returnOriginal: false
      });
      //doc.name; // 'Jean-Luc Picard'
      //doc.age; // 59

      return folderviewExists;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



}


