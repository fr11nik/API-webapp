const WorkSchedule = require('../../../../models').WorkSchedule;
const Schedule = WorkSchedule.schedules;
const Units = WorkSchedule.units;
const WorkType = WorkSchedule.workType;
const MainTable = WorkSchedule.MainTable;
const Crossings = WorkSchedule.crossings;
const WorkTypes = WorkSchedule.workTypeList;
const scheduleCreate = (
  {
    taskDescription,
    crossing,
    date,
    personalCount,
    technicsCount,
    unitName,
    allByProject,
    workType,
  },
  scheduleName,
) => {
  return new Promise((resolve, reject) => {
    const objectsID = {};
    Schedule.findOne({
      where: {
        scheduleName,
      },
    }).then(res => {
      objectsID.scheduleID = res.id;
      Units.findOne({
        where: {
          unitName,
        },
      }).then(res => {
        objectsID.unitID = res.id;
        WorkType.findOne({
          where: {
            typeName: workType,
          },
        }).then(res => {
          if ((crossing = '')) crossing = ' ';
          objectsID.workTypeID = res.id;
          MainTable.create({
            scheduleId: objectsID.scheduleID,
            taskNameID: objectsID.taskNameID,
            unitID: objectsID.unitID,
            allByProject,
            workTypeID: objectsID.workTypeID,
            crossing,
            date,
            personalCount,
            technicsCount,
            taskName: taskDescription,
          }).then(workSchedule => {
            objectsID.workScheduleID = workSchedule.id;
            WorkTypes.create({
              workTypeID: objectsID.workTypeID,
              taskID: objectsID.workScheduleID,
            })
              .then(() => {
                if (crossing != ' ') {
                  Crossings.create({
                    crossingName: crossing,
                    taskID: workSchedule.id,
                  })
                    .then(() => resolve('Задача в график была успешно добавлена!'))
                    .catch(err => reject(err));
                }
                resolve('Задача в график была успешно добавлена!');
              })
              .catch(err => reject(err));
          });
        });
      });
    });
  });
};
module.exports = scheduleCreate;
