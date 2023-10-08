import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { Track } from "./Track.entity";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    artistId: string;

    @Column()
    name: string;

    @ManyToMany(() => Track)
    @JoinTable()
    tracks: Track[];
}