import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from 'fs';

async function deleteProduct(req, res) {
    const { id } = req.params;

    if (!id)
        return respondWithError({ res: res, message: 'Id field can not be empty', httpCode: 401 });

    try {

        const variants = await prisma.product_variants.findMany({
            where: {
                product_id: Number(id)
            }
        });

        let variantImages = [];
        variants.map((variant) => (variant.images?.length > 0 && (variantImages = ([...variantImages, ...variant.images]))));

        const product = await prisma.products.delete({
            where: {
                id: Number(id)
            }
        });

        product.images?.forEach(imageUrl => {
            fs.unlink(`./public/cdn/${imageUrl.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        });

        variantImages?.forEach(imageUrl => {
            fs.unlink(`./public/cdn/${imageUrl.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        });

        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: `Product and it's variants deleted successfully`, payload: product });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(deleteProduct, "product-delete"))