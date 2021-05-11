const WorkSchedule = require('../../../../models').WorkSchedule;
const Units = WorkSchedule.units;

const unitCreate = unitName => {
  return new Promise((resolve, reject) => {
    Units.findOne({
      where: {
        unitName,
      },
    }).then(unit => {
      if (unit) {
        resolve({message: 'Такая единица измерения уже существует', status: 409});
        return;
      } else {
        Units.create({
          unitName,
        })
          .then(() => {
            resolve({
              message: 'Единица измерения  ' + unitName + '  была успешно создан!',
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

module.exports = unitCreate;
