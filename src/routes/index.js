import { Router } from 'express'
import fee from './fee'

const router = Router()

router.use('/mall/:id', fee)

export default router