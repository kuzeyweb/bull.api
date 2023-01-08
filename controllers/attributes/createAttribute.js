import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createAttribute(req, res) {
    const { name, is_variantable, required, parent_id } = req.body;
    const { application } = req.headers;

    if (!name)
        return respondWithError({ res: res, message: 'Name field can not be empty', httpCode: 401 });

    try {
        const attribute = await prisma.attributes.create({
            data: {
                application_id: Number(application),
                name: name,
                is_variantable: Boolean(is_variantable),
                required: Boolean(required),
                parent_id: parent_id ?? null
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute created successfully', payload: { attribute: attribute } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createAttribute, "attribute-create"))