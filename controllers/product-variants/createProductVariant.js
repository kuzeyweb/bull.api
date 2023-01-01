import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createProductVariant(req, res) {

    if (req.files) {
        let pics = [];
        for (var file of req.files) {
            pics.push(`${process.env.CDN_URL}${file.filename}`);
        }
        req.body.images = pics;
    }

    const { list_price, sale_price, product_id, parent_id, attribute_id, attribute_value_id, barcode, dimensional_weight, images, quantity, is_in_stock } = req.body;


    let productVariantData = {
        product_id: product_id,
        barcode: barcode,
        attribute_id: attribute_id,
        attribute_value_id: attribute_value_id,
        dimensional_weight: dimensional_weight ?? null,
        parent_id: parent_id ?? null,
        list_price: list_price ?? null,
        sale_price: sale_price ?? null,
        dimensional_weight: dimensional_weight ?? null,
        images: images ?? undefined
    }

    if (quantity && is_in_stock) {
        productVariantData = {
            ...productVariantData, inventory: {
                create: {
                    quantity: Number(quantity),
                    is_in_stock: Boolean(is_in_stock)
                }
            }
        }
    }

    try {
        const productVariant = await prisma.product_variants.create({
            data: {
                ...productVariantData
            },
            include: {
                inventory: {
                    select: {
                        quantity: true,
                        is_in_stock: true
                    }
                }
            }
        });

        return respondWithSuccess({ res: res, message: 'Product variant created successfully', payload: productVariant });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createProductVariant, "product-create"))