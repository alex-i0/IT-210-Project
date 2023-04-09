import { bestFit } from './bestFit';
import { firstFit } from './firstFit';
import { worstFit } from './worstFit';

describe('memory allocation methods', () => {
    const blockSize: number[] = [100, 500, 200, 300, 600];
    const processSize: number[] = [212, 417, 112, 426];

    test('first fit', () => {
        const expectedResult = [
            { blockNumber: 4, processNumber: 1, processSize: 212 },
            { blockNumber: 2, processNumber: 2, processSize: 417 },
            { blockNumber: 3, processNumber: 3, processSize: 112 },
            { blockNumber: 5, processNumber: 4, processSize: 426 },
        ];

        expect(bestFit(blockSize, processSize)).toEqual(expectedResult);
    });

    test('best fit', () => {
        const expectedResult = [
            {
                blockNumber: 'Not Allocated',
                processNumber: 1,
                processSize: 212,
            },
            {
                blockNumber: 'Not Allocated',
                processNumber: 2,
                processSize: 417,
            },
            { blockNumber: 5, processNumber: 3, processSize: 112 },
            {
                blockNumber: 'Not Allocated',
                processNumber: 4,
                processSize: 426,
            },
        ];

        expect(firstFit(blockSize, processSize)).toEqual(expectedResult);
    });

    test('worst fit', () => {
        const expectedResult = [
            {
                blockNumber: 'Not Allocated',
                processNumber: 1,
                processSize: 212,
            },
            {
                blockNumber: 'Not Allocated',
                processNumber: 2,
                processSize: 417,
            },
            {
                blockNumber: 'Not Allocated',
                processNumber: 3,
                processSize: 112,
            },
            {
                blockNumber: 'Not Allocated',
                processNumber: 4,
                processSize: 426,
            },
        ];

        expect(worstFit(blockSize, processSize)).toEqual(expectedResult);
    });
});
