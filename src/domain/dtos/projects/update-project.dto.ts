import { Validators } from '../../../config';

export class UpdateProjectDto {

  private constructor(
    public readonly name: string,
    public readonly datecreated: Date,
    public readonly description: number,
    public readonly image: string,
    public readonly models: string[], // ID
  ) { }

  static update( props: { [ key: string ]: any; } ): [ string?, UpdateProjectDto?] {

    const {
      name,
      datecreated,
      description,
      image,
      models,
    } = props;

    if ( !name ) return [ 'Missing name' ];
    /*if ( !user ) return [ 'Missing user' ];
    if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];*/
    
    /*if ( !category ) return [ 'Missing category' ];
    if ( !Validators.isMongoID(category) ) return ['Invalid User ID'];*/
    return [
      undefined,
      new UpdateProjectDto(
        name,
        datecreated,
        description,
        image,
        models,
      )
    ];
  }
}