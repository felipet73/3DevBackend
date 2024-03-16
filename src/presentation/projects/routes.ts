import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProjectController } from './controller';
import { ProjectService } from '../services/project.service';





export class ProjectRoutes {


  static get routes(): Router {

    const router = Router();
    const projectService = new ProjectService();
    const controller = new ProjectController( projectService );

    // Definir las rutas
    router.get( '/', controller.getProjects );
    router.post( '/',[ AuthMiddleware.validateJWT ], controller.createProject );
    router.post( '/update',[ AuthMiddleware.validateJWT ], controller.updateProject );
    return router;
  }


}

