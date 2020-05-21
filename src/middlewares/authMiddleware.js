const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            error: 'No token provided'
        });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({
            error: 'Token error'
        });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({
            error: 'Token malformatted'
        });
    }

    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Token invalid'
            });
        }

        req.userId = decoded.id;

        next();
    });
}