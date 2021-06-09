const router = require('express').Router()
const Cars = require('./cars-model')

const {checkCarId,
       checkCarPayload,
       checkVinNumberValid,
       checkVinNumberUnique
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try {
        const data = await Cars.getAll()
        res.json(data)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id)
        res.json(car)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique, 
    async (req, res, next) => {
        try {
            const data = await Cars.create(req.body)
            res.json(data)
        }
        catch (err) {
            next(err)
        }
    })

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message, stack: err.stack})
})

module.exports = router