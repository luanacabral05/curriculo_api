import { Router } from 'express';
import * as experienciaController from '../controllers/experienciaController';

const router = Router();

router.get('/', experienciaController.getAll);
router.get('/:experienciaId', experienciaController.getOne);
router.post('/', experienciaController.create);
router.put('/:experienciaId', experienciaController.update);
router.delete('/:experienciaId', experienciaController.remove);

export default router;
