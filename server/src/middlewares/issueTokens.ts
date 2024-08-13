import { sign } from 'jsonwebtoken'

export async function issueTokens(userId: string): Promise<{ accessToken: string, refreshToken: string }> {
    const data = { id: userId };

    const accessToken = sign(
        {
            client_id: data.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        });

    const refreshToken = sign(
        {
            client_id: data.id
        },
        process.env.JWT_SECRET,
        {
        expiresIn: '7d'
    });

    return { accessToken, refreshToken };
}
