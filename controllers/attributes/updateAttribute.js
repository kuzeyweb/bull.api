import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function updateAttribute(req, res) {

    const { id } = req.query;
    const { name, parent_id } = req.body;

    if (!id)
        return respondWithError({ res: res, message: 'Id parameter can not be empty', httpCode: 401 });

    if (!name)
        return respondWithError({ res: res, message: 'Name field can not be empty', httpCode: 401 });

    try {
        const attribute = await prisma.attributes.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                parent_id: parent_id
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute updated successfully', payload: { attribute: attribute } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateAttribute, "attribute-update"))
