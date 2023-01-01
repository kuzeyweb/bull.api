import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function deleteProductVariant(req, res) {
    const { id } = req.params;

    if (!id)
        return respondWithError({ res: res, message: 'Id field can not be empty', httpCode: 401 });

    try {
        const product_variant = await prisma.product_variants.delete({
            where: {
                id: Number(id)
            },
        });

        if (!product_variant)
            return respondWithError({ res: res, message: 'Product variant not found', httpCode: 401 });

        product_variant.images?.forEach(imageUrl => {
            fs.unlink(`./public/cdn/${imageUrl.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        });

        return respondWithSuccess({ res: res, message: 'Product variant deleted successfully', payload: product_variant });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(deleteProductVariant, "product-delete"))