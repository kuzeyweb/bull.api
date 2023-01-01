import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createProductInventory(req, res) {
    const { is_in_stock, quantity, product_id, product_variant_id } = req.body;

    //processing the data
    let data = {};
    if (is_in_stock) data.is_in_stock = is_in_stock;
    if (quantity) data.quantity = quantity;
    if (product_id) data.product_id = product_id;
    if (product_variant_id) data.product_variant_id = product_variant_id

    try {
        const productInventory = await prisma.product_inventories.update({
            where: {
                product_id: product_id,
                product_variant_id: product_variant_id
            },
            data: data
        });

        return respondWithSuccess({ res: res, message: 'Product inventory updated successfully', payload: { product_inventory: productInventory } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createProductInventory, "product-update"))