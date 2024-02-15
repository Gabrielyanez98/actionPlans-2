/* const connectionBBDD = require('../../database/connection') */
const pg = require('pg');
const dataConnection = require('../../database/connection');


const getPlan = async (req, res) => {

  try {

    const connectionBBDD = new pg.Client(dataConnection);
    await connectionBBDD.connect((err, client) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error trying to connect to the database, please try again.",
        });
      }
     
      //originales.action_drivers_019
      const query = "SELECT action_plan_id, ad_country, ad_name, ad_legal_entity, ad_comp_targ_date, ad_change_date, ad_description, ad_sourcet, ad_sourcet_description, ad_risk_id, ad, ad_owner_user, region, ad_global_business, ad_legal_entity, ad_country, ad_department, ad_notes, ad_corporate_comments " +
        "FROM tablones.tb_ap_plans_des WHERE action_plan_id = " +
        "'" + req.query.id + "'" +
        ";"

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
            results.rows[0]
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

module.exports = getPlan