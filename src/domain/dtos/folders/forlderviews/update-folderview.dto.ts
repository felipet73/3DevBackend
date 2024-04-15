import { Validators } from '../../../../config';

export class UpdateFolderViewDto {

  private constructor(
    public readonly name: string,
    public readonly datecreated: Date,
    public readonly description: number,
    public readonly project: string,
    public readonly model: string,
    public readonly views: string[],
    public readonly user: string,
    public readonly to: string[],
  ) { }

  static update( props: { [ key: string ]: any; } ): [ string?, UpdateFolderViewDto?] {

    const {
      name,
      datecreated,
      description,
      project,
      model,
      views,
      user,
      to,
    } = props;

    if ( !name ) return [ 'Missing name' ];
    /*if ( !user ) return [ 'Missing user' ];
    if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];*/
    
    /*if ( !category ) return [ 'Missing category' ];
    if ( !Validators.isMongoID(category) ) return ['Invalid User ID'];*/
    return [
      undefined,
      new UpdateFolderViewDto(
        name,
        datecreated,
        description,
        project,
        model,
        views,
        user,
        to,
      )
    ];
  }
}