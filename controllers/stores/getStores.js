import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getStores(req, res) {

    const { application } = req.headers;

    try {
        const stores = await prisma.stores.findMany({
            where: {
                application_id: Number(application)
            }
        })

        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'Stores listed successfully', payload: { stores: stores } });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(getStores);