import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createAttributeValue(req, res) {
    const { name, attribute_id } = req.body;

    if (!name)
        return respondWithError({ res: res, message: 'name field can not be empty', httpCode: 401 });

    if (!attribute_id)
        return respondWithError({ res: res, message: 'attribute_id field can not be empty', httpCode: 401 });

    try {
        const attribute_value = await prisma.attribute_values.create({
            data: {
                name: name,
                attribute_id: Number(attribute_id)
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute value created successfully', payload: { attribute_value: attribute_value } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createAttributeValue, "attribute-values-create"))