module.exports = function(app) {
  var familyControl = require('../controllers/familyController');

  app.route('/family')
    .get(familyControl.list_all_families)
    .post(familyControl.add_family);

  app.route('/family/:famId')
    .get(familyControl.get_family)
    .delete(familyControl.delete_family);

};
