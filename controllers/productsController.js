const getAllProductsStatic = async (req, res) => {
  throw new Error('testing anync')
  res.json({ msg: "products static list" });
};

const getAllProducts = async (req, res) => {
  res.json({ msg: "products all list" });
};

module.exports = { getAllProductsStatic, getAllProducts };
