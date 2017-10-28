module.exports = function(app) {
  var billControl = require('../controllers/billsController');

  app.route('/bills')
    .get(billControl.list_all_bills)
    .post(billControl.add_a_bill);

  app.route('/bills/:famId')
    .get(billControl.list_someones_bills);
};
