import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createProductInventory(req, res) {
    const { product_id, is_in_stock, quantity, product_variant_id } = req.body;

    try {
        const productInventory = await prisma.product_inventories.create({
            data: {
                product_id: product_id,
                quantity: quantity,
                is_in_stock: is_in_stock,
                product_variant_id: product_variant_id,
            }
        });

        return respondWithSuccess({ res: res, message: 'Product inventory created successfully', payload: { product_inventory: productInventory } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createProductInventory, "product-create"))