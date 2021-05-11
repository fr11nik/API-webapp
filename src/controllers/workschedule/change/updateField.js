const WorkSchedule = require('../../../models').WorkSchedule;
const Schedule = WorkSchedule.MainTable;
const Crossings = WorkSchedule.crossings;
const WorkTypes = WorkSchedule.workTypeList;
const updateField = ({
  allByProject,
  crossing,
  date,
  id,
  personalCount,
  scheduleId,
  taskName,
  technicsCount,
  unit,
  worktypes,
}) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 2; i++) {
      const itemCrossing = crossing[i];
      const itemWorkType = worktypes[i];
      if (itemCrossing.id == '-') {
        if (
          itemCrossing.crossingName.length > 0 ||
          itemCrossing.crossingName.length < 200
        ) {
          Crossings.create({
            crossingName: itemCrossing.crossingName,
            taskID: id,
          }).then(crossingItem => {
            crossing[i].id = crossingItem.id;
          });
        }
      } else {
        Crossings.update(
          {crossingName: itemCrossing.crossingName, taskID: id},
          {
            where: {
              id: itemCrossing.id,
            },
          },
        );
      }
      if (itemWorkType.rowID) {
        WorkTypes.update(
          {workTypeID: itemWorkType.id, taskID: id},
          {where: {id: itemWorkType.rowID}},
        );
      } else if (itemWorkType.id != '-') {
        WorkTypes.create({workTypeID: itemWorkType.id, taskID: id}).then(
          worktype => {
            worktypes[i].rowID = worktype.id;
          },
        );
      }
    }
    Schedule.update(
      {
        taskName,
        allByProject,
        date,
        personalCount,
        technicsCount,
        unitID: unit.id,
      },
      {
        where: {
          scheduleId,
          id,
        },
      },
    )
      .then(() => {
        resolve({
          text: 'Данные были успешно обновлены',
          data: {crossing, worktypes},
        });
      })
      .catch(err => reject(err));
  });
};

module.exports = updateField;
