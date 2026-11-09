const Order = require('../models/Order');
const menu = require('../data/menu.json');

exports.createOrder = async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item." });
        }

        const verifiedItems = [];
        let total = 0;

        for (const item of items) {
            if (!item || typeof item !== "object" || typeof item.name !== "string") {
                return res.status(400).json({ message: "Invalid order item." });
            }

            const product = menu.find(p => p.name === item.name);
            if (!product) {
                return res.status(400).json({ message: "Invalid product: " + item.name });
            }

            if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 50) {
                return res.status(400).json({ message: "Invalid quantity for " + item.name });
            }

            const subtotal = product.price * item.qty;
            total += subtotal;

            verifiedItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: item.qty,
                subtotal: subtotal
            });
        }

        // Save to MongoDB
        const newOrder = await Order.create({ items: verifiedItems, total });
        
        res.status(201).json({
            message: "Order successfully received!",
            order: newOrder
        });

    } catch (error) {
        next(error); // Error handling middleware ko bhej dein
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};