import { Response, Request } from 'express';
import { CreateModelsDto, CustomError, PaginationDto } from '../../domain';
import { ModelsService } from '../services/models.service';

export class ModelsController {

  // DI
  constructor(
    private readonly modelsService: ModelsService,
  ) { }


  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }

    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal server error' } );
  };


  createModel = ( req: Request, res: Response ) => {

    const [ error, createModelsDto ] = CreateModelsDto.create({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.modelsService.createModel( createModelsDto! )
      .then( model => res.status( 201 ).json( model ) )
      .catch( error => this.handleError( error, res ) );

  };

  getModels = async ( req: Request, res: Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    if ( error ) return res.status(400).json({ error });

    
    this.modelsService.getModels( paginationDto! )
      .then( models => res.json( models ))
      .catch( error => this.handleError( error, res ) );

  };


}