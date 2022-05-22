import {Component, Injectable, OnInit} from '@angular/core';
import {DashboardDemoComponent} from "../dashboarddemo.component";


@Component({
  selector: 'app-firsthomepage',
  templateUrl: './firsthomepage.component.html',
  styleUrls: ['./firsthomepage.component.scss']
})
export class FirsthomepageComponent implements OnInit {

  constructor(public dash: DashboardDemoComponent) {}

  ngOnInit() {
  }
  goToContact(){
    document.getElementById("contactus").scrollIntoView({behavior: "smooth"});
  }
  goToHome(){
    document.getElementById("imgaccueil").scrollIntoView({behavior: "smooth"});
  }
}
