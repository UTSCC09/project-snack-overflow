import translate from '../models/translate.js';

export async function translateText (req, res, next) {
    try {
        let text = req.body.text; 
        let target = req.body.target;
        console.log(text);
        console.log(target);
        await translate.translate(text, target).then((translations)=>{
            console.log(translations[0]); 
            return res.json({translation: translations[0]});
        })
    } catch (error) {
        console.log(error);
    }

}