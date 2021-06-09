const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = async (id) => {
  const result = await db('cars')
    .where('id', id).first()

  return result
}

const getByVin = async (vin) => {
  const result = await db('cars')
    .where('vin', vin).first()

  return result
}

const create = async ({ 
  vin, 
  make, 
  model, 
  mileage, 
  title, 
  transmission }) => {

  const [id] = await db('cars') 
    .insert({ vin, make, model, mileage, title, transmission })
  
  return getById(id);
}


module.exports = {
  getAll,
  getById,
  create,
  getByVin
}