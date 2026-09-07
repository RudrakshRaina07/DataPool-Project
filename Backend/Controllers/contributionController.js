const Contribution = require("../models/contributionModel");

const recordContribution = async (userId) => {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1);

        let contribution = await Contribution.findOne(
            {
                userId, 
                date:{
                    $gte: today,
                    $lt: tomorrow,
                }
            },
        )

        if(contribution){
            contribution.count += 1;
            await contribution.save()
        }else{
            contribution = await Contribution.create({
                userId,
                date: today,
                count: 1
            })
        }
        
        return contribution;

    } catch (error) {
        console.error("Error recording contribution: ", error.message)
        throw error;
    }
}

const getContribution = async (req, res) => {
    const userId = req.params.userId    

    console.log(userId);
    

    try {
        const contribution = await Contribution.find({
            userId
        }).sort({date: 1})

         console.log("Found contributions:", contribution);

        return res.status(200).json(contribution)

    } catch (error) {
        console.error("Error fetching contribution: ", error.message)
        return res.status(500).json({
            error: "Server error"
        })
    }
}

module.exports = {
    recordContribution,
    getContribution
}