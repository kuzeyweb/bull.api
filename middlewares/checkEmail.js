import { prisma } from "../prisma/client";

export const checkEmail = async (req, res, next) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if(user){
            req.body.id = user.id;
            req.body.first_name = user.first_name;
            req.body.emailValidation = true;
            next();
        }
        else{
            req.body.emailValidation = false;
            next();
        } 
    } catch (err) {
        console.log(err);
        next();
    }
}
