import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async getUserById(userId: string): Promise<User | null> {
        return this.usersRepository.findOne({userId});
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(email: string, age: number): Promise<User> {
        return this.usersRepository.create({
            userId: v4(),
            email,
            age,
            favoriteFoods: []
        });
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User | null> {
        return this.usersRepository.findOneAndUpdate({userId}, userUpdates);
    }
}