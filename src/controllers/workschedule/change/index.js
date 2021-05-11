const updateField = require('./updateField');
const WorkSchedule = require('../../../models').WorkSchedule;
const {Op} = require('../../../models').Sequelize;
const scheduleSave = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  WorkSchedule.MainTable.findOne({
    where: {
      allByProject: req.body.allByProject,
      id: {[Op.ne]: req.body.id},
    },
  }).then(item => {
    if (item) {
      res.status(401).send({
        message: 'Такое поле `всего по проекту` уже существует смените значение!',
      });
      return;
    }
    //res.send(req.workSchedule);
    updateField(req.workSchedule)
      .then(result => res.send({message: result}))
      .catch(err => {
        res.status(401).send({message: err});
      });
  });
};

module.exports = scheduleSave;
