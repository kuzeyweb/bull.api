import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createProductInventory(req, res) {
    const { is_in_stock, quantity } = req.body;
    const { id } = req.query;

    //processing the data
    let data = {};
    if (is_in_stock) data.is_in_stock = is_in_stock
    if (quantity) data.quantity = quantity

    try {
        const productInventory = await prisma.product_inventories.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        return respondWithSuccess({ res: res, message: 'Product inventory updated successfully', payload: { product_inventory: productInventory } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createProductInventory, "product-update"))