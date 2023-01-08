import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import slugify from "slugify";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from "fs";

async function updateCategory(req, res) {

    if (req.files) {
        req.files.icon && (req.body.icon = `${process.env.CDN_URL}${req.files?.icon[0]?.filename}`)
        req.files.banner && (req.body.banner = `${process.env.CDN_URL}${req.files?.banner[0]?.filename}`)
    }

    const { id } = req.params;
    const { name, description, parent_id, banner, icon } = req.body;

    //processing the data
    let data = {};
    if (name) { data.name = name; data.slug = slugify(name) };
    if (description) data.description = description;
    if (parent_id) data.parent_id = parent_id;
    if (banner) data.banner = banner;
    if (icon) data.icon = icon;

    const currentCategory = await prisma.categories.findFirst({
        where: {
            id: Number(id)
        },
    });

    if (currentCategory?.banner || currentCategory?.icon) {
        if (currentCategory.banner && banner)
            fs.unlink(`./uploads/${currentCategory.banner.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        if (currentCategory?.icon && icon)
            fs.unlink(`./uploads/${currentCategory.icon.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
    }

    if (!id)
        return respondWithError({ res: res, message: 'Id parameter can not be empty', httpCode: 401 });

    try {

        const category = await prisma.categories.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        return respondWithSuccess({ res: res, message: 'Category updated successfully', payload: { category: category } });
    } catch (err) {
        if (req.files?.icon)
            fs.unlink(`./uploads/${req.files.icon[0]?.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        if (req.files?.banner)
            fs.unlink(`./uploads/${req.files.banner[0]?.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateCategory, "category-update"))
