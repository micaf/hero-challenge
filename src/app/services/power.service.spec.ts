import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PowerService } from './power.service';
import { Power } from '../models/power.model';
import { provideHttpClient } from '@angular/common/http';

describe('PowerService', () => {
    let service: PowerService;
    let httpMock: HttpTestingController;
    const mockPowers: Power[] = [
        { id: 1, name: 'Super Strength', description: 'Enhanced physical strength' },
        { id: 2, name: 'Invisibility', description: 'Ability to become invisible' },
        { id: 3, name: 'Telepathy', description: 'Ability to read minds' },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PowerService, provideHttpClient(),
                provideHttpClientTesting()],
        });
        service = TestBed.inject(PowerService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch all powers (getPowers)', () => {
        service.getPowers().subscribe((powers) => {
            expect(powers).toEqual(mockPowers);
        });

        const req = httpMock.expectOne(service['powerUrl']);
        expect(req.request.method).toBe('GET');
        req.flush(mockPowers);
    });

    it('should fetch powers by IDs (getPowersByIds)', () => {
        const ids = [1, 3];
        const expectedPowers = mockPowers.filter(power => ids.includes(power.id));

        service.getPowersByIds(ids).subscribe((powers) => {
            expect(powers).toEqual(expectedPowers);
        });

        const req = httpMock.expectOne(service['powerUrl']);
        expect(req.request.method).toBe('GET');
        req.flush(mockPowers);
    });

    it('should search powers by term (searchPowers)', () => {
        const term = 'invisibility';
        const expectedPowers = mockPowers.filter(power =>
            power.name.toLowerCase().includes(term) ||
            power.description.toLowerCase().includes(term)
        );

        service.searchPowers(term).subscribe((powers) => {
            expect(powers).toEqual(expectedPowers);
        });

        const req = httpMock.expectOne(service['powerUrl']);
        expect(req.request.method).toBe('GET');
        req.flush(mockPowers);
    });

    it('should return an empty array if search term is empty (searchPowers)', () => {
        service.searchPowers('').subscribe((powers) => {
            expect(powers).toEqual([]);
        });

        httpMock.expectNone(service['powerUrl']);
    });

    it('should handle error and return an empty array (getPowers)', () => {
        spyOn(console, 'error');
        service.getPowers().subscribe((powers) => {
            expect(powers).toEqual([]);
            expect(console.error).toHaveBeenCalledWith(
                jasmine.stringContaining('getPowers failed: Http failure response for api/powers: 404 Not Found')
            );
        });

        const req = httpMock.expectOne(service['powerUrl']);
        req.flush('Error', { status: 404, statusText: 'Not Found' });
    });
});
