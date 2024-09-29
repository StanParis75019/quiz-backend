import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './Categorie.service';
import { CategoryController } from './category.controller';
import { Category } from './categorie.entity';

@Module({
  // Importe le module TypeOrmModule avec l'entité Category pour permettre les opérations sur la base de données
  imports: [TypeOrmModule.forFeature([Category])],
  
  // Spécifie le service 'CategoryService' comme fournisseur dans ce module
  providers: [CategoryService],
  
  // Spécifie le contrôleur 'CategoryController' pour gérer les routes liées aux catégories
  controllers: [CategoryController],
})
export class CategoryModule {}
