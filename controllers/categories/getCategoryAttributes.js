import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getCategoryAttributes(req, res) {
    const { id } = req.query;

    try {
        const attributes = await prisma.category_has_attributes.findMany({
            where: {
                category_id: Number(id)
            },
            select: {
                attributes_pivot: true
            }
        });

        const result = attributes.map((attr) => ({ ...attr.attributes_pivot }));

        return respondWithSuccess({ res: res, message: 'Category attributes listed successfully', payload: { attributes: result } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(getCategoryAttributes, "attributes-read"));