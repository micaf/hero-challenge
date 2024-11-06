import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';
import { provideHttpClient } from '@angular/common/http';

describe('TeamService', () => {
    let service: TeamService;
    let httpTestingController: HttpTestingController;

    const mockTeams: Team[] = [
        { id: 1, name: 'Avengers', members: [1, 2] },
        { id: 2, name: 'Justice League', members: [3, 4] },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TeamService,
                provideHttpClient(),
                provideHttpClientTesting()]
        });
        service = TestBed.inject(TeamService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should fetch all teams', () => {
        service.getTeams().subscribe(teams => {
            expect(teams.length).toBe(2);
            expect(teams).toEqual(mockTeams);
        });

        const req = httpTestingController.expectOne(service['teamsUrl']);
        expect(req.request.method).toBe('GET');
        req.flush(mockTeams);
    });

    it('should handle error when fetching all teams', () => {
        spyOn(console, 'error');
        service.getTeams().subscribe(teams => {
            expect(teams).toEqual([]);
        });

        const req = httpTestingController.expectOne(service['teamsUrl']);
        req.flush('Error fetching teams', { status: 500, statusText: 'Server Error' });
        expect(console.error).toHaveBeenCalledWith('getTeams failed: Http failure response for api/teams: 500 Server Error');
    });

    it('should fetch teams by IDs', () => {
        service.getTeamsByIds([1]).subscribe(teams => {
            expect(teams.length).toBe(1);
            expect(teams[0].id).toBe(1);
        });

        const req = httpTestingController.expectOne(service['teamsUrl']);
        req.flush(mockTeams);
    });

    it('should handle error when fetching teams by IDs', () => {
        spyOn(console, 'error');
        service.getTeamsByIds([1]).subscribe(teams => {
            expect(teams).toEqual([]);
        });

        const req = httpTestingController.expectOne(service['teamsUrl']);
        req.flush('Error fetching teams', { status: 500, statusText: 'Server Error' });
        expect(console.error).toHaveBeenCalledWith('getTeamsByIds failed: Http failure response for api/teams: 500 Server Error');
    });

    it('should search teams by term', () => {
        service.searchTeams('Justice').subscribe(teams => {
            expect(teams.length).toBe(1);
            expect(teams[0].name).toBe('Justice League');
        });

        const req = httpTestingController.expectOne(service['teamsUrl']);
        req.flush(mockTeams);
    });

    it('should return empty array when search term is empty', () => {
        service.searchTeams('').subscribe(teams => {
            expect(teams).toEqual([]);
        });

        httpTestingController.expectNone(service['teamsUrl']);
    });

    it('should handle error when searching teams by term', () => {
        spyOn(console, 'error');
        service.searchTeams('Justice').subscribe(teams => {
            expect(teams).toEqual([]);
        });

        const req = httpTestingController.expectOne(service['teamsUrl']);
        req.flush('Error searching teams', { status: 500, statusText: 'Server Error' });
        expect(console.error).toHaveBeenCalledWith('searchTeams failed: Http failure response for api/teams: 500 Server Error');
    });
});
