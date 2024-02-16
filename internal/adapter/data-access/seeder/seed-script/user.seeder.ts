import { User } from "../../../../core/domain/model/user.model";
import { UserService } from "../../../../core/service/user.service";
import { UserRepository } from "../../repository/user.repository";
import { usersData } from "../seed-data/user.seed.data";

export async function seedUsers(userRepository: UserRepository) {

  const users = usersData.map(user => new User(user));
  for (const userData of usersData) {
    try {
      await userRepository.createUser(userData);
    } catch (error) {
        return;
    }
  }
  console.log(`Users seeded successfully`);
}