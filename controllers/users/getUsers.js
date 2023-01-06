import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import { paginate } from "../../helpers/paginate";

async function getUsers(req, res) {

    const { application } = req.headers;
    const { page, limit } = req.query;

    try {
        const count = await prisma.users.count();
        const pagination = paginate({ Page: page, Limit: limit, Count: count });

        const users = await prisma.users.findMany({
            ...pagination.query,
            where: {
                application_id: Number(application),
            },
            include: {
                application: true,
                roles: {
                    select: {
                        role: {
                            select: {
                                name: true,
                                permissions: {
                                    select: {
                                        permissions: {
                                            select: { name: true }
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            },
        });

        users.forEach((user) => user.roles = user.roles?.map((roles) => roles.role.name));

        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'Users listed successfully', payload: { users: users }, meta: pagination.meta });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(getUsers, "users-read"));