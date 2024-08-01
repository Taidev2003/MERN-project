const Order = require("../model/Order");

const stripe = require("stripe")(
  "sk_test_51PhpQGFLyQ0kKP5rCVn8EJRtWpeYtJHapbKS3dbHxyt3A8MlJWb81TuXmcvW6Yh9g3QKAM8zs4UqW55IN8vAJKmy00LTRjOC7U"
);
const createOrder = async (req, res) => {
  try {
    // Sử dụng đúng tên trường 'totalAmout' từ req.body
    const { user, items, totalAmout } = req.body;

    console.log("Received data:", req.body);

    // Kiểm tra giá trị totalAmout
    if (
      typeof totalAmout !== "number" ||
      isNaN(totalAmout) ||
      totalAmout <= 0
    ) {
      console.log("Invalid totalAmount:", totalAmout);
      return res.status(400).json({
        success: false,
        message: "Invalid total amount",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "paid for food",
            },
            unit_amount: Math.round(totalAmout * 100), // Đảm bảo là số nguyên
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    console.log("Stripe session created:", session.id);

    if (session.id) {
      const newOrder = new Order({
        user,
        items,
        totalAmount: totalAmout, // Sử dụng đúng tên trường
      });
      const saveOrder = await newOrder.save();
      await Order.findByIdAndUpdate(saveOrder._id, {
        payment: true,
      });

      res.status(200).json({
        success: true,
        message: "Order created successfully",
        data: saveOrder,
        sessionId: session.id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Not successful",
      });
    }
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    order.status = "Delivered";
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
      message: "Delivered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.food").populate("user");

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getSingleOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const userOrders = await Order.find({
      user: userId,
    })
      .populate("items.food")
      .populate("user");

    res.status(200).json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  markOrderAsDelivered,
};
