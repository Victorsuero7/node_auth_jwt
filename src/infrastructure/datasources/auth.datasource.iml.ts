import { error } from "console";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data/mongodb";
import { BcryptAdapter } from "../../config";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password:string) => string
type CompareFunction = (password:string, hased:string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){

    }



    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto

        try {

            const emailExists = await UserModel.findOne({ email: email });
            if (emailExists) { throw CustomError.badRequest('User alredy exists') }

            const user = await UserModel.create({
                name: name,
                email:email,
                password: this.hashPassword(password)
                // password: password
            })

            // await user.save()
            return UserMapper.userEntityfromObject(user)

        } catch (e) {
            if (e instanceof CustomError) {
                throw e
            }
            throw CustomError.internalServerError()
        }



    }

}