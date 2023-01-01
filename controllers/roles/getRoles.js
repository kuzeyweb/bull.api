import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getRoles(req, res) {

    const { include } = req.query;
    const { application } = req.headers;

    const includeQuery = include?.split(',');

    try {
        const roles = await prisma.roles.findMany(includeQuery?.includes("permissions") ? {
            where: {
                application_id: Number(application)
            },
            include: {
                permissions: {
                    select: {
                        permissions: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
        } : {
            where: {
                application_id: Number(application)
            }
        });

        includeQuery?.includes("permissions") &&
            roles.forEach((role) => role.permissions = role.permissions.map((perm) => perm.permissions.name));
        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'Roles listed successfully', payload: { roles: roles } });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(getRoles, "role-read"))