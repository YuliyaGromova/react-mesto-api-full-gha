const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');

const { NotFoundError } = require('../errors/not-found-err');

router.use('/api/users', auth, userRoutes);
router.use('/api/cards', auth, cardRoutes);
router.use('/api', authRoutes);
router.all('/*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
