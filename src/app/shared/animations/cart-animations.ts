import { animate, state, style, transition, trigger } from "@angular/animations";

export const openCart = trigger('openCart', [
    transition('void => *', [
        style({ transform: 'translateX(320px)' }),
        animate('.3s ease-in-out', style({ transform: 'translateX(0px)' })),
    ]),
    
    transition('* => void', [
        style({ transfrom: 'translateX(0px)' }),
        animate('.3s ease', style({ transform: 'translateX(320px)' })),
    ]),
]);

export const showShadow = trigger('showShadow', [
    transition('void => *', [
        style({ opacity: 0 }),
        animate('.4s ease', style({ opacity: 1 })),
    ]),
    transition('* => void', [
        style({ opacity: 1 }),
        animate('.4s ease', style({ opacity: 0 })),
    ]),
]);