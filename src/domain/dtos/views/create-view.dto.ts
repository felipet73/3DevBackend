import { Validators } from '../../../config';


export class CreateViewDto {

  private constructor(
    public readonly name: string,
    public readonly datecreated: Date,
    public readonly description: number,
    public readonly ids: string[],
    public readonly image: string,
    public readonly type: string,
    public readonly user: string,
    public readonly to: string[],
  ) { }

  static create( props: { [ key: string ]: any; } ): [ string?, CreateViewDto?] {

    const {
      name,
        datecreated,
        description,
        ids,
        image,
        type,
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
      new CreateViewDto(
        name,
        datecreated,
        description,
        ids,
        image,
        type,
        user,
        to
      )
    ];
  }
}