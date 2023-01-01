import withProtect from "../../middlewares/withProtect"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getProducts(req, res) {

    const { application } = req.headers;

    try {
        const products = await prisma.products.findMany({
            where: {
                application_id: Number(application)
            },
            include: {
                inventory: {
                    select: {
                        quantity: true,
                        is_in_stock: true
                    }
                },
                product_variants: {
                    include: {
                        inventory: {
                            select: {
                                quantity: true,
                                is_in_stock: true
                            }
                        },
                        attribute: {
                            select: {
                                name: true
                            }
                        },
                        attribute_value: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        const rearrangedProducts = products.map((product) => {
            const productVariants = product.product_variants.slice();
            const subVariants = productVariants.filter((variant) => variant.parent_id);

            const getSubVariants = (variantId) => {
                return subVariants.filter((subVariant) => subVariant.parent_id === variantId)
                    .map((subVariant) => ({
                        ...subVariant,
                        attribute: subVariant.attribute.name,
                        attribute_value: subVariant.attribute_value.name,
                        subVariants: getSubVariants(subVariant.id),
                    }));
            };

            return {
                ...product,
                product_variants: productVariants.map((variant) => {
                    if (!variant.parent_id) {
                        return {
                            ...variant,
                            subVariants: getSubVariants(variant.id),
                            attribute: variant.attribute.name,
                            attribute_value: variant.attribute_value.name,
                        };
                    }
                    return variant;
                }).filter((variant) => !variant.parent_id),
            };
        });


        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'Products listed successfully', payload: { products: rearrangedProducts } });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(getProducts)