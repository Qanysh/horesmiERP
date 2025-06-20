const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const itemRoutes = require("./src/routes/itemRoutes");
const itemLedgerEntryRoutes = require("./src/routes/itemLedgerEntryRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const purchaseOrderRoutes = require("./src/routes/purchaseOrderRoutes");
const salesOrderRoutes = require("./src/routes/salesOrderRoutes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const reportRoutes = require("./src/routes/reportRoutes");
const warehouseRoutes = require("./src/routes/warehouseRoutes");
const generalLedgerEntriesRoutes = require("./src/routes/generalLedgerEntriesRoutes");
const purchaseHeaderRoutes = require("./src/routes/purchaseHeaderRoutes");
const purchaseLineRoutes = require("./src/routes/purchaseLineRoutes");
const salesLinesRoutes = require("./src/routes/salesLineRoutes");
const productRoutes = require("./src/routes/productRoutes");
const productionToolRoutes = require("./src/routes/productionToolRoutes");

const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:8080", // Разрешаем запросы с этого домена
  credentials: true, // Разрешаем отправку куки
}));

app.use(
  session({
    secret: "horesmi_secret_key", // Секретный ключ для подписи сессий
    resave: false, // Не сохранять сессию заново, если она не изменилась
    saveUninitialized: true, // Сохранять пустые сессии
    cookie: {
      secure: false, // Установите true, если используете HTTPS
      maxAge: 60000000000000,
      sameSite: "lax"
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/itemLedgerEntries", itemLedgerEntryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/purchaseOrders", purchaseOrderRoutes);
app.use("/api/salesOrders", salesOrderRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/generalLedgerEntries", generalLedgerEntriesRoutes);
app.use("/api/purchaseHeaders", purchaseHeaderRoutes);
app.use("/api/purchaseLines", purchaseLineRoutes);
app.use("/api/salesLines", salesLinesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/productionTools", productionToolRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening at :${port}`);
});
