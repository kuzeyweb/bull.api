import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import slugify from 'slugify';
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createStore(req, res) {
    const { name, slug, user_id } = req.body;
    const { application } = req.headers;

    let slugifiedName;

    if (!slug)
        slugifiedName = slugify(name);
    else slugifiedName = slugify(slug);

    try {
        const store = await prisma.stores.create({
            data: {
                application_id: Number(application),
                name: name,
                slug: slugifiedName,
                status: "active"
            }
        });

        const usersPivot = await prisma.user_has_stores.create({
            data: {
                user_id: user_id,
                store_id: store.id
            },

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
        });

        usersPivot.user.auth = usersPivot.auth
        store.users = [usersPivot.user];

        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'Store created successfully', payload: { store: store } });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createStore, "stores-create"))