import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity } from "./admin.entity";
import { compare, hash} from "bcryptjs"
import { RegisterDto } from "./dto/createadmin.dto";
import { sign } from "jsonwebtoken";
import { UpdateAdminProfileDto } from "./dto/UpdateAdminProfile.dto";


@Injectable()

export class Adminservice {
 constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>
 ){}
 async login (email: string, password: string){
    const admin = await this.adminRepository.findOne({ where:{email} });
    if (!admin) {
      throw new HttpException("Aucun admin trouvé", HttpStatus.NOT_FOUND)
    }
    const match = await compare(password, admin.password);
    if (!match) {
      throw new Error("Invalid password");
    }
    return this.buildresponseadmin (admin);
 }

 async signup(data:RegisterDto){
    const isfound = await this.adminRepository.findOne({ where:{email:data.email} });
    if (isfound) {
      throw new HttpException("Email déjà utilisé", HttpStatus.CONFLICT)
    }
    const hashedPassword = await hash(data.password, 10);
    const admin = this.adminRepository.create({
      email:data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      username: data.username,
      role: "ADMIN",
      password: hashedPassword});
    const createadmin =  await this.adminRepository.save(admin);
    return this.buildresponseadmin(createadmin);
 }
generatetoken(data: AdminEntity)
{
  const token = sign({email: data.email, id: data.id, role: data.role}, "clesecrete")
  return token;
}
buildresponseadmin(data: AdminEntity){
  return{
    ...data, 
    token: this.generatetoken(data)
  }
}
async getAllAdmin(){
  const data = await this.adminRepository.find({})
  if(!data){
    throw new HttpException("Aucun admin trouvé", HttpStatus.NOT_FOUND)
  }
  return data;
}
async deleteadmin(id:number){
  const isfound = await this.adminRepository.findOne({where:{id}})
  if(! isfound){
    throw new HttpException('Admin pas trouvé', HttpStatus.NOT_FOUND)
  }
  return await this.adminRepository.delete(isfound)
}
async getmeasadmin(id:number){
  const user = await this.adminRepository.findOne({where:{id}})
  if(! user){
    throw new HttpException('Admin pas trouvé', HttpStatus.NOT_FOUND)
  }
  return user
}
async updateProfile(updateProfileDto: any): Promise<AdminEntity> {
  const user = await this.adminRepository.findOne({ where: { id: updateProfileDto.id } });
  
  if (!user) {
    throw new NotFoundException('Admin not found');
  }

  // Update fields only if they are provided
  if (updateProfileDto.firstName) {
    user.firstname = updateProfileDto.firstName;
  }
  if (updateProfileDto.lastName) {
    user.lastname = updateProfileDto.lastName;
  }
  if (updateProfileDto.email) {
    user.email = updateProfileDto.email;
  }

  // Handle password update if provided and valid
  if (updateProfileDto.password) {
    const isPasswordValid = this.validatePassword(updateProfileDto.password);
    if (!isPasswordValid) {
      throw new HttpException('Password must contain 8 characters, including 1 uppercase letter, 1 number, and 1 special character.', HttpStatus.BAD_REQUEST);
    }
    user.password = await hash(updateProfileDto.password, 10);
  }

  return await this.adminRepository.save(user);
}

// Password validation logic
private validatePassword(password: string): boolean {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return minLength && hasUppercase && hasNumber && hasSpecialChar;
}
} 