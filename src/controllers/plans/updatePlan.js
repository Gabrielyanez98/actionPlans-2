const pg = require("pg");
const dataConnection = require("../../database/connection");

const updatePlan = async (req, res) => {

    const connectionBBDD = new pg.Client(dataConnection);
    await connectionBBDD.connect((err, client) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error trying to connect to the database, please try again.",
            });
        }

        const query = "UPDATE tablones.tb_ap_plans_des" +
            " SET ad_name = " + "'" + req.body.ad_name + "'" +
            ", ad_description = " + "'" + req.body.ad_description + "'" +
            ", ad_sourcet = " + "'" + req.body.ad_sourcet + "'" +
            ", ad_sourcet_description = " + "'" + req.body.ad_sourcet_description + "'" +
            " WHERE action_plan_id = " + "'" + req.body.action_plan_id + "'" +
            ";"
console.log(query)
        client.query(
            query,
            (err, results) => {
                console.log(results)
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Error al consultar los planes",
                    });
                }

                res.status(200).json({ 
                    message: "Plan updated."
                 });
                connectionBBDD.end();
            });

});


    /*  try {
  
       
          
         return; 
     } catch (error) {
         console.log(error);
         return res.status(500).json({
             message: "It has been an error, please try again."
         });
     } */
}

module.exports = updatePlan