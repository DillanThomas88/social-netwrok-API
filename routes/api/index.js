const router = require('express').Router();
const user = require('./user-routes');
const thoughts = require('./thought-routes');

router.use('/users', user);
router.use('/thoughts', thoughts);

module.exports = router;
