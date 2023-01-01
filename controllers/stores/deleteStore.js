import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function deleteStore(req, res) {
    const { id } = req.query;

    try {
        await prisma.stores.delete({
            where: {
                id: Number(id),
            }
        });

        const stores = await prisma.stores.findMany();

        return respondWithSuccess({ res: res, message: 'Store deleted successfully', payload: { stores: stores } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(deleteStore, "stores-delete"))