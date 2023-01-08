import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getAttributes(req, res) {
    const { application } = req.headers;

    try {
        const attributes = await prisma.attributes.findMany({
            where: {
                application_id: Number(application)
            },
            include: {
                attribute_values: true
            }
        });

        return respondWithSuccess({ res: res, message: 'Attributes listed successfully', payload: { attributes: attributes } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(getAttributes, "attribute-read"))