import { Router } from 'express';

import { Authroutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './products/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImageRoutes } from './images/routes';

import { ProjectRoutes } from './projects/routes';
import { ModelsRoutes } from './models/routes';
import { ViewRoutes } from './views/routes';
import { FolderViewRoutes } from './folders/folderviews/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', Authroutes.routes );
    router.use('/api/categories', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );
    router.use('/api/upload', FileUploadRoutes.routes );
    router.use('/api/images', ImageRoutes.routes );

    router.use('/api/projects', ProjectRoutes.routes );
    router.use('/api/models', ModelsRoutes.routes );
    router.use('/api/views', ViewRoutes.routes );
    router.use('/api/folderviews', FolderViewRoutes.routes );

    return router;
  }


}

