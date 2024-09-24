import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnSalonObject } from './return-salon.object';
import { faker } from '@faker-js/faker';
import { CreateSalonDto, UpdateSalonDto } from './dto/salon.dto';
import { hash } from 'argon2'
import { AddressDto } from './dto/address.dto';
import * as turf from "@turf/turf";
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class SalonService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async byId(id: string) {
        return this.prisma.salon.findFirst({
            where: { id },
            select: { 
                ...returnSalonObject, 
                employee: true,
                salonServices:true,
                coupons:true,
                servicesRendered:true,
                appointments:{
                    select:{
                        id:true,
                        date:true,
                        customer:{
                            select:{
                                id:true,
                                name:true,
                            }
                        },
                        salonService:{
                            select:{
                                id:true,
                                name:true,
                            }
                        },
                        employee:true
                    }
                },
            },
           

        })
    }

    async filter(dto: FilterDto) {
        const { coordinates, name, city, state, distanceLimit } = dto
        const searchConditions: any = {};

        if (name) {
            searchConditions.nome = name;
        }
        if (city) {
            searchConditions.address = city;
            searchConditions.state = state;
        }


        const saloons = await this.prisma.salon.findMany({
            where: {
                name: name,
                address: {
                    city: city,
                    state: state
                }
            },
            select: returnSalonObject
        })

        if (coordinates) {
            const salonsDistance = saloons.map(salon => {
                if (salon.geoCoordinates) {
                    const distanceSalon = turf.distance(
                        turf.point(salon.geoCoordinates),
                        turf.point(coordinates), //coordenadas que serão recebidas do usuario
                        { units: "kilometers" }
                    ).toFixed(1);

                    return {
                        ...salon,
                        distance: parseFloat(distanceSalon)
                    };
                }
                return null; //if dont receive coordinates return null 
            }).filter(salon => salon && salon.distance <= distanceLimit);

            return salonsDistance;
        }

        return saloons;

    }

    async getAll(searchTerm?: string) {
        if (searchTerm) {
            return this.search(searchTerm)
        }

        return this.prisma.salon.findMany({
            select: returnSalonObject,
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async search(searchTerm: string) {
        return this.prisma.salon.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                ]
            },
            select: returnSalonObject
        })
    }

    async create(dto: CreateSalonDto) {
        const verifyEmail = await this.prisma.customer.findUnique({
            where: {
                email: dto.email
            }
        })

        if (verifyEmail) throw new BadRequestException('Usuário existente')


        const salon = await this.prisma.salon.create({
            data: {
                email: dto.email,
                password: await hash(faker.internet.password()),
                name: faker.person.fullName(),
                image: faker.image.avatar(),
                phone: faker.phone.number(),
                geoCoordinates: [
                    faker.location.latitude(),
                    faker.location.longitude()
                ],
                address: {
                    create: {
                        city: faker.location.city(),
                        district: faker.location.county(),
                        street: faker.location.street(),
                        zipcode: faker.location.zipCode(),
                        state: faker.location.state(),
                        number: faker.location.buildingNumber(),
                    }
                }
            }
        })

        return salon.id
    }

    async update(id: string, salonDto: UpdateSalonDto, addressDto: AddressDto) {
        const { email, name, image, phone, status } = salonDto
        const { city, district, street, zipcode, state, number } = addressDto


        return this.prisma.salon.update({
            where: {
                id
            },
            data: {
                email,
                name,
                image,
                phone,
                status,
                address: {
                    update: {
                        city: city,
                        district: district,
                        street: street,
                        zipcode: zipcode,
                        state: state,
                        number: number,
                    }
                }
            }
        })
    }

    async delete(id: string) {
        return this.prisma.salon.delete({ where: { id } })
    }



}
