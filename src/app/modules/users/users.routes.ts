import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User routes are working!',
  });
});


export const UserRoutes = router;