import withProtect from "../../middlewares/withProtect"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getStore(req, res) {

    const { id } = req.query;

    try {
        const store = await prisma.stores.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                user_has_stores: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                email: true,
                                status: true,
                                profile_picture: true
                            }
                        }
                    }
                }
            }
        });

        const users = store.user_has_stores.map((user) => ({ ...user.user, auth: user.auth }));
        delete store.user_has_stores;
        store.users = users;

        return respondWithSuccess({ res: res, message: 'Store listed successfully', payload: { store: store } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(getStore);