const WorkSchedule = require('../../../models').WorkSchedule;
const Schedule = WorkSchedule.schedules;
const Units = WorkSchedule.units;
const WorkType = WorkSchedule.workType;
const MainTable = WorkSchedule.MainTable;
const Crossings = WorkSchedule.crossings;
const WorkTypeList = WorkSchedule.workTypeList;
const getUnitsAndWorktype = async (req, res) => {
  MainTable.findAll({
    where: {
      scheduleId: req.body.scheduleID,
    },
    order: [['date', 'ASC']],
    attributes: [
      'id',
      'taskName',
      'allByProject',
      'date',
      'personalCount',
      'technicsCount',
      'scheduleId',
    ],
    include: [
      {model: WorkType, attributes: ['id', 'typeName']},
      {model: Units, attributes: ['id', 'unitName']},
    ],
  })
    .then(workschedule =>
      Promise.all(
        workschedule.map(({dataValues: schedule}) =>
          Promise.all([
            Crossings.findAll({
              where: {taskID: schedule.id},
              attributes: ['id', 'crossingName'],
            }),
            WorkTypeList.findAll({
              where: {taskID: schedule.id},
              attributes: ['id', 'workTypeID'], //there id is draft remove !!! if some errors with get table
            }),
          ]).then(async ([crossing, draftWorktypes]) => {
            const typesList = []; ///temp
            const worktypes = await WorkType.findAll({
              attributes: ['id', 'typeName'],
              where: {
                id: draftWorktypes.map(({workTypeID}) => workTypeID),
              },
            });
            //.//////////////TEMP./........................
            for (let i = 0; i < worktypes.length; i++) {
              typesList.push({
                rowID: draftWorktypes[i].id,
                id: worktypes[i].id,
                typeName: worktypes[i].typeName,
              });
            } //this for is draft as well remove !!! if some errors with get table
            return {...schedule, crossing, worktypes: typesList};
          }),
        ),
      ),
    )
    .then(result => {
      res.send(result);
    });
};

module.exports = getUnitsAndWorktype;
