import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  // Colonne pour la clé primaire générée automatiquement
  id: number;

  @Column({ type: 'varchar', length: 255 })
  // Colonne pour stocker le nom de l'expéditeur (chaîne de caractères, longueur maximale de 255)
  senderName: string;

  @Column({ type: 'varchar', length: 255 })
  // Colonne pour stocker l'email de l'expéditeur (chaîne de caractères, longueur maximale de 255)
  email: string;

  @Column({ type: 'text' })
  // Colonne pour stocker le contenu du message (texte sans limite de longueur)
  messageBody: string;

  @CreateDateColumn()
  // Colonne pour stocker la date de création du message (gérée automatiquement par la base de données)
  createdAt: Date;
}
