import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ViewController } from './controller';
import { ViewService } from '../services/view.service';





export class ViewRoutes {


  static get routes(): Router {

    const router = Router();
    const viewService = new ViewService();
    const controller = new ViewController( viewService );

    // Definir las rutas
    router.get( '/', controller.getViews );
    router.post( '/',[ AuthMiddleware.validateJWT ], controller.createView );
    router.post( '/update',[ AuthMiddleware.validateJWT ], controller.updateView );
    return router;
  }


}

