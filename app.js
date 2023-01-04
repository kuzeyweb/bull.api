import express from 'express';
import cors from 'cors';
import path from 'path';
import {
    auth,
    me,
    roles,
    permissions,
    categories,
    stores,
    attributes,
    attributeValues,
    products,
    productVariants,
    productInventories
} from './routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use('/api/auth', auth);

app.use('/api/me', me);

app.use('/api/roles', roles);

app.use('/api/permissions', permissions);

app.use('/api/categories', categories); //todo:fix enoent errors

app.use('/api/stores', stores); //todo:fix enoent errors

app.use('/api/attributes', attributes);

app.use('/api/attribute-values', attributeValues);

app.use('/api/products', products);

app.use('/api/product-variants', productVariants);

app.use('/api/product-inventories', productInventories);

app.use('/public', express.static(path.join(__dirname, 'uploads')));


app.listen(5000, console.log("Server is running on PORT 5000"));