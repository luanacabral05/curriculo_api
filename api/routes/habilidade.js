import { Router } from 'express';
import * as habilidadeController from '../controllers/habilidadeController';

const router = Router();

router.get('/', habilidadeController.getAll);
router.get('/:habilidadeId', habilidadeController.getOne);
router.post('/', habilidadeController.create);
router.put('/:habilidadeId', habilidadeController.update);
router.delete('/:habilidadeId', habilidadeController.remove);

export default router;
