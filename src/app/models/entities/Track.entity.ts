import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { Artist } from "./Artist.entity"


@Entity()
export class Track {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({
        unique: true
    })
    isrc: string

    @Column()
    releaseDate: string


    @Column()
    coverImg: string

    @Column()
    type: string

    @Column()
    trackCount: number

    @ManyToMany(() => Artist, artist => artist.tracks)
    @JoinTable()
    artists: Artist[];

}