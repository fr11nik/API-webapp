const scheduleTaskCreate = require('./scheduleTask');
const WorkSchedule = require('../../../../models').WorkSchedule;

const scheduleTask = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  const idList = {};
  if (
    (req.body.worktype2 != '' && req.body.crossing2 == '') ||
    (req.body.worktype2 == '' && req.body.crossing2 != '')
  ) {
    res.status(401).send({
      message:
        'При заполнении поля:`Пересечение 2`  должно быть заполнено поле `Вид работ 2` или наоборот',
    });
  }
  WorkSchedule.units
    .findOne({
      where: {
        unitName: req.workSchedule.unitName,
      },
    })
    .then(item => {
      if (!item) {
        res.status(401).send({message: 'Такой единицы измерения не существует'});
        return;
      }
      idList.unitID = item.id;
      WorkSchedule.workType
        .findOne({
          where: {
            typeName: req.workSchedule.worktype1,
          },
        })
        .then(item => {
          if (!item) {
            res.status(401).send({message: 'Такого вида работы 1 не существует'});
            return;
          }
          idList.workTypeID1 = item.id;
          if (
            req.workSchedule.worktype2 != '' &&
            req.workSchedule.worktype2 != ' '
          ) {
            WorkSchedule.workType
              .findOne({
                where: {
                  typeName: req.workSchedule.worktype2,
                },
              })
              .then(item => {
                if (!item) {
                  res
                    .status(401)
                    .send({message: 'Такого вида работы 2 не существует!'});
                  return;
                }
                idList.workTypeID2 = item.id;
              });
          }
          WorkSchedule.MainTable.findOne({
            where: {
              allByProject: req.body.allByProject,
            },
          }).then(item => {
            if (item) {
              res.status(401).send({
                message:
                  'Такое поле `всего по проекту` уже существует смените значение!',
              });
              return;
            }
            WorkSchedule.schedules
              .findOne({
                where: {
                  scheduleName: req.body.scheduleName,
                },
              })
              .then(item => {
                if (!item) {
                  res.status(401).send({
                    message: 'Такого графика работы не существует!',
                  });
                  return;
                }
                idList.scheduleID = item.id;
                req.workSchedule.idList = idList;
                scheduleTaskCreate(req.workSchedule)
                  .then(result => res.send({message: result}))
                  .catch(err => {
                    res.status(401).send({message: err});
                  });
              });
          });
        });
    });
};

module.exports = scheduleTask;
