const WorkSchedule = require('../../../models').WorkSchedule;
const Schedule = WorkSchedule.MainTable;

const deleteSchedule = (req, res) => {
  const scheduleID = req.body.scheduleID;
  if (scheduleID == null) {
    res.status(400).send({message: 'Не удалось удалить строку'});
    return;
  }
  Schedule.destroy({
    where: {
      id: scheduleID,
    },
  }).then(() => {
    res.send({message: 'Строка была успешно удалена'});
  });
};
module.exports = deleteSchedule;
