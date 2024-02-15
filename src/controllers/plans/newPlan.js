const dataConnection = require('../../database/connection');
const pg = require('pg');




const newPlan = (req, res) => {
 

    const {
        globalBusiness,
        legalEntity,
        region,
        country,
        actionPlanName,
        actionPlanDescription,
        estimatedImplementationDate,
        origin,
        originDescription,
        department,
        localImpOwner
    } = req.body

    try {

        const connectionBBDD = new pg.Client(dataConnection);
        connectionBBDD.connect((err) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Error al consultar los planes",
                });

            }


            const query = `
        INSERT INTO tablones.tb_ap_plans_des ( 
          ad_name,
          ad_description,
          ad_country,
          ad_legal_entity,
          ad_comp_targ_date,
          ad_global_business,
          region,
          ad_sourcet,
          ad_sourcet_description,
          ad_department,
          ad_owner_user
        )
        VALUES (
         '${actionPlanName}',
        '${actionPlanDescription}',
         '${country}',
         '${legalEntity}',
         '${estimatedImplementationDate}',
         '${globalBusiness ? globalBusiness : '-'}',
         '${region ? region : '-'}',
         '${origin}',
         '${originDescription}',
         '${department ? department : '-'}',
         '${localImpOwner ? localImpOwner : '-'}'
        );
      `

            console.log(query);

            connectionBBDD.query(
                query,
                (err, results) => {
                    if (results?.rowCount !== 1) {
                        return res.status(500).json({
                            message: "Error trying to add a new plan, please try again.",
                        });
                    }

                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            message: "Error trying to add a new plan, please try again.",
                        });
                    }

                    res.status(200).json({ message: "New plan added" });
                    connectionBBDD.end();
                });

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error trying to add a new plan, please try again.",
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

module.exports = newPlan