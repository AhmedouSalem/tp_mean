import { Controller, Get, Param } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  getArticles() : Object {
    return this.catalogueService.getArticles();
  }

  @Get(':rayon/:marque/:prixMax')
  getArticlesFiltrés(
    @Param('rayon') rayon: string, 
    @Param('marque') marque: string, 
    @Param('prixMax') prixMax: string
  ): Object {
    console.log('Passage par le contrôleur avec', rayon, marque, prixMax);
    return this.catalogueService.getArticlesFiltrés(rayon, marque, prixMax);
  }

  @Get('rayons')
  getRayons() : Object{
    console.log('GET Rayons');
    return this.catalogueService.getRayons();
  }

  @Get('marques')
  getMarques() : Object {
    console.log("GET MARQUES");
    return this.catalogueService.getMarques();
  }
}
