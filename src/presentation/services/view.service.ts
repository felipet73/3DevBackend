import { ViewModel } from '../../data';
import { CreateViewDto, CustomError, PaginationDto, UpdateViewDto } from '../../domain';

export class ViewService {

  // DI
  constructor() { }


  async createView( createViewDto: CreateViewDto ) {

    const viewExists = await ViewModel.findOne( { name: createViewDto.name } );
    if ( viewExists ) throw CustomError.badRequest( 'View already exists' );

    try {

      const view = new ViewModel( createViewDto );

      await view.save();

      return view;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



  async getViews( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;
    try {

      const [ total, views ] = await Promise.all( [
        ViewModel.countDocuments(),
        ViewModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
          .populate('user')
          //.populate('category')
          // .populate('user', 'name email')
      ] );


      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/views?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: ( page - 1 > 0 ) ? `/api/views?page=${ ( page - 1 ) }&limit=${ limit }` : null,

        views: views,
      };


    } catch ( error ) {
      throw CustomError.internalServer( 'Internal Server Error' );
    }

  }



  async updateView( updateViewDto: UpdateViewDto ) {

    const viewExists = await ViewModel.findOne( { name: updateViewDto.name } );
    if ( !viewExists ) throw CustomError.badRequest( 'View doesn`t exists' );

    try {
      //const view = new ViewModel( updateViewDto );
      //await viewExists.update();
      const viewExists = await ViewModel.findOneAndUpdate({ name: updateViewDto.name }, updateViewDto, {
        returnOriginal: false
      });
      //doc.name; // 'Jean-Luc Picard'
      //doc.age; // 59

      return viewExists;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



}


