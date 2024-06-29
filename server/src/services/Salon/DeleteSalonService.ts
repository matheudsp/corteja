import prismaClient from "../../prisma";

interface Request {
    salonId: string;
}

class DeleteSalonService {
    async execute({ salonId }: Request) {

        const collaborator = await prismaClient.salao.delete({
            where: { 
                id: salonId 
            },
            select: {
                id: true
            }
        });

        return collaborator;
    }
}

export { DeleteSalonService };