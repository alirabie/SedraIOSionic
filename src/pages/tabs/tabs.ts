import { Component } from '@angular/core';

import { CookesPage } from '../cookes/cookes';
import { GiftsPage } from '../gifts/gifts';
import { FlowersPage } from '../flowers/flowers';
import { PlantsPage } from '../plants/plants'
import { HomePage } from '../home/home'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CookesPage;
  tab2Root = FlowersPage;
  tab5Root = HomePage;
  tab3Root = GiftsPage;
  tab4Root = PlantsPage;

  constructor() {

  }
}
