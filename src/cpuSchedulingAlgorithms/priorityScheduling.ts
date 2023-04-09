interface Process {
    processId: number;
    burstTime: number;
    arrivalTime: number;
    priority: number;
    waitingTime?: number;
}

export const priorityScheduling = (processes: Process[]) => {
    // Sort processes based on priority
    processes.sort((a: Process, b: Process) => {
        return a.priority - b.priority;
    });

    let currentTime = 0; // Current time
    let waitingTime = 0; // Waiting time
    let turnaroundTime = 0; // Turnaround time
    let completionTime = 0; // Completion time
    const n = processes.length; // Number of processes

    // Calculate completion time, waiting time, and turnaround time for each process
    for (let i = 0; i < n; i++) {
        // Find process with highest priority that has arrived
        let highestPriority = i;
        for (let j = i + 1; j < n; j++) {
            if (
                processes[j].arrivalTime <= currentTime &&
                processes[j].priority < processes[highestPriority].priority
            ) {
                highestPriority = j;
            }
        }

        // Update current time
        currentTime = currentTime + processes[highestPriority].burstTime;

        // Calculate completion time for current process
        completionTime = currentTime;

        // Calculate waiting time for current process
        waitingTime =
            waitingTime +
            (completionTime -
                processes[highestPriority].burstTime -
                processes[highestPriority].arrivalTime);

        // Calculate turnaround time for current process
        turnaroundTime =
            turnaroundTime +
            (completionTime - processes[highestPriority].arrivalTime);

        // Swap current process with highest priority process
        const temp = processes[i];
        processes[i] = processes[highestPriority];
        processes[highestPriority] = temp;

        // Update waiting time for current process
        processes[i].waitingTime =
            completionTime - processes[i].burstTime - processes[i].arrivalTime;
    }

    // Calculate average waiting time and turnaround time
    const avgWaitingTime = waitingTime / n;
    const avgTurnaroundTime = turnaroundTime / n;

    console.log(`Average Waiting Time: ${avgWaitingTime.toFixed(2)}`);
    console.log(`Average Turnaround Time: ${avgTurnaroundTime.toFixed(2)}`);

    return {
        avgWaitingTime: parseFloat(avgWaitingTime.toFixed(2)),
        avgTurnaroundTime: parseFloat(avgTurnaroundTime.toFixed(2)),
    };
};
