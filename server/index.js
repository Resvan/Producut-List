import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.js'
import { verifyToken } from './middleware/auth.js';
import { addProduct, getAllProducts } from './controller/productController.js';


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.post("/product/add", verifyToken, upload.single("picture"), addProduct);
app.get('/products', verifyToken, getAllProducts)


app.use('/auth', authRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6000;
mongoose
    .connect('mongodb://localhost:27017/Products', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));