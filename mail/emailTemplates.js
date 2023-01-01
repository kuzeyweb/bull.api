export const emailValidationTemplate = (name, code) => {
    return {
        from: "mailer@kuzeysoftware.com",
        subject: "Email Adresi Doğrulama",
        text: "",
        html:
            `<div style="background-color: #000;font-family: Arial, sans-serif;">
        <img src="https://i.ibb.co/9b48rY1/kuzey-white.png" alt="">
        <h2 style="margin-bottom: 40px;text-align: center; color: #fff;">Merhaba ${name},
            e-posta adresini doğrulayabilmemiz için lütfen aşağıdaki butona tıkla!</h2>
        <div style="padding-bottom: 20px;text-align: center;">
            <a href="${process.env.PUBLIC_URL}/email-confirmation?token=${code}" style="background-color: #fff;
                border: none;
                color: 000;
                border-radius : 24px;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;">
                Buraya tıklayarak e-posta adresinizi doğrulayabilirsiniz.
            </a>
        </div>
    </div>`
    }
}

export const twoFactorAuthTemplate = (name, code) => {
    return {
        from: "mailer@kuzeysoftware.com",
        subject: "2 Faktörlü Doğrulama Kodunuz",
        text: "",
        html:
            `<div style="background-color: #000;">
         <img src="https://i.ibb.co/9b48rY1/kuzey-white.png" alt="">
         <h2 style="margin-bottom: 40px;font-family: Arial, sans-serif;text-align: center; color: #fff;">Merhaba ${name}, <br> giriş yapabilmeniz için gerekli doğrulama kodu aşağıda verilmiştir.</h2>
         <div style="padding-bottom: 20px;text-align: center;display: flex; justify-content: center;">
         <b style="font-family: Arial;border: 1px dashed #fff; padding: 10px 30px;color: #fff;font-size: 30px;">${code}</b> 
         </div>
         </div>`}
}