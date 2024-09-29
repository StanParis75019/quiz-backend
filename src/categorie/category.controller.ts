// src/category/category.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { CategoryService } from './Categorie.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  // Route pour récupérer toutes les catégories
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  // Route pour récupérer une catégorie spécifique par son identifiant
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Post("/create")
  // Route pour créer une nouvelle catégorie
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  // Route pour mettre à jour une catégorie existante
  async update(@Param('id') id: number, @Body() { name, description }: UpdateCategoryDto) {
    console.log(name); // Log du nom pour vérifier les données reçues
    return this.categoryService.update(id, { name, description });
  }

  @Delete(':id')
  // Route pour supprimer une catégorie
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
