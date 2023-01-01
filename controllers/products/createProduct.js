import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import slugify from "slugify";
import fs from "fs";

async function createProduct(req, res) {

    if (req.files) {
        let pics = [];
        for (var file of req.files) {
            pics.push(`${process.env.CDN_URL}${file.filename}`);
        }
        req.body.images = pics;
    }

    const { name, slug, barcode, brand_name, list_price, sale_price, category_id, store_id, dimensional_weight, vat_rate, images, quantity, is_in_stock } = req.body;
    const { application } = req.headers;

    let slugifiedName;
    if (!slug)
        slugifiedName = slugify(name);
    else slugifiedName = slugify(slug);

    let productData = {
        application_id: Number(application),
        name: name,
        slug: slugifiedName,
        barcode: barcode,
        category_id: Number(category_id),
        store_id: Number(store_id),
        brand_name: brand_name,
        list_price: Number(list_price),
        sale_price: Number(sale_price),
        dimensional_weight: Number(dimensional_weight),
        vat_rate: Number(vat_rate),
        created_by: Number(req.user.id),
        images: images ?? null,
    }

    if (quantity && is_in_stock) {
        productData = {
            ...productData, inventory: {
                create: {
                    quantity: Number(quantity),
                    is_in_stock: Boolean(is_in_stock)
                }
            }
        }
    }

    if (!name)
        return respondWithError({ res: res, message: 'Name field can not be empty', httpCode: 401 });

    try {
        const product = await prisma.products.create({
            data: {
                ...productData,
            },
            include: {
                inventory: {
                    select: {
                        quantity: true,
                        is_in_stock: true
                    }
                }
            }
        });

        return respondWithSuccess({ res: res, message: 'Product created successfully', payload: product });
    } catch (err) {
        req.body.images.forEach(imageUrl => {
            fs.unlink(`./public/cdn/${imageUrl.split('/').pop()}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        });
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createProduct, "product-create"))