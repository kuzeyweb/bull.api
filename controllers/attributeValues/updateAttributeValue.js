import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function updateAttributeValue(req, res) {

    const { id } = req.query;
    const { name } = req.body;

    if (!id)
        return respondWithError({ res: res, message: 'id parameter can not be empty', httpCode: 401 });

    if (!name)
        return respondWithError({ res: res, message: 'name field can not be empty', httpCode: 401 });

    try {
        const attribute_value = await prisma.attribute_values.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute value updated successfully', payload: { attribute_value: attribute_value } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateAttributeValue, "attribute-values-update"))
