const Router = require('express')
const getPlans = require('../controllers/plans/getPlans');
const routerPlans = Router();

routerPlans.get('/plans', getPlans)

module.exports = routerPlans