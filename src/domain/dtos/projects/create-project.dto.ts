import { Validators } from '../../../config';

export class CreateProjectDto {

  private constructor(
    public readonly name: string,
    public readonly datecreated: Date,
    public readonly description: number,
    public readonly image: string,
    public readonly models: string[], // ID
  ) { }

  static create( props: { [ key: string ]: any; } ): [ string?, CreateProjectDto?] {

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
      new CreateProjectDto(
        name,
        datecreated,
        description,
        image,
        models,
      )
    ];
  }
}