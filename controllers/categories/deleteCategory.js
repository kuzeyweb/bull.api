import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from "fs";

async function deleteCategory(req, res) {

    const { id } = req.params;

    if (!id)
        return respondWithError({ res: res, message: 'Id parameter can not be empty', httpCode: 401 });

    try {

        const categories = await prisma.categories.findMany({
            where: {
                OR: [,
                    {
                        parent_id: Number(id),
                    },
                    {
                        id: Number(id)
                    }]

            }
        });

        let categoryImages = [];
        categories.map((sub) => (categoryImages = ([...categoryImages, sub.icon && sub.icon, sub.banner && sub.banner])));

        await prisma.categories.deleteMany({
            where: {
                OR: [,
                    {
                        parent_id: Number(id),
                    },
                    {
                        id: Number(id)
                    }]

            }
        });

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

export default withProtect(withPermission(deleteCategory, "categories-delete"))
