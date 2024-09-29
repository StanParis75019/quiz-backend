import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("admintable")
export class AdminEntity {
    @PrimaryGeneratedColumn()
    // Colonne pour la clé primaire générée automatiquement
    id: number;

    @Column()
    // Colonne pour stocker le nom d'utilisateur
    username: string;

    @Column()
    // Colonne pour stocker le mot de passe
    password: string;

    @Column()
    // Colonne pour stocker le rôle de l'administrateur
    role: string;

    @Column()
    // Colonne pour stocker l'email
    email: string;

    @Column()
    // Colonne pour stocker le prénom
    firstname: string;

    @Column()
    // Colonne pour stocker le nom de famille
    lastname: string;
}
