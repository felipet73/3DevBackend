import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { FolderViewController } from './controller';
import { FolderViewService } from '../../services/folders/folderview.service';


export class FolderViewRoutes {


  static get routes(): Router {

    const router = Router();
    const folderviewService = new FolderViewService();
    const controller = new FolderViewController( folderviewService );

    // Definir las rutas
    router.get( '/', controller.getFolderViews );
    router.get( '/:id', controller.getFolderViewsByProjectId );
    router.post( '/',[ AuthMiddleware.validateJWT ], controller.createFolderView );
    router.post( '/update',[ AuthMiddleware.validateJWT ], controller.updateFolderView );
    return router;
  }


}

