const router = require('express').Router();

router.use('/create', require('./create'));
router.use('/:publicId/join', require('./join'));
router.use('/:publicId', require('./lookup'));

module.exports = router;
