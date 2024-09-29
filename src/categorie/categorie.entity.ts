import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  // Colonne pour la clé primaire générée automatiquement
  id: number;

  @Column({ type: 'varchar', length: 255 })
  // Colonne pour stocker le nom de la catégorie (chaîne de caractères, longueur maximale de 255)
  name: string;

  @Column({ type: 'text', nullable: true })
  // Colonne pour stocker la description de la catégorie (facultatif)
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  // Colonne pour stocker la date de création de la catégorie (gérée automatiquement)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  // Colonne pour stocker la date de la dernière mise à jour de la catégorie (gérée automatiquement)
  updatedAt: Date;
}
