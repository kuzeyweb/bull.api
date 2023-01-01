import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function updateProductVariant(req, res) {

    if (req.files) {
        let pics = [];
        for (var file of req.files) {
            pics.push(`${process.env.CDN_URL}${file.filename}`);
        }
        req.body.images = pics;
    }

    const { barcode, list_price, sale_price, dimensional_weight, vat_rate, images } = req.body;
    const { id } = req.query;

    //processing the data
    let data = {};
    if (barcode) data.barcode = barcode;
    if (list_price) data.list_price = list_price;
    if (sale_price) data.sale_price = sale_price;
    if (dimensional_weight) data.dimensional_weight = dimensional_weight;
    if (vat_rate) data.vat_rate = vat_rate;
    if (images) data.images = images;

    if (!id)
        return respondWithError({ res: res, message: 'Id field can not be empty', httpCode: 401 });

    try {
        const product_variant = await prisma.product_variants.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        return respondWithSuccess({ res: res, message: 'Product variant updated successfully', payload: product_variant });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateProductVariant, "product-update"))