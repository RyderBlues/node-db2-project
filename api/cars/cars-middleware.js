const Cars = require('./cars-model')
const vinValidator = require('vin-validator')


const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
    .then(carId => {
      if (!carId) {
        next({ 
          status: 404, 
          message: `car with id ${req.params.id} is not found` })  
        // res.status(404).json({message: `car with id ${req.params.id} is not found`})
      }
      else {
        next()
      }
    })
    .catch(() => {
      next({status: 500, message: 'Error Checking CarId'})
    })
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 }

  if (vin === undefined) {
    error.message = 'vin is missing'
  }
  else if (make === undefined) {
    error.message = 'make is missing'
  }
  else if (model === undefined) {
    error.message = 'model is missing'
  }
  else if (mileage === undefined) {
    error.message = 'mileage is missing'
  }

  if (error.message) {
    next(error)
  } 
  else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const isValid = vinValidator.validate(vin)
  if (isValid === undefined) {
    next({ status: 500, message:'Error validating Vin' })
  }
  else if (isValid === false) {
    next({ status: 400, message: `vin ${vin} is invalid`})
  }
  else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Cars.getByVin(req.body.vin.trim())
    .then(vin => {
      if (vin) {
        next({ status: 400, message: `vin ${req.body.vin} already exists`})
      }
      else {
        next()
      }
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}