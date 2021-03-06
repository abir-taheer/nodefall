const router = require('express').Router();
const errorHandler = require('./../../middleware/errorHandler');

router.use(require('./../../middleware/roomValidator'));
router.use('/state', require('./state'));
router.use('/rooms', require('./rooms'));

router.use(errorHandler);

module.exports = router;
