export const auth = async(req, res, next) => {
    try {
        console.log(token)
        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error.')
    }
}