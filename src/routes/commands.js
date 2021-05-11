const router = require('express').Router();
const {verifySignUp, authJwt, workschedulesVerify} = require('../middlewares');

const joiVerify = require('../controllers').joi;
const userController = require('../controllers').user;
const workschedulesController = require('../controllers').workSchedule;
router.post(
  '/node-cm/createUser',
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.checkDuplicateUsernameOrEmail.checkUser,
    verifySignUp.checkRolesExisted,
    joiVerify.createUserVerify,
  ],
  userController.create,
);
router.get('/node-cm/user', authJwt.verifyToken, userController.getInfo);
router.post(
  '/node-cm/workschedule/create',
  [
    authJwt.verifyToken,
    authJwt.isDirector,
    workschedulesVerify,
    joiVerify.scheduleVerify,
  ],
  workschedulesController.create.scheduleCreate,
);
router.get(
  '/node-cm/workschedule/schedules/get',
  [authJwt.verifyToken, authJwt.isDirector],
  workschedulesController.get.schedules,
);
router.get(
  '/node-cm/workschedule/unitsAndWorkType/get',
  [authJwt.verifyToken, authJwt.isDirector],
  workschedulesController.get.unitsAndWorktype,
);
router.post(
  '/node-cm/workschedule/scheduleTask/create',
  [authJwt.verifyToken, authJwt.isDirector, joiVerify.ScheduleTaskAddVerify],
  workschedulesController.create.scheduleTaskCreate,
);
router.post(
  '/node-cm/workschedule/scheduleTask1/create',
  [authJwt.verifyToken, authJwt.isDirector, joiVerify.ScheduleTaskAddVerify1],
  workschedulesController.create.scheduleTaskCreate1,
);
router.post(
  '/node-cm/workschedule/scheduleTask/get',
  [authJwt.verifyToken, authJwt.isDirector],
  workschedulesController.get.workScheduleData,
);
router.post(
  '/node-cm/unit/create',
  [authJwt.verifyToken, authJwt.isDirector],
  workschedulesController.create.unit,
);
router.post(
  '/node-cm/workschedule/scheduleField/change',
  [joiVerify.changeField],
  workschedulesController.change,
);
router.post(
  '/node-cm/worktype/create',
  [authJwt.verifyToken, authJwt.isDirector],
  workschedulesController.create.workType,
);
router.post(
  '/node-cm/workschedule/delete',
  [authJwt.verifyToken, authJwt.isDirector],
  workschedulesController.remove.workschedule,
);
router.get('/api/users/getAll', userController.get);
module.exports = router;
//'/node-cm/workschedule/create',
