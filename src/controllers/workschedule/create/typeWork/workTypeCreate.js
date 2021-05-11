const WorkSchedule = require('../../../../models').WorkSchedule;
const WorkType = WorkSchedule.workType;

const workTypeCreate = async typeName => {
  return new Promise((resolve, reject) => {
    WorkType.findOne({
      where: {
        typeName,
      },
    }).then(typeWork => {
      if (typeWork) {
        resolve({message: 'Данный вид работы уже существует', status: 409});
      } else {
        WorkType.create({
          typeName,
        })
          .then(() => {
            resolve({
              message: 'Вид работы  ' + typeName + '  была успешно создан!',
              status: 200,
            });
          })
          .catch(err => {
            resolve({message: err, status: 401});
          });
      }
    });
  });
};

module.exports = workTypeCreate;
