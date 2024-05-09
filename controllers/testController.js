 const  testController = (req,res) => {
    res.status(200).send({
        message:"Welcome USer",
        success:true,
    });
};

module.exports = {testController};