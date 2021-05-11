const WorkSchedule = require('../../../../models').WorkSchedule;
const Schedule = WorkSchedule.schedules;

const scheduleCreate = ({scheduleName}) => {
  return new Promise((resolve, reject) => {
    Schedule.findOne({
      where: {
        scheduleName,
      },
    }).then(schedule => {
      if (schedule) {
        reject('Такой график работ уже существует');
        return;
      }
    });
    Schedule.create({
      scheduleName,
    })
      .then(() => {
        resolve('График работ  ' + scheduleName + '  был успешно создан!');
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = scheduleCreate;
