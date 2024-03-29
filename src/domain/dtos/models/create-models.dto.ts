import { Validators } from '../../../config';

export class CreateModelsDto {
 
  private constructor(
    public readonly name: string,
    public readonly datecreated: Date,
    public readonly file: string,
    public readonly description: string,
    public readonly image: string, 
    public readonly urn: string, 
    public readonly main: boolean, 
    public readonly open: boolean, 
    public readonly defaultView: string, 
  ) { }

  static create( props: { [ key: string ]: any; } ): [ string?, CreateModelsDto?] {

    const {
      name,
      datecreated,
      file,
      description,
      image,
      urn,
      main,
      open,
      defaultView
    } = props;

    if ( !name ) return [ 'Missing name' ];
    /*if ( !user ) return [ 'Missing user' ];
    if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];*/
    
    /*if ( !category ) return [ 'Missing category' ];
    if ( !Validators.isMongoID(category) ) return ['Invalid User ID'];*/
    return [
      undefined,
      new CreateModelsDto(
        name,
        datecreated,
        file,
        description,
        image,
        urn,
        main,
        open,
        defaultView
      )
    ];
  }
}