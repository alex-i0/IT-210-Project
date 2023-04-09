import { firstInFirstOut } from './firstInFirstOut';
import { lastFrequentlyUsed } from './lastFrequentlyUsed';
import { leastRecentlyUsed } from './leastRecentlyUsed';

describe('page replacement algorithms', () => {
    describe('First Come First Serve', () => {
        const pages: number[] = [0, 1, 2, 3, 0, 1, 4, 0, 1, 2, 3, 4];

        test('page faults', () => {
            expect(firstInFirstOut(pages, 4, 16).pageFaults).toBe(10);
        });
    });

    describe('Least Recently Used', () => {
        const pages: number[] = [0, 1, 2, 3, 0, 1, 4, 0, 1, 2, 3, 4];
        const size = 2;

        test('page faults', () => {
            expect(leastRecentlyUsed(pages, size).pageFaults).toBe(12);
        });
    });

    describe('Last Frequently Used', () => {
        const pages: number[] = [0, 1, 2, 3, 0, 1, 4, 0, 1, 2, 3, 4];
        const size = 2;

        test('page faults', () => {
            expect(lastFrequentlyUsed(pages, size).pageFaults).toBe(12);
        });
    });
});
