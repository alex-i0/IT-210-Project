type rrProcess = {
    id: number;
    burstTime: number;
    arrivalTime: number;
};

export const roundRobin = (processes: Array<rrProcess>) => {
    let processQueue: Array<Omit<rrProcess, 'arrivalTime'>> = []; // the ready queue of processes
    let timeQuantum = 10; // the time slice for each process
    let currentTime = 0; // the current time of the simulation
    let waitingTime = {}; // dictionary to store the waiting time for each process
    let turnaroundTime = {}; // dictionary to store the turnaround time for each process
    let totalWaitingTime = 0; // total waiting time of all processes
    let totalTurnaroundTime = 0; // total turnaround time of all processes

    // Step 3: Calculate the waiting time for all the process id.
    while (processQueue.length > 0 || processes.length > 0) {
        // add newly arrived processes to the queue
        while (
            processes.length > 0 &&
            processes[0].arrivalTime <= currentTime
        ) {
            let newProcess = processes.shift();
            if (newProcess)
                processQueue.push({
                    id: newProcess.id,
                    burstTime: newProcess.burstTime,
                });
        }

        if (processQueue.length === 0) {
            // no process is ready yet, wait for the next one to arrive
            currentTime++;
            continue;
        }

        // execute the first process in the queue for the given time quantum
        let currentProcess = processQueue.shift();

        if (currentProcess) {
            let remainingTime = currentProcess.burstTime - timeQuantum;
            if (remainingTime > 0) {
                // the process needs more time, put it at the end of the queue
                processQueue.push({
                    id: currentProcess.id,
                    burstTime: remainingTime,
                });
            }

            // calculate the waiting time and turnaround time for the current process
            let currentWaitingTime =
                currentTime - (currentProcess.burstTime - remainingTime);
            waitingTime[currentProcess.id] = currentWaitingTime;
            totalWaitingTime += currentWaitingTime;
            turnaroundTime[currentProcess.id] =
                currentWaitingTime + currentProcess.burstTime;
            totalTurnaroundTime +=
                currentWaitingTime + currentProcess.burstTime;

            currentTime += timeQuantum; // advance the simulation time
        }
    }

    const numProcesses = Object.keys(waitingTime).length;
    const avgWaitingTime = totalWaitingTime / numProcesses;
    const avgTurnaroundTime = totalTurnaroundTime / numProcesses;

    console.log(
        `Average waiting time: ${avgWaitingTime}; Average turnaround time: ${avgTurnaroundTime}`
    );

    return {
        avgWaitingTime: parseFloat(avgWaitingTime.toFixed(2)),
        avgTurnaroundTime: parseFloat(avgTurnaroundTime.toFixed(2)),
    };
};
