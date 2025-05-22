import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, Db, MongoClient } from 'mongodb';

@Injectable()
export class CatalogueService implements OnModuleInit {
  private db: Db;
  private articlesCollection: Collection;

  constructor(private configService: ConfigService) { }

  async onModuleInit() {
    console.log('onModuleInit()');
    const user = this.configService.get<string>('DB_USER');
    const pass = this.configService.get<string>('DB_PASS');
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<string>('DB_PORT');
    const dbName = this.configService.get<string>('DB_NAME');

    console.log("🔍 DB_USER:", user);
    console.log("🔍 DB_PASS:", pass);
    console.log("🔍 DB_HOST:", host);
    console.log("🔍 DB_PORT:", port);


    const uri = `mongodb://${user}:${pass}@${host}:${port}/?authSource=admin`;

    try {
      const client = new MongoClient(uri);
      await client.connect();
      this.db = client.db(dbName);
      this.articlesCollection = this.db.collection('articles');
    } catch (error) {
      console.error('Erreur lors de la connexion à MongoDB :', error.message);
    }
  }

  async getArticles(): Promise<any[]> {
    console.log("getArticles()");

    let nombreDocuments = await this.articlesCollection.countDocuments();
    console.log("nombreDocuments : " + nombreDocuments);
    return await this.articlesCollection.find().toArray();
  }

  async getArticlesFiltrés(rayon: string, marque: string, prixMax: string): Promise<any[]> {
    let filter = {};
    if(rayon != "*") filter['rayon'] = rayon;
    if(marque != "*") filter['marque'] = marque;
    if(prixMax != "*") filter['prix'] = {$lt: parseFloat(prixMax)};
    console.log(filter);

    return await this.articlesCollection.find(filter).toArray();
  }

  async getRayons(): Promise<any[]> {
    return await this.articlesCollection.distinct('rayon');
  }

  async getMarques(): Promise<any[]> {
    return await this.articlesCollection.distinct('marque');
  }

}
