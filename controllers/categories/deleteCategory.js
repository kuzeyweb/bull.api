import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from "fs";

let categoryTree = [];

async function deleteCategory(req, res) {

    const { id } = req.params;

    if (!id)
        return respondWithError({ res: res, message: 'Id parameter can not be empty', httpCode: 401 });

    try {
        await getCategoryTree(id, categoryTree);

        let categoryImages = [];
        categoryTree.map((sub) => (categoryImages = ([...categoryImages, sub.icon && sub.icon, sub.banner && sub.banner])));

        await deleteCategoryTree(id);

        categoryImages?.forEach(imageUrl => {
            fs.unlink(`./public/cdn/${imageUrl?.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        });


        return respondWithSuccess({ res: res, message: `Category and it's subcategories deleted successfully` });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

async function getCategoryTree(id) {
    const subcategories = await prisma.categories.findMany({ where: { parent_id: Number(id) } });
    for (const subcategory of subcategories) {
        await getCategoryTree(subcategory.id);
    }
    await categoryTree.push(...subcategories)
}

async function deleteCategoryTree(id) {
    const subcategories = await prisma.categories.findMany({ where: { parent_id: Number(id) } });
    for (const subcategory of subcategories) {
        await deleteCategoryTree(subcategory.id);
    }
    await prisma.categories.delete({ where: { id: Number(id) } });
}

export default withProtect(withPermission(deleteCategory, "category-delete"))
