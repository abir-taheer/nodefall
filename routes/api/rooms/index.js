const router = require('express').Router();

router.use('/create', require('./create'));
router.use('/:publicID', require('./lookup'));

module.exports = router;