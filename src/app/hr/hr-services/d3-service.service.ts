import { Injectable } from '@angular/core';
import * as d3 from 'd3';


@Injectable({
  providedIn: 'root'
})
export class D3ServiceService {

  public d3 = d3;

  constructor() { }

}
