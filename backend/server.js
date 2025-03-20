const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/coffeeShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});


const Order = require("./models/Order");

app.post("/order", async (req, res) => {
    const { name, coffee, quantity } = req.body;

    if (!name || !coffee || !quantity) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const newOrder = new Order({ name, coffee, quantity });
        await newOrder.save(); // Save order to MongoDB

        console.log("New Order:", newOrder);
        res.json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});


app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders from MongoDB
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders" });
    }
});



app.delete("/orders/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);
        res.json({ message: "Order deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting order" });
    }
});



app.put("/orders/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndUpdate(orderId, { status: "Completed" });
        res.json({ message: "Order marked as completed!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating order" });
    }
});




