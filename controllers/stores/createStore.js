import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import slugify from 'slugify';
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from 'fs';

async function createStore(req, res) {

    if (req.files) {
        req.files.icon && (req.body.icon = `${process.env.CDN_URL}${req.files?.icon[0]?.filename}`)
        req.files.banner && (req.body.banner = `${process.env.CDN_URL}${req.files?.banner[0]?.filename}`)
    }

    const { name, slug, user_id, banner, icon } = req.body;
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
                status: "active",
                icon: icon ?? null,
                banner: banner ?? null
            }
        });

        const usersPivot = await prisma.user_has_stores.create({
            data: {
                user_id: Number(user_id),
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
        if (req.files.icon)
            fs.unlink(`./uploads/${req.files.icon[0]?.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        if (req.files.banner)
            fs.unlink(`./uploads/${req.files.banner[0]?.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createStore, "stores-create"))