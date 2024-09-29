// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  // Colonne pour la clé primaire générée automatiquement
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  // Colonne pour stocker le nom d'utilisateur (doit être unique)
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  // Colonne pour stocker l'email de l'utilisateur (doit être unique)
  email: string;

  @Column({ type: 'varchar', length: 255 })
  // Colonne pour stocker le prénom de l'utilisateur
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  // Colonne pour stocker le nom de famille de l'utilisateur
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  // Colonne pour stocker le mot de passe de l'utilisateur (sera haché avant d'être stocké)
  password: string;

  @Column({ type: 'varchar', length: 20, default: 'user' })
  // Colonne pour stocker le rôle de l'utilisateur (par défaut 'user' pour les utilisateurs réguliers)
  role: string;

  @Column({ type: 'int', default: 0 })
  // Colonne pour stocker le score total des quiz joués par l'utilisateur
  score: number;

  @CreateDateColumn()
  // Colonne pour stocker la date de création de l'utilisateur (gérée automatiquement)
  createdAt: Date;

  @UpdateDateColumn()
  // Colonne pour stocker la date de la dernière mise à jour de l'utilisateur (gérée automatiquement)
  updatedAt: Date;
}
