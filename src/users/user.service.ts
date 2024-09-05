import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { compare, hash} from "bcryptjs"
import { sign } from "jsonwebtoken";
import { UsersEntity } from "./user.entity";
import { RegisterDto } from "./dto/createuser.dto";


@Injectable()

export class Userservice {
 constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>
 ){}
 async login (email: string, password: string){
    const user = await this.userRepository.findOne({ where:{email} });
    if (!user) {
      throw new HttpException("Aucun admin trouvé", HttpStatus.NOT_FOUND)
    }
    const match = await compare(password, user.password);
    if (!match) {
      throw new Error("Invalid password");
    }
    return this.buildresponseuser (user);
 }

 async signup(data:RegisterDto){
    const isfound = await this.userRepository.findOne({ where:{email:data.email} });
    if (isfound) {
      throw new HttpException("Email déjà utilisé", HttpStatus.CONFLICT)
    }
    const hashedPassword = await hash(data.password, 10);
    const user = this.userRepository.create({
      email:data.email,
      prenom: data.firstName,
      nom: data.lastName,
      score: 0,
      username: data.username,
      role: "USER",
      password: hashedPassword});
    const createuser =  await this.userRepository.save(user);
    return this.buildresponseuser(createuser);
 }
generatetoken(data: UsersEntity)
{
  const token = sign({email: data.email, id: data.id, role: data.role}, "clesecrete")
  return token;
}
buildresponseuser(data: UsersEntity){
  return{
    ...data, 
    token: this.generatetoken(data)
  }
}
async getAllUser(){
  const data = await this.userRepository.find({})
  if(!data){
    throw new HttpException("Aucun utilisateur trouvé", HttpStatus.NOT_FOUND)
  }
  return data;
}
async deleteuser(id:number){
  const isfound = await this.userRepository.findOne({where:{id}})
  if(! isfound){
    throw new HttpException('Utilisateur pas trouvé', HttpStatus.NOT_FOUND)
  }
  return await this.userRepository.delete(isfound)
}
} 