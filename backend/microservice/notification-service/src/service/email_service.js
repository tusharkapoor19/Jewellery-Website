const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL,

        pass: process.env.EMAIL_PASS

    }

});


const sendEmail = async ({
    email,
    subject,
    title,
    message
}) => {

    if (!email) {

        console.log(
            "Email skipped: recipient email not available"
        );

        return null;

    }


    const mail = {

        from: `"HIRANYA Jewellery" <${process.env.EMAIL}>`,

        to: email,

        subject: subject || title,

        html: `

            <div
                style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #e5dfd2;
                    border-radius: 12px;
                "
            >

                <h2
                    style="
                        color: #c9a14a;
                        margin-bottom: 20px;
                    "
                >
                    HIRANYA
                </h2>


                <h3>
                    ${title}
                </h3>


                <p
                    style="
                        color: #444;
                        font-size: 15px;
                        line-height: 1.6;
                    "
                >
                    ${message}
                </p>


                <p
                    style="
                        color: #888;
                        margin-top: 30px;
                    "
                >
                    Thank you for choosing HIRANYA Jewellery.
                </p>

            </div>

        `

    };


    const result =
        await transporter.sendMail(mail);


    console.log(
        "EMAIL SENT:",
        result.messageId
    );


    return result;

};


module.exports = {
    sendEmail
};