import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Observable, from } from 'rxjs';
import { Order } from './order.model';

@Injectable()
export class StaticDataSource
{
    private books:Book[] = 
    [
        new Book(1,'Book 1','Author 1','Year 1','Short description 1',10),
        new Book(2,'Book 2','Author 1','Year 2','Short description 2',10),
        new Book(3,'Book 3','Author 1','Year 3','Short description 3',10),
        new Book(4,'Book 4','Author 3','Year 4','Short description 4',10),
        new Book(5,'Book 5','Author 4','Year 5','Short description 5',10),
        new Book(6,'Book 6','Author 4','Year 6','Short description 6',10),
        new Book(7,'Book 7','Author 4','Year 7','Short description 7',10),
        new Book(8,'Book 8','Author 3','Year 8','Short description 8',10),
        new Book(9,'Book 9','Author 3','Year 9','Short description 9',10),
        new Book(10,'Book 10','Author 4','Year 10','Short description 10',10),
        new Book(11,'Book 11','Author 3','Year 11','Short description 11',10)
    ];

    getBooks(): Observable<Book[]>
    {
        return from([this.books]);
    }

    saveOrder(order : Order) : Observable<Order>
    {
        console.log(JSON.stringify(order));
        return from ([order]);
    }
}