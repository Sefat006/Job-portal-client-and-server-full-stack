/*
    1. after successful login: generate a jst token
    npm i jsonwebtoken, cookie-parser
    jwt.sign(payload, secret, {expiresIn: '1d})

    2. send token (generated in the server side) to the client side
    localstorage --> easier

    httpOnly cookies ---> better


    3. for sensitive or secure or private or protected apis : send token to the server side
    * on the server site : 
    app.use(cors({
        origin: ['http://localhost:5173'],
        credentials : true,
    }));
    * on the client site: goto singIn.jsx

    4. validate the token in the server side :
    if valid : provide data
    if not valid : logout
*/