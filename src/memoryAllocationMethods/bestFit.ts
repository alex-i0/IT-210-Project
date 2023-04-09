export const bestFit = (blockSize: number[], processSize: number[]) => {
    let allocation: number[] = new Array(processSize.length).fill(-1);

    for (let i = 0; i < processSize.length; i++) {
        let bestIdx: number = -1;
        for (let j = 0; j < blockSize.length; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (bestIdx == -1) {
                    bestIdx = j;
                } else if (blockSize[bestIdx] > blockSize[j]) {
                    bestIdx = j;
                }
            }
        }
        if (bestIdx != -1) {
            allocation[i] = bestIdx;
            blockSize[bestIdx] -= processSize[i];
        }
    }

    const result = [];

    renderTable(processSize, allocation);
    for (let i = 0; i < processSize.length; i++) {
        const process = {
            processNumber: i + 1,
            processSize: processSize[i],
            blockNumber:
                allocation[i] != -1 ? allocation[i] + 1 : 'Not Allocated',
        };
        result.push(process);
    }

    return result;
};

const renderTable = (processSize, allocation) => {
    console.log('Process No.\tProcess Size\tBlock no.');
    for (let i = 0; i < processSize.length; i++) {
        console.log(
            i + 1,
            '\t\t',
            processSize[i],
            '\t\t',
            allocation[i] != -1 ? allocation[i] + 1 : 'Not Allocated'
        );
    }
};
