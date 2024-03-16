import { Response, Request } from 'express';
import { CreateProjectDto, CustomError, PaginationDto, UpdateProjectDto } from '../../domain';
import { ProjectService } from '../services/project.service';

export class ProjectController {

  // DI
  constructor(
    private readonly projectService: ProjectService,
  ) { }


  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }

    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal server error' } );
  };


  createProject = ( req: Request, res: Response ) => {

    const [ error, createProjectDto ] = CreateProjectDto.create({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.projectService.createProject( createProjectDto! )
      .then( project => res.status( 201 ).json( project ) )
      .catch( error => this.handleError( error, res ) );

  };

  getProjects = async ( req: Request, res: Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    if ( error ) return res.status(400).json({ error });

    
    this.projectService.getProjects( paginationDto! )
      .then( projects => res.json( projects ))
      .catch( error => this.handleError( error, res ) );

  };


  updateProject = ( req: Request, res: Response ) => {

    const [ error, updateProjectDto ] = UpdateProjectDto.update({ 
      ...req.body,
      user: req.body.user.id,
    });
    if ( error ) return res.status( 400 ).json( { error } );


    this.projectService.updateProject( updateProjectDto! )
      .then( project => res.status( 201 ).json( project ) )
      .catch( error => this.handleError( error, res ) );

  };

}