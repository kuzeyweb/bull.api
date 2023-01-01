import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function deleteAttributeValue(req, res) {
    const { id } = req.query;

    if (!id)
        return respondWithError({ res: res, message: 'id parameter can not be empty', httpCode: 401 });

    try {
        await prisma.attribute_values.delete({
            where: {
                id: Number(id)
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute value deleted successfully' });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(deleteAttributeValue, "attribute-values-delete"))