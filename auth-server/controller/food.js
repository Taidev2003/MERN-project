const Food = require("../model/Food");

const createFood = async (req, res) => {
  try {
    console.log(req.body);
    // const { name, price, description, category, weight, foodImange } = req.body;
    const newFood = new Food(req.body);
    const saveFood = newFood.save();
    res.status(200).json({
      message: "Food saved successfully",
      success: true,
      data: {
        food: saveFood,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

const getAllFood = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);
    if (category === "all") {
      const foodItems = await Food.find();

      res.status(200).send({
        message: "Get all Food successfully",
        success: true,
        data: {
          food: foodItems,
        },
      });
    } else {
      const foodItems = await Food.find({ category: category });

      res.status(200).send({
        message: "Get all Food successfully",
        success: true,
        data: {
          food: foodItems,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

const getNewFood = async (req, res) => {
  try {
    const foodItems = await Food.find().sort({ createdAt: -1 }).limit(12);

    res.status(200).send({
      message: "12 register food showing",
      success: true,
      data: {
        food: foodItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};
const getProductsFromDistinctCatagory = async (req, res) => {
  try {
    const distinctCatagory = await Food.distinct("category"); // lấy danh sách các trường duy  nhất bằng dítinct
    const distinctfood = await Promise.all(
      distinctCatagory.slice(0, 4).map(async (category) => {
        const food = await Food.findOne({ category });
        return food;
      })
    );

    res.status(200).send({
      message: "4 different category food",
      success: true,
      data: {
        food: distinctfood,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

const getTopRating = async (req, res) => {
  try {
    const topRateFoods = await Food.find()
      .sort({ "reviews.rating": -1 })
      .limit(4);

    res.status(200).send({
      message: "Foods Top Rating",
      success: true,
      data: {
        food: topRateFoods,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItems = await Food.findById(id);

    res.status(200).send({
      message: "Food details",
      success: true,
      data: {
        food: foodItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  createFood,
  getAllFood,
  getFoodById,
  getNewFood,
  getProductsFromDistinctCatagory,
  getTopRating,
};
