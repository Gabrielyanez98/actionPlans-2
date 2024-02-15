/* const connectionBBDD = require('../../database/connection') */
const pg = require('pg');
const dataConnection = require('../../database/connection');


const getPlans = async (req, res) => {

  try {
    console.log(req.query)

    const connectionBBDD = new pg.Client(dataConnection);
    await connectionBBDD.connect((err, client) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error trying to connect to the database, please try again.",
        });
      }

  

      let queryEstimatedImpDate = "";
      if (req.query.estimatedImpDate) {
        const estimatedImpDate = req.query.estimatedImpDate.split('/')

        queryEstimatedImpDate = " AND " +
          "EXTRACT(MONTH FROM TO_DATE(ad_comp_targ_date, 'DD/MM/YYYY')) = " +
          "" + estimatedImpDate[0] + " " +
          "AND EXTRACT(YEAR FROM TO_DATE(ad_comp_targ_date, 'DD/MM/YYYY')) = " +
          "" + estimatedImpDate[1] + " "
      }

      

      let queryLastModifiedDate = "";
      if (req.query.lastModifiedDate) {
        const lastModifiedDate = req.query.lastModifiedDate.split('/')

        queryLastModifiedDate = " AND " +
          "EXTRACT(MONTH FROM TO_DATE(ad_change_date, 'DD/MM/YYYY')) = " +
          "" + lastModifiedDate[0] + " " +
          "AND EXTRACT(YEAR FROM TO_DATE(ad_change_date, 'DD/MM/YYYY')) = " +
          "" + lastModifiedDate[1] + " "
      }

      let queryProgress = "";
      if(req.query.progress){
        queryProgress = " AND ad_progress = " +
        "'" + req.query.progress + "'"
      }

      let queryDepartment = "";
      if(req.query.department){
        queryDepartment = " AND ad_department = " +
        "'" + req.query.department + "'"
      }

       let queryOrigin = "";
      if(req.query.origin){
        queryOrigin = " AND ad_sourcet = " +
        "'" + req.query.origin + "'"
      }

      let queryStatus = "";
      if(req.query.status){
        queryStatus = " AND ad_status = " +
        "'" + req.query.status + "'"
      }


      //originales.action_drivers_019
      const query = "SELECT action_plan_id, ad_country, ad_name, ad_legal_entity, ad_sourcet, ad_department, ad_comp_targ_date, ad_change_date " +
        "FROM tablones.tb_ap_plans_des WHERE ad_country = " +
        "'" + req.query.country + "'" +
        queryProgress +
        queryOrigin +
        queryStatus +
        queryDepartment +
        queryEstimatedImpDate + 
        queryLastModifiedDate +
        ";"

      /*  WHERE   EXTRACT(MONTH FROM TO_DATE(ad_comp_targ_date, 'DD/MM/YYYY')) = estimatedImpDate[0] AND
       EXTRACT(YEAR FROM TO_DATE(ad_comp_targ_date, 'DD/MM/YYYY')) = estimatedImpDate[1]; */

      console.log(query)

      client.query(
        query
        , (err, results) => {

          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "Error trying to consult plans, please try again.",
            });
          }

          res.status(200).json(
            results.rows
          );

          client.end()
        }
      );
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Error trying to consult plans, please try again.",
    });
  }


  /*  try {

     
        
       return; 
   } catch (error) {
       console.log(error);
       return res.status(500).json({
           message: "It has been an error, please try again."
       });
   } */
}

module.exports = getPlans