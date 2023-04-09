export const firstFit = (
    blockSizes: number[],
    processSizes: number[]
): number[] => {
    const allocation: number[] = Array(processSizes.length).fill(-1);

    for (let i = 0; i < processSizes.length; i++) {
        for (let j = 0; j < blockSizes.length; j++) {
            if (blockSizes[j] >= processSizes[i]) {
                allocation[i] = j;
                blockSizes[j] -= processSizes[i];
                break;
            }
        }
    }

    const result = [];

    renderTable(processSizes, allocation);
    for (let i = 0; i < processSizes.length; i++) {
        const process = {
            processNumber: i + 1,
            processSize: processSizes[i],
            blockNumber:
                allocation[i] !== -1 ? allocation[i] + 1 : 'Not Allocated',
        };
        result.push(process);
    }

    return result;
};

const renderTable = (processSizes, allocation) => {
    console.log('Process No.\tProcess Size\tBlock no.');
    for (let i = 0; i < allocation.length; i++) {
        console.log(
            `${i + 1}\t\t${processSizes[i]}\t\t${
                allocation[i] !== -1 ? allocation[i] + 1 : 'Not Allocated'
            }`
        );
    }
};
