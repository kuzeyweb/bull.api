import withProtect from "../../middlewares/withProtect"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getProductVariant(req, res) {
    const { id } = req.params;

    if (!id)
        return respondWithError({ res: res, message: 'Id field can not be empty', httpCode: 401 });

    try {
        const product_variant = await prisma.product_variants.findFirst({
            where: {
                id: Number(id)
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

        return respondWithSuccess({ res: res, message: 'Product variant listed successfully', payload: product_variant });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(getProductVariant)