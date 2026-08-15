const analyticsSvc = require("../service/analytics_svc");

/* -------------------------------- */
/* Get Monthly Analytics Summary    */
/* -------------------------------- */

const getMonthlyAnalytics = async (req, res, next) => {

    try {

        const month = req.query.month || new Date().toISOString().slice(0, 7);

        const data = await analyticsSvc.getMonthlyAnalytics(month);

        res.status(200).json({

            success: true,

            message: "Analytics retrieved successfully",

            data

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

module.exports = {
    getMonthlyAnalytics
};
