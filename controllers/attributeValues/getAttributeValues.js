import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getAttributeValues(req, res) {

    const { id } = req.query;

    if (!id)
        return respondWithError({ res: res, message: 'id parameter can not be empty', httpCode: 401 });

    try {
        const attribute_values = await prisma.attribute_values.findMany({
            where: {
                attribute_id: Number(id)
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute values listed successfully', payload: { attribute_values: attribute_values } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(getAttributeValues, "attribute-values-read"))
