import { Response, Request } from 'express';
import { CreateFolderViewDto, CustomError, PaginationDto, UpdateFolderViewDto } from '../../../domain';
import { FolderViewService } from '../../services/folders/folderview.service';

export class FolderViewController {

  // DI
  constructor(
    private readonly folderviewService: FolderViewService,
  ) { }


  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }

    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal server error' } );
  };


  createFolderView = ( req: Request, res: Response ) => {

    const [ error, createFolderViewDto ] = CreateFolderViewDto.create({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.folderviewService.createFolderView( createFolderViewDto! )
      .then( view => res.status( 201 ).json( view ) )
      .catch( error => this.handleError( error, res ) );

  };
  

  getFolderViews = async ( req: Request, res: Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    if ( error ) return res.status(400).json({ error });

    
    this.folderviewService.getFolderViews( paginationDto! )
      .then( folderviews => res.json( folderviews ))
      .catch( error => this.handleError( error, res ) );

  };

  getFolderViewsByProjectId = async ( req: Request, res: Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    if ( error ) return res.status(400).json({ error });

    console.log('Parametro',req.params.id)
    this.folderviewService.getFolderViewsByProjectId( paginationDto!, req.params.id )
      .then( folderviews => res.json( folderviews ))
      .catch( error => this.handleError( error, res ) );

  };

  updateFolderView = ( req: Request, res: Response ) => {

    const [ error, updateFolderViewDto ] = UpdateFolderViewDto.update({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.folderviewService.updateFolderView( updateFolderViewDto! )
      .then( folderview => res.status( 201 ).json( folderview ) )
      .catch( error => this.handleError( error, res ) );

  };

}