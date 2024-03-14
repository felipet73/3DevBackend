import { ModelsModel } from '../../data';
import { CreateModelsDto, CustomError, PaginationDto } from '../../domain';

export class ModelsService {

  // DI
  constructor() { }


  async createModel( createModelsDto: CreateModelsDto ) {

    //const modelsExists = await ModelsModel.findOne( { name: CreateModelsDto.name } );
    //if ( modelsExists ) throw CustomError.badRequest( 'models already exists' );

    try {

      const model = new ModelsModel( createModelsDto );
      await model.save();
      return model;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



  async getModels( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;


    try {

      const [ total, models ] = await Promise.all( [
        ModelsModel.countDocuments(),
        ModelsModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
          //.populate('user')
          //.populate('category')
          // .populate('user', 'name email')
      ] );


      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/models?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: ( page - 1 > 0 ) ? `/api/models?page=${ ( page - 1 ) }&limit=${ limit }` : null,

        models: models,
      };


    } catch ( error ) {
      throw CustomError.internalServer( 'Internal Server Error' );
    }




  }




}


