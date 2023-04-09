type Resource = {
    name: string;
    units: number;
};

type Process = {
    name: string;
    allocatedResources: Record<string, number>;
    requestedResources: Record<string, number>;
    finished: boolean;
};

type Graph = Record<string, string[]>;

function findDeadlock(processes: Process[], resources: Resource[]): Process[] {
    const availableResources: Record<string, number> = Object.fromEntries(
        resources.map(({ name, units }) => [name, units])
    );

    const allocatedResources: Record<string, number> = Object.fromEntries(
        processes.map(({ name }) => [name, 0])
    );

    const requestedResources: Record<string, number> = Object.fromEntries(
        processes.map(({ name }) => [name, 0])
    );

    const graph: Graph = {};

    for (const { name, allocatedResources, requestedResources } of processes) {
        for (const [resourceName, allocatedUnits] of Object.entries(
            allocatedResources
        )) {
            allocatedResources[name] += allocatedUnits;
            availableResources[resourceName] -= allocatedUnits;
        }

        for (const [resourceName, requestedUnits] of Object.entries(
            requestedResources
        )) {
            requestedResources[name] += requestedUnits;
            graph[resourceName] ||= [];
            graph[resourceName].push(name);
        }
    }

    const processesInCycle = new Set<string>();

    function detectCycle(processName: string, visitedProcesses: Set<string>) {
        if (processesInCycle.has(processName)) {
            visitedProcesses.add(processName);
            return true;
        }

        if (visitedProcesses.has(processName)) return false;

        visitedProcesses.add(processName);
        processesInCycle.add(processName);

        for (const resourceName of Object.keys(
            requestedResources[processName]
        )) {
            if (
                availableResources[resourceName] <
                requestedResources[processName][resourceName]
            ) {
                continue;
            }

            for (const neighbor of graph[resourceName]) {
                if (detectCycle(neighbor, visitedProcesses)) return true;
            }
        }

        processesInCycle.delete(processName);
        return false;
    }

    const deadlockedProcesses: Process[] = [];

    while (true) {
        let foundDeadlock = false;

        for (const process of processes) {
            if (!process.finished && !detectCycle(process.name, new Set())) {
                continue;
            }

            foundDeadlock = true;
            deadlockedProcesses.push(process);
            process.finished = true;

            for (const [resourceName, units] of Object.entries(
                process.allocatedResources
            )) {
                availableResources[resourceName] += units;
                allocatedResources[process.name] -= units;
            }
        }

        if (!foundDeadlock) break;
    }

    return deadlockedProcesses;
}
