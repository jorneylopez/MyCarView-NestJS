import { UsersService } from '../users.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class CurrrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) { }
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currrentUser = user;
        }

        return handler.handle();
    }

}