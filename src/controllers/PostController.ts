import { Request, Response } from 'express';

import Post from '../schemas/Post';

class PostController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { title, body, authorName } = req.body;

    try {
      await Post.create({ title, body, authorName });
    } catch {
      return res.status(400).send({
        error: "Uhh, aren't you missing something?",
      });
    }

    return res.status(201).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const posts = await Post.find();

    return res.send(posts);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).send({
        error:
          "I looked for that post everywhere, and guess what? I didn't find it :(",
      });

    return res.send(post);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { title, body, authorName } = req.body;
    const update = { title, body, authorName };

    Object.keys(update).forEach(key => {
      if (update[key] === undefined) delete update[key];
    });

    if (!update)
      res
        .status(400)
        .send({ error: 'You should tell me what to update, dear friend' });

    const post = await Post.findOneAndUpdate({ _id: req.params.id }, update);

    if (!post)
      return res
        .status(404)
        .send({ error: "I can't update what doesn't exist" });

    return res.send(post);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const post = await Post.findOneAndDelete({ _id: req.params.id });

    if (!post)
      return res.status(404).send({ error: "I don't think that post exists" });

    return res.status(204).send();
  }
}

export default new PostController();
