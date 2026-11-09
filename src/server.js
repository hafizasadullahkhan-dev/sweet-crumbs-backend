require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🍃 Connected to MongoDB successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});