interface DLProcess {
    maxResources: number[];
    allocatedResources: number[];
    neededResources: number[];
}

function isSafeState(
    processes: DLProcess[],
    availableResources: number[]
): boolean {
    const work = [...availableResources];

    const finished = new Array(processes.length).fill(false);

    let i = 0;
    while (i < processes.length) {
        if (
            !finished[i] &&
            processes[i].neededResources.every((need, j) => need <= work[j])
        ) {
            finished[i] = true;
            processes[i].allocatedResources.forEach(
                (allocated, j) => (work[j] += allocated)
            );
            i = 0;
        } else {
            i++;
        }
    }

    return finished.every((isFinished) => isFinished);
}

function requestResources(
    process: DLProcess,
    availableResources: number[],
    request: number[]
): boolean {
    if (
        request.some((requested, i) => requested > process.neededResources[i])
    ) {
        console.error(
            "Error: Requested resources exceed process's maximum needs"
        );
        return false;
    }

    if (request.some((requested, i) => requested > availableResources[i])) {
        console.log(
            `Process ${process} must wait because resources are not available`
        );
        return false;
    }

    const newAvailableResources = availableResources.map(
        (resource, i) => resource - request[i]
    );
    const newAllocatedResources = process.allocatedResources.map(
        (allocated, i) => allocated + request[i]
    );
    const newNeededResources = process.neededResources.map(
        (needed, i) => needed - request[i]
    );

    const newProcesses = processes.map((p) => {
        if (p === process) {
            return {
                maxResources: p.maxResources,
                allocatedResources: newAllocatedResources,
                neededResources: newNeededResources,
            };
        } else {
            return p;
        }
    });

    if (isSafeState(newProcesses, newAvailableResources)) {
        console.log(`Resources granted to process ${process}`);
        return true;
    } else {
        console.log(
            `Resources cannot be granted to process ${process}, the state is unsafe`
        );
        return false;
    }
}

// Example usage
const processes: DLProcess[] = [
    {
        maxResources: [3, 3, 2, 2],
        allocatedResources: [1, 2, 2, 1],
        neededResources: [2, 1, 0, 1],
    },
    {
        maxResources: [1, 2, 3, 4],
        allocatedResources: [1, 0, 3, 3],
        neededResources: [0, 2, 0, 1],
    },
    {
        maxResources: [1, 3, 5, 0],
        allocatedResources: [1, 2, 1, 0],
        neededResources: [0, 1, 4, 0],
    },
];

const availableResources = [3, 1, 1, 2];

console.log(isSafeState(processes, availableResources)); // true

const request1 = [0, 1, 0, 0]; // request 1 unit of resource B
requestResources(processes[1], availableResources, request1); // Resources granted to process 1

const request2 = [1, 0, 1, 0]; // request 1 unit of resource A and 1 unit of resource C
requestResources(processes[2], availableResources, request2);
