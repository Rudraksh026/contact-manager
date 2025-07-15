const validation = (Schema) => async (req,res,next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}

module.exports = {validation}