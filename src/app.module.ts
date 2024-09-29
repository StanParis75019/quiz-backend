import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AdminEntity } from './admin/admin.entity';

import { MessageModule } from './messages/messages.module';
import { UsersModule } from './users/user.module';

import { Adminmiddleware } from './admin/Middleware/Admin.middleware';
import { QuizModule } from './quiz/quiz.module';
import { Message } from './messages/messages.entity';
import { User } from './users/user.entity';
import { Quiz } from './quiz/Quiz.entity';
import { NewsletterModule } from './newsletter/newsletter.module';
import { NewsletterEntity } from './newsletter/newsletter.entity';



@Module({
  imports: [AdminModule, QuizModule, MessageModule, UsersModule,NewsletterModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-1a1e680b-himstanley-0e61.i.aivencloud.com',
    port: 23187,
    username: 'avnadmin',
    password: 'AVNS_nPnBcjCaSIp6i1aV9fe',
    database: 'defaultdb',
    entities: [AdminEntity, Message, User, Quiz, NewsletterEntity],
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