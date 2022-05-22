import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EventService } from '../service/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProductService } from '../service/productservice';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./tabledemo.scss']
})
export class DashboardDemoComponent implements OnInit {

    data: any;

    products: any[];

    tauxis: any[];
    tauxir: any[];

    items: MenuItem[];

    chartData: any;

    chartOptions: any;

    events: any[];

    fullcalendarOptions: any;

    constructor(private eventService: EventService, private productService: ProductService) {
        this.data = {
            labels: ['Industrie', 'Services aux entreprises', 'Commerce, réparations automobile et d\'articles domestiques', 'Bâtiment et travaux publics', 'Transports et communications',
                'Activités financières', 'Services collectifs, sociaux et personnels', 'Hôtels et restaurants'],
            datasets: [
                {
                    data: [52, 18, 12, 9, 6, 1, 1, 1],
                    backgroundColor: [
                        "#55A7E5",
                        "#09BAAC",
                        "yellow",
                        "red",
                        "#174794",
                        "orange",
                        "#054e0d",
                        "#FF6384",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36a2eb",
                        "#FFCE56",
                        "#fe4533",
                        "#fe4533",
                        "#fe4533",
                        "#fe4533",
                        "#fe4533",
                    ]
                }]
        };
    }

    goToHome(){
        document.getElementById("imgaccueil").scrollIntoView({behavior: "smooth"});
    }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.tauxis = [
            {beneficeMin: '0.00', beneficeMax: '300 000.00', taux: '10%'},
            {beneficeMin: '300 001.00', beneficeMax: '1 000 000.00', taux: '20%'},
            {beneficeMin: '1 000 001.00', beneficeMax: '+', taux: '30%'},
        ];
        this.tauxir = [
            {salMin: '0.00', salMax: '2 500.00', taux: '0%'},
            {salMin: '2 501.00', salMax: '4 166.00', taux: '10%'},
            {salMin: '4 167.00', salMax: '5 000.00', taux: '20%'},
            {salMin: '5 001.00', salMax: '6 666.00', taux: '30%'},
        ];

        this.items = [
            { label: 'Save', icon: 'pi pi-check' },
            { label: 'Update', icon: 'pi pi-refresh' },
            { label: 'Delete', icon: 'pi pi-trash' },
        ];

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: [
                    '#0F97C7',
                ],
                borderWidth: 3,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 3
            }, {
                label: 'Income',
                data: [1, 2, 5, 3, 12, 7, 15],
                backgroundColor: [
                    'rgba(187,222,251,0.2)',
                ],
                borderColor: [
                    '#578697',
                ],
                borderWidth: 3,
                fill: true
            },
            {
                label: 'Expenses',
                data: [7, 12, 15, 5, 3, 13, 21],
                borderColor: [
                    '#1BA7AF',
                ],
                borderWidth: 3,
                fill: false,
                pointRadius: [4, 6, 4, 12, 8, 0, 4]
            },
            {
                label: 'New Users',
                data: [3, 7, 2, 17, 15, 13, 19],
                borderColor: [
                    '#E2841A',
                ],
                borderWidth: 3,
                fill: false
            }]
        };

        this.chartOptions = {
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        };

        this.eventService.getEvents().then(events => { this.events = events; });

        this.fullcalendarOptions = {
            plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2017-02-12',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };
    }
}
