const validationMiddlewarePost = (req, res, next) => {
    const { name, quantity, category } = req.body;
    if (!name || !quantity || !category) {
        return res.status(400).send('Missing name or quantity or category');
    }
    next();
}

const validationMiddlewarePatch = (req, res, next) => {
    const { name, quantity, category } = req.body;
    if (!name && !quantity && !category) {
        return res.status(400).send('Missing name or quantity or category');
    }
    next();
}


module.exports = { validationMiddlewarePost, validationMiddlewarePatch };
