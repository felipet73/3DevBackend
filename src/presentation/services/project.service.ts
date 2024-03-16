import { ProjectModel } from '../../data';
import { CreateProjectDto, CustomError, PaginationDto, UpdateProjectDto } from '../../domain';

export class ProjectService {

  // DI
  constructor() { }


  async createProject( createProjectDto: CreateProjectDto ) {

    const projectExists = await ProjectModel.findOne( { name: createProjectDto.name } );
    if ( projectExists ) throw CustomError.badRequest( 'Project already exists' );

    try {

      const project = new ProjectModel( createProjectDto );

      await project.save();

      return project;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



  async getProjects( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;
    try {

      const [ total, projects ] = await Promise.all( [
        ProjectModel.countDocuments(),
        ProjectModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
          .populate('models')
          //.populate('category')
          // .populate('user', 'name email')
      ] );


      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/projects?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: ( page - 1 > 0 ) ? `/api/projects?page=${ ( page - 1 ) }&limit=${ limit }` : null,

        projects: projects,
      };


    } catch ( error ) {
      throw CustomError.internalServer( 'Internal Server Error' );
    }

  }



  async updateProject( updateProjectDto: UpdateProjectDto ) {

    const projectExists = await ProjectModel.findOne( { name: updateProjectDto.name } );
    if ( !projectExists ) throw CustomError.badRequest( 'Project doesn`t exists' );

    try {
      //const project = new ProjectModel( updateProjectDto );
      //await projectExists.update();
      const projectExists = await ProjectModel.findOneAndUpdate({ name: updateProjectDto.name }, updateProjectDto, {
        returnOriginal: false
      });
      //doc.name; // 'Jean-Luc Picard'
      //doc.age; // 59

      return projectExists;

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }



}


