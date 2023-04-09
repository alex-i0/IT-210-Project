export const worstFit = (blockSize: number[], processSize: number[]) => {
    // Initialize all memory blocks as free
    let allocation: number[] = new Array(blockSize.length).fill(-1);

    // Start by picking each process
    for (let i = 0; i < processSize.length; i++) {
        // Find the maximum block size that can be assigned to current process
        let worstIdx = -1;
        for (let j = 0; j < blockSize.length; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (worstIdx === -1 || blockSize[j] > blockSize[worstIdx]) {
                    worstIdx = j;
                }
            }
        }

        // If a suitable block is found, allocate the current process to it
        if (worstIdx !== -1) {
            allocation[worstIdx] = i;
            blockSize[worstIdx] -= processSize[i];
        }
    }

    const result = [];

    renderTable(processSize, allocation);
    for (let i = 0; i < processSize.length; i++) {
        const process = {
            processNumber: i + 1,
            processSize: processSize[i],
            blockNumber: allocation.indexOf(i) + 1 || 'Not Allocated',
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
            allocation.indexOf(i) + 1 || 'Not Allocated'
        );
    }
};
