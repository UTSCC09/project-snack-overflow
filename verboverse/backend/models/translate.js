// import { Translate } from '@google-cloud/translate/build/src/v2';
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();
// import 'dotenv/config';

const CREDS = {
    type: "service_account",
    project_id: "natural-aria-406504",
    private_key_id: "86038e963961984c7aed8e59dda1510f8e97a9af",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCj5IsBh6bsqbvy\nD4kTG3Y9xoMa3yGlBvj1gj5vqVc6hKe8KqR7Rh9jgTFiG6kketXgpKUsAvn01Y4y\nWeks7hC+SogeE3cp7uGWSk78+kcDGrzyNba1WY96ymvW0F/gNUFlc4BP1RASiXAi\nKkFjtCN5KlwzD19D4rvch0iQSKUWrABG917MQpOZq0u8jVEKklitIRQZTIl5wliS\nvBFGXDLOyoC0vU1FMfJ2HAl6p3XvYnCGF0TXs8WbMqH0kx6XYfhJVBz5LpayWHvv\nIOn+quOJzCxeayCVbeg3cyyz+VALJ1ntBM3unldzqZy+NgvZ7v19Fq3g0HmkXGfC\nh3ZWqar5AgMBAAECggEAP26UEmqDQ7PJ5zz2C6wkTnKHiZ30sp+JOdRIAAWlmiN/\nnAdRE9knCucUyujzxQe5wbFXsDoSrhz9ZSWBZv9ZAZ1tI17bTyKCsx1dhvIDDAOM\nP55kcboRGzA/HqwVf3x9LBvQ/JT1HIePG9oI5uLwm9O2TZjUgTy/AvJlNlq3cpdO\nm4QwwIid68Tshde0WySjpoYqDuUkudRLNc7DPddquzp5qIUgS7FPHsxf3bePMnp9\nGI8xM3EOF3Zd0/OAx3Nj2uJ5mMCLZncO7jNzvtVPDeisQEolB0WtSmQ4HfPzsFxc\npPxu7X2cYvoo1GsDPfCtLLbJ9KHzLwDRsRRpRgrZdQKBgQDdEPyPi8Jijp4O+13R\n0NEo6cf7pj5R5OO2HgzzwdEsSAYLWYUQJNrpy1iRp0+WX5CZrDfQWl2hEXlli1al\n/i5pRQoRSonGE/FktpWXdx+XGU9hDrV9Jk5hu3aYodAeDKRo9Gkl5RKHBLK41qs0\npkZym1vFnWxwjFUlhrwEyO7fkwKBgQC9yqgT0v3mqA3zcanMNCnRsq1FvAskhuGN\nDFtLnWeax+nSknLmK38QLMWkMSFDSW/Nt3v7/LFqTaCYzlniP62Ln3NE7OdnmDYW\nP9Zcm/DaGPyqmfoxzo1Wdnsik890gGdB0d8llJt4GL9cydIy9vEbg/rY9/goNcBM\n5wuzK+PqwwKBgQC11+Q42/jxA2mm30RkdAWpRuzW5v/6c3KQexWiaTr71t8J9QBM\nsFRW3osjfOItyrxyfESJIdxEws/+JGkJMBXTSBQo9wxvoDX/52UT68xTiWFPcD8A\nDEOLhx3eHbTJExMmtm3L2yurXsT44LSCIYhve7Y4zu7FgdoEfVkqAnLj+wKBgAaE\nzm8X4SaqAQiqj8V2yTTtqSvrAIr5owegNAaN2oAje7GC3DVxqwSYNRWlplnUTOXI\n9pY6ILHhBrIY7FdsDn7sNB5a8LvLK5hqCufVZ1lmYE9PyJsrWAlvOl1+rDJ5MpK9\nLafxycE/QFtkhza+6psiVlxbcAeZiQhbKzi1OjfXAoGAbgwnhZc16pILJvfmX9/B\nx/SAr5hfwnt/y9iLWED1bJZXXAxCg1yucZ6KfBkYt/WFH7vx+0Uj9Torh7ERbGzW\nx8YxNLLUm2gk1guqFp8WRmRmzY+POoXjvDWW/EYkt2t6ELx/78ik0YwSeJ2Z7UyG\nmPb+pmoR1psW4/3LbsnOeJc=\n-----END PRIVATE KEY-----\n",
    client_email: "verboverse-translation@natural-aria-406504.iam.gserviceaccount.com",
    client_id: "114069175093752846670",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/verboverse-translation%40natural-aria-406504.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }

const translate = new Translate({
    credentials: CREDS,
    projectId: CREDS.project_id, 
});

module.exports = translate;



