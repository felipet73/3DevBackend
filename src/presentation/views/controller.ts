import { Response, Request } from 'express';
import { CreateViewDto, CustomError, PaginationDto, UpdateViewDto } from '../../domain';
import { ViewService } from '../services/view.service';

export class ViewController {

  // DI
  constructor(
    private readonly viewService: ViewService,
  ) { }


  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }

    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal server error' } );
  };


  createView = ( req: Request, res: Response ) => {

    const [ error, createViewDto ] = CreateViewDto.create({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.viewService.createView( createViewDto! )
      .then( view => res.status( 201 ).json( view ) )
      .catch( error => this.handleError( error, res ) );

  };

  getViews = async ( req: Request, res: Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    if ( error ) return res.status(400).json({ error });

    
    this.viewService.getViews( paginationDto! )
      .then( views => res.json( views ))
      .catch( error => this.handleError( error, res ) );

  };


  updateView = ( req: Request, res: Response ) => {

    const [ error, updateViewDto ] = UpdateViewDto.update({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.viewService.updateView( updateViewDto! )
      .then( view => res.status( 201 ).json( view ) )
      .catch( error => this.handleError( error, res ) );

  };

}