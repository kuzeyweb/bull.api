import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import slugify from "slugify";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from 'fs';

async function createCategory(req, res) {

    if (req.files) {
        req.files.icon && (req.body.icon = `${process.env.CDN_URL}${req.files?.icon[0]?.filename}`)
        req.files.banner && (req.body.banner = `${process.env.CDN_URL}${req.files?.banner[0]?.filename}`)
    }

    const { name, description, parent_id, slug, banner, icon } = req.body;
    const { application } = req.headers;

    if (!name)
        return respondWithError({ res: res, message: 'Name field can not be empty', httpCode: 401 });

    let slugifiedName;
    if (!slug)
        slugifiedName = slugify(name);
    else slugifiedName = slugify(slug);

    try {
        const category = await prisma.categories.create({
            data: {
                application_id: Number(application),
                name: name,
                slug: slugifiedName,
                description: description ?? null,
                parent_id: parent_id ? Number(parent_id) : null,
                banner: banner ?? null,
                icon: icon ?? null
            }
        });
        return respondWithSuccess({ res: res, message: 'Category created successfully', payload: { category: category } });
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
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createCategory, "category-create"))
