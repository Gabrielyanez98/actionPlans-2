const Router = require('express');
const deletePlan = require('../controllers/plans/deletePlan');
const getPlan = require('../controllers/plans/getPlan');
const getPlans = require('../controllers/plans/getPlans');
const newPlan = require('../controllers/plans/newPlan');
const updatePlan = require('../controllers/plans/updatePlan');
const routerPlans = Router();

routerPlans.get('/plans', getPlans)
routerPlans.get('/plan', getPlan)

routerPlans.post('/new-plan', newPlan)

routerPlans.put('/update-plan', updatePlan)

/* routerPlans.delete('/delete-plan', deletePlan) */

module.exports = routerPlans