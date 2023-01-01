import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function deleteAttribute(req, res) {
    const { id } = req.params;

    try {
        await prisma.attributes.delete({
            where: {
                id: Number(id)
            }
        });

        return respondWithSuccess({ res: res, message: 'Attribute deleted successfully' });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(deleteAttribute, "attributes-delete"))