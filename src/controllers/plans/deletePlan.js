/* const connectionBBDD = require('../../database/connection') */
const pg = require('pg');
const dataConnection = require('../../database/connection');


const deletePlan = async (req, res) => {

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
            const query = "DELETE FROM tablones.tb_ap_plans_des WHERE action_plan_id = " +
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

                    res.status(200).json({
                        message: "Plan deleted."
                    });

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

module.exports = deletePlan