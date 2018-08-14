import * as express from 'express'
import { getRoot } from './getRoot'
import { notfound } from './notfound'
const router = express.Router()

router.get('/', getRoot)
router.get('*', notfound)

export default router
