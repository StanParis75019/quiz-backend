import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AdminEntity } from './admin/admin.entity';
import { MessageEntity } from './messages/messages.entity';
import { MessageModule } from './messages/messages.module';
import { UsersModule } from './users/user.module';
import { UsersEntity } from './users/user.entity';
import { Adminmiddleware } from './admin/Middleware/Admin.middleware';
import { QuizModule } from './quiz/quiz.module';
import { QuizEntity } from './quiz/Quiz.entity';


@Module({
  imports: [AdminModule, QuizModule, MessageModule, UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'quizdatabase',
    entities: [AdminEntity, MessageEntity, UsersEntity, QuizEntity],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(Adminmiddleware).forRoutes({
      path: '*',
      method:RequestMethod.ALL
    })
  }
}
