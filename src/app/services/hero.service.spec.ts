import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { BaseHero } from '../models/hero.model';
import { HttpResponse } from '@angular/common/http';

describe('HeroService', () => {
    let service: HeroService;
    let httpTestingController: HttpTestingController;
    const mockHero: BaseHero = { id: 1, name: 'Clark Kent', alias: 'Superman', description: 'Description', gender: 'Masculino', powersIds: [1], teamIds: [1] };
    const testUrl = 'api/heroes';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.inject(HeroService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a GET request and return an array of Heroes', () => {
        service.getHeroes().subscribe({
            next: data => expect(data)
                .toEqual([mockHero]),
            error: fail
        });

        const req = httpTestingController.expectOne(testUrl);
        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toEqual(null);

        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: [mockHero] });
        req.event(expectedResponse);
    });

    it('should make a GET request by id and return a Hero', () => {
        const getHeroeById = `${testUrl}/${mockHero.id}`

        service.getHero(mockHero.id).subscribe({
            next: data => expect(data)
                .toEqual(mockHero),
            error: fail
        });

        const req = httpTestingController.expectOne(getHeroeById);
        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toEqual(null);

        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: mockHero });
        req.event(expectedResponse);
    });

    it('should make a GET request by name and return an array of Heroes', () => {
        const searchString = mockHero.alias?.trim()
        const searchHeroesByNameUrl = `${testUrl}?name=${searchString}&alias=${searchString}`
        service.searchHeroes(searchString).subscribe({
            next: data => expect(data)
                .toEqual([mockHero]),
            error: fail
        });

        const req = httpTestingController.expectOne(searchHeroesByNameUrl);
        expect(req.request.method).toEqual('GET');
        expect(req.request.body).toEqual(null);

        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: mockHero });
        req.event(expectedResponse);
    });


    it('should make a POST request and add a Hero', () => {
        service.addHero(mockHero).subscribe({
            next: data => expect(data)
                .toEqual(mockHero),
            error: fail
        });

        const req = httpTestingController.expectOne(testUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockHero);

        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: mockHero });
        req.event(expectedResponse);
    });

    it('should make a PUT request and update a Hero', () => {
        service.updateHero(mockHero).subscribe({
            next: data => expect(data)
                .toEqual(mockHero),
            error: fail
        });

        const req = httpTestingController.expectOne(testUrl);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(mockHero);

        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: mockHero });
        req.event(expectedResponse);
    });

    it('should make a DELETE request and delete a Hero', () => {
        const deleteUrl = `${testUrl}/${mockHero.id}`

        service.deleteHero(mockHero.id).subscribe({
            next: data => expect(data)
                .toEqual(mockHero),
            error: fail
        });

        const req = httpTestingController.expectOne(deleteUrl);
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toEqual(null);

        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: mockHero });
        req.event(expectedResponse);
    });
});
