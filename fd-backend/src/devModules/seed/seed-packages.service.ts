import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackageStatus } from 'src/modules/package/interface/package.interface';

import {
  Package,
  PackageDocument,
} from '../../modules/package/entities/package.entity';

@Injectable()
export class SeedPackagesService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  async dropPackages() {
    this.packageModel.collection.drop();
  }

  async createPendingPackages() {
    const adminA = {
      _id: 'tAOHWYOyM8ZsgELhvLxvnaauKqf2',
      fullName: 'admin admin',
      email: 'admin@admin.com',
      avatarURL: '',
    };
    /* const userA = {
      _id: 'AxUd8B5XTvb66tzpDZaRrXPVzDH3',
      fullName: 'Francisco Alvarez Raineri',
      email: 'franciscoalvarezraineri@gmail.com',
    };
    const userB = {
      _id: 'BNfnN82tepaHviOmnzXyfROWNAi2',
      fullName: 'Pablo Burgos',
      email: 'pablo@gmail.com ',
    };
    const userC = {
      _id: 'CCs3cBEwGXcYNwKvTfBB49nFTfG2',
      fullName: 'German Rivarola',
      email: 'german@gmail.com',
    };*/
    const clientA = {
      fullName: 'Cliente A',
      address: {
        number: '1234',
        city: 'Buenos Aires',
        state: 'Buenos Aires',
        country: 'Argentina',
        street: '9 de Julio',
      },
      latlng: { lat: -34.5953256, lng: -58.38247819999999 },
    };
    const clientB = {
      fullName: 'Cliente B',
      address: {
        number: '3210',
        city: 'Buenos Aires',
        state: 'Buenos Aires',
        country: 'Argentina',
        street: 'Av. Independencia',
      },
      latlng: { lat: -34.6205403, lng: -58.4108795 },
    };
    const clientC = {
      fullName: 'Cliente C',
      address: {
        number: ' 2620',
        city: 'Buenos Aires',
        state: 'Buenos Aires',
        country: 'Argentina',
        street: 'Av. Hipólito Yrigoyen',
      },
      latlng: { lat: -34.6112328, lng: -58.40353440000001 },
    };
    const clientD = {
      fullName: 'Cliente D',
      address: {
        number: '1997',
        city: 'Buenos Aires',
        state: 'Buenos Aires',
        country: 'Argentina',
        street: 'Av. Córdoba',
      },
      latlng: { lat: -34.5995019, lng: -58.39562919999999 },
    };
    const clientE = {
      fullName: 'Cliente E',
      address: {
        number: '1520',
        city: 'Buenos Aires',
        state: 'Buenos Aires',
        country: 'Argentina',
        street: 'Av. Sta. Fe',
      },
      latlng: { lat: -34.5960267, lng: -58.3888712 },
    };

    const pendingPacakges: Package[] = [
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-04'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-04'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-04'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-04'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-05'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-05'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientD,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientE,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientD,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientE,
        deliveryDate: new Date('2023-05-07'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-06'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientB,
        deliveryDate: new Date('2023-05-08'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-08'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientA,
        deliveryDate: new Date('2023-05-08'),
        status: PackageStatus.Pending,
      },
      {
        weight: 10,
        createdBy: adminA,
        client: clientC,
        deliveryDate: new Date('2023-05-08'),
        status: PackageStatus.Pending,
      },
    ];
    this.packageModel.create(pendingPacakges);
  }
}
