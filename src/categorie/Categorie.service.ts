import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categorie.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    // Injection du repository de l'entité 'Category' pour interagir avec la base de données
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Méthode pour récupérer toutes les catégories
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Méthode pour récupérer une catégorie par son identifiant
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      // Lance une exception si la catégorie n'est pas trouvée
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  // Méthode pour créer une nouvelle catégorie
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    });
    return await this.categoryRepository.save(category);
  }

  // Méthode pour mettre à jour une catégorie existante
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id); // Récupère la catégorie à mettre à jour
    console.log(updateCategoryDto);
    // Assigne les nouvelles valeurs à la catégorie
    Object.assign(category, updateCategoryDto);
    console.log(category);
    return await this.categoryRepository.save(category);
  }

  // Méthode pour supprimer une catégorie
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id); // Récupère la catégorie à supprimer
    await this.categoryRepository.remove(category);
  }
}
