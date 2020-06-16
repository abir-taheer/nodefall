const router = require('express').Router();
const errorHandler = require('./../../middleware/errorHandler');

router.use('/state', require('./state'));

router.use(errorHandler);

module.exports = router;
