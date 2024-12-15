module.exports = function errorHandler(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke! Please try again or contact with developers');
};