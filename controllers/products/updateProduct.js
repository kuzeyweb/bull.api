import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import slugify from "slugify";
import fs from 'fs';

async function updateProduct(req, res) {

    if (req.files) {
        let pics = [];
        for (var file of req.files) {
            pics.push(`${process.env.CDN_URL}${file.filename}`);
        }
        req.body.images = pics;
    }

    const { name, slug, barcode, brand_name, list_price, sale_price, store_id, dimensional_weight, vat_rate, images } = req.body;
    const { id } = req.query;

    //processing the data
    let data = {};
    if (name && slug) { data.name = name; data.slug = slugify(slug) }
    else if (name && !slug) { data.name = name; data.slug = slugify(name) }
    else if (!name && slug) { data.slug = slugify(slug) };
    if (barcode) data.barcode = banner;
    if (brand_name) data.brand_name = brand_name;
    if (list_price) data.list_price = Number(list_price);
    if (sale_price) data.sale_price = Number(sale_price);
    if (store_id) data.store_id = Number(store_id);
    if (dimensional_weight) data.dimensional_weight = Number(dimensional_weight);
    if (vat_rate) data.vat_rate = Number(vat_rate);
    if (images) data.images = images;

    if (!id)
        return respondWithError({ res: res, message: 'Id field can not be empty', httpCode: 401 });

    try {

        const currentProduct = await prisma.products.findFirst({
            where: {
                id: Number(id)
            },
        });
        data.images = [...currentProduct.images, ...data.images];

        const product = await prisma.products.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        return respondWithSuccess({ res: res, message: 'Product updated successfully', payload: { product: product } });
    } catch (err) {
        req.files.forEach(imageUrl => {
            fs.unlink(`./public/cdn/${imageUrl.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        });
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateProduct, "product-update"))