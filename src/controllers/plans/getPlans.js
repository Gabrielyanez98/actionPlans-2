const connectionBBDD = require('../../database/connection')

const getPlans = (req, res) => {
    try {

      connectionBBDD.query('SELECT "valor" FROM originales.action_drivers_019 LIMIT 1', (err, results) => {
            console.log(results)
            if (err) {
              console.error(err);
              return res.status(500).json({
                message: "Error al consultar los planes",
              });
            }
      
            res.status(200).json({ plans: results.rows });
          });
        return; 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "It has been an error, please try again."
        });
    }
}

module.exports = getPlans