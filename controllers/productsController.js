const productsModel = require("../models/productsModel");
const getAllProductsStatic = async (req, res) => {
  // const products = await productsModel.find({}).sort("-price");
  // const products = await productsModel.find({}).sort("-name");
  // const products = await productsModel.find({}).select("price name");
  // const products = await productsModel.find({}).select("price name").limit(1);
  // const products = await productsModel
  //   .find({})
  //   .sort("-name")
  //   .select("price name")
  //   .limit(2);
  const products = await productsModel.find({ price: { $gt: 10 } });
  // const products = await productsModel.find({});
  res.json({ products, totalProducts: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numbericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numbericFilters) {
    // console.log(numbericFilters);
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numbericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  let result = productsModel.find(queryObject);

  //sort
  if (sort) {
    const sorList = sort.split(",").join(" ");
    result = result.sort(sorList);
  } else {
    result = result.sort("createAt");
  }

  //fields

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  //page

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.page) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  //
  const products = await result;
  res.json({ products, totalProducts: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
