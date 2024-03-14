import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ModelsController } from './controller';
import { ModelsService } from '../services/models.service';





export class ModelsRoutes {


  static get routes(): Router {

    const router = Router();
    const modelsService = new ModelsService();
    const controller = new ModelsController( modelsService );

    // Definir las rutas
    router.get( '/', controller.getModels );
    router.post( '/',[ AuthMiddleware.validateJWT ], controller.createModel );

    return router;
  }


}

