import sgMail from "../models/sendgrid.mjs";
import User from "../models/userModel.mjs";

export async function checkIfUserExists(email) {

    const userExist = await User.findOne({email: email});
    if (userExist) {
        return true;
    } else {
        return false;
    }
}

export async function sendEmail(req, res) {

    const to = req.body.to;
    const from = "verboverse101@gmail.com";

    const userExist = await checkIfUserExists(to);
    if (!userExist) {
        return res.status(400).json({
            success: false,
            message: "User is not registered with this app"
        })
    }

    const subject = "Invitation to join Verboverse";
    const code = req.body.code;

    const msg = `
        <h1>Invitation to join Verboverse</h1>
        <p>You have been invited to join Verboverse!</p>
        <p>Click <a href="https://verboverse.tech/join/${code}">here</a> to join.</p>
    `;

    const email = {
        to,
        from,
        subject,
        html: msg
    };

    sgMail.send(email, function(err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        } else {
            return res.status(200).json({
                success: true,
            })
        }
    });

}