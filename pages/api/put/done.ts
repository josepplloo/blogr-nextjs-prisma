import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { id, done } = req.body;

    const post = await prisma.post.update({
        where: { id },
        data: { done },
    });
    res.json(post);
}