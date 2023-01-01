import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function deleteRole(req, res) {
    const { id } = req.query;
    const { application } = req.headers;
    try {
        await prisma.roles.delete({
            where: {
                id: Number(id),
                application_id: Number(application)
            }
        });

        const roles = await prisma.roles.findMany();

        return respondWithSuccess({ res: res, message: 'Role deleted successfully', payload: roles });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(deleteRole, "role-delete"))