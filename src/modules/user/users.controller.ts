import { Request, Response } from "express";
import UserService from "./users.services";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    signUp = async (req: Request, res: Response) => {
        req.body.email = req.body.email.toLowerCase();
        const result = await this.userService.signUp(req.body);
        res.status(201).json(result);
    }

    signIn = async (req: Request, res: Response) => {
        const result = await this.userService.signIn(req.body)
        res.status(201).json(result);
    }
}