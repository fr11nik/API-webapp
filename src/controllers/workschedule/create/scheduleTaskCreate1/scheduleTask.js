const WorkSchedule = require('../../../../models').WorkSchedule;
const MainTable = WorkSchedule.MainTable;
const Crossings = WorkSchedule.crossings;
const WorkTypes = WorkSchedule.workTypeList;
const scheduleCreate = ({
  taskDescription,
  crossing1,
  crossing2,
  date,
  personalCount,
  technicsCount,
  allByProject,
  idList,
}) => {
  return new Promise((resolve, reject) => {
    const objectsID = idList;
    const beb = {};
    MainTable.create({
      scheduleId: objectsID.scheduleID,
      taskName: taskDescription,
      unitID: objectsID.unitID,
      allByProject,
      workTypeID: objectsID.workTypeID1,
      crossing: crossing1,
      date,
      personalCount,
      technicsCount,
    }).then(workSchedule => {
      objectsID.workScheduleID = workSchedule.id;
      beb.workScheduleID = workSchedule.id;
      WorkTypes.create({
        workTypeID: objectsID.workTypeID1,
        taskID: workSchedule.id,
      }).then(item => {
        beb.wtd1 = item.id;
        if (objectsID.workTypeID2 != undefined) {
          WorkTypes.create({
            workTypeID: objectsID.workTypeID2,
            taskID: workSchedule.id,
          }).then(item => (beb.wtd2 = item.id));
        }
        if (crossing1 != '') {
          Crossings.create({
            crossingName: crossing1,
            taskID: workSchedule.id,
          }).then(crossing => (beb.crs1 = crossing.id));
        }
        if (crossing2 != '' && crossing2 != ' ') {
          Crossings.create({
            crossingName: crossing2,
            taskID: workSchedule.id,
          })
            .then(item => (beb.crs2 = item.id))
            .catch(err => reject(err));
        }
        resolve('Задача в график была успешно добавлена!');
      });

      resolve('Задача в график была успешно добавлена!');
    });
  });
};
module.exports = scheduleCreate;
