const router = require('express').Router();
const path = require('path');
const {authJwt} = require('../middlewares');
const {pageAccess} = require('../controllers');
//Posts queries
router.get('/', (req, res) => {
  res.sendFile(path.join(changeDirPath('views') + '/index.html'));
});
router.get('/:permission', [authJwt.verifyToken], pageAccess.separatePermission);

function changeDirPath(directoryName) {
  return __dirname.replace('routes', directoryName);
}
module.exports = router;
