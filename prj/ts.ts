import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();


(async () => {
    // const userSymbolWithUser = await prisma.user_symbols.findMany({
    //     where: {
    //         user_id: 1
    //     },
    //     include: {
    //         user: true
    //     }
    // });

    // console.log(userSymbolWithUser);

    const getUserSymbols = await prisma.user.findUnique({
        where: {
            id: 1
        },
        include: {
            user_symbols: true
        }
    })

    console.log(getUserSymbols)
})();
