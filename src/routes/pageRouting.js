const router = require('express').Router();
const path = require('path');
//Posts queries
router.get('/', (req,res) => {
    res.sendFile(path.join(changeDirPath('views') + '/index.html'));
});
router.get('/:id', (req,res) => {
    let a = path.join(changeDirPath('views') + '/' + req.params.id + '.html');
    res.sendFile(a);  
});
function  changeDirPath(directoryName) {
   return __dirname.replace('routes',directoryName);
}
module.exports = router;