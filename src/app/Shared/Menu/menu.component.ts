import { Location, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: true,
    imports: [
        NgClass,
        RouterLink
    ]
})
export class MenuComponent implements OnInit, OnDestroy {
    currentRoute!: string;
    routerSubscription!: Subscription;

    constructor(private router: Router, private location: Location){}

    ngOnInit(): void {
        this.routerSubscription = this.router.events.subscribe(() => {
            this.currentRoute = this.location.path();
        });        
    }

    ngOnDestroy(): void {
        if(this.routerSubscription) this.routerSubscription.unsubscribe();
    }
}
