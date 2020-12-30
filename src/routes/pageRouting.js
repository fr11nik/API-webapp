const router = require('express').Router();
const path = require('path');
const {authJwt} = require('../middlewares');
// const {pageAccess} = require('../controllers');
//Posts queries
// router.get('/', (req, res) => {
//   res.sendFile(path.join(changeDirPath('views') + '/index.html'));
// });
// router.get('/:permission', [authJwt.verifyToken], pageAccess.separatePermission);
router.get('/adminpanel', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  res.status(200).send({message:'adminpanel'});
});

router.get('/moderatorpanel', [authJwt.verifyToken, authJwt.isModerator], (req, res) => {
  res.status(200).send({message:'moderatorpanel'});
});

router.get('/userpanel', [authJwt.verifyToken], (req, res) => {
  res.status(200).send({message:'userpanel'});
});
function changeDirPath(directoryName) {
  return __dirname.replace('routes', directoryName);
}
module.exports = router;
