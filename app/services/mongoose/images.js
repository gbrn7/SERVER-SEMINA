const Images = require('../../api/v1/images/model');


/** 
 * ada 2 cara 
 * 1. cara yang dibawah ini
 * 2. generate url ,setelah submit baru simpan gambarnya 
 */

// * Cara Pertama
const createImages = async(req) => {
  const result = await Images.create({
    name: req.file ? 
    `uploads/${req.file.filename}` 
    : 'uploads/avatar/default.jpeg',
  })

  return result;
}

// * Cara kedua
const generateUrlImages = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
}

module.exports = {createImages, generateUrlImages};