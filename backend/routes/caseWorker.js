module.exports = function(app) {
  var workerControl = require('../controllers/caseworkerController');

  app.route('/worker')
    .get(workerControl.list_all_workers)
    .post(workerControl.add_a_worker);

  app.route('/worker/:caseWorkerId')
    .get(workerControl.list_a_worker);
};
