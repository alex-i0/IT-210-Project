export const shortestJobFirst = (processes) => {
    // Waiting time of first short process as 0 and total time of first short is process the service time of that process.
    const sortedProcesses = sortProcesses(processes);
    let totalTimes = [sortedProcesses[0].serviceTime];
    let waitingTimes = [0];
    const numberOfProcesses = processes.length;

    // Calculate the total time and waiting time of remaining process.
    for (let i = 1; i < numberOfProcesses; i++) {
        const processTotalTime = totalTimes[i - 1];
        const processServiceTime = sortedProcesses[i].serviceTime;

        waitingTimes[i] = processTotalTime;
        totalTimes[i] = waitingTimes[i] + processServiceTime;
    }

    const totalWaitingTime = calculateTotalTime(waitingTimes);
    const totalTurnaroundTime = calculateTotalTime(totalTimes);

    const avgWaitingTime = totalWaitingTime / numberOfProcesses;
    const avgTurnaroundTime = totalTurnaroundTime / numberOfProcesses;

    console.log(
        `Average Waiting Time: ${avgWaitingTime}; Average Turnaround Time: ${avgTurnaroundTime}`
    );

    return {
        avgWaitingTime: parseFloat(avgWaitingTime.toFixed(2)),
        avgTurnaroundTime: parseFloat(avgTurnaroundTime.toFixed(2)),
    };
};

const calculateTotalTime = (times) => times.reduce((acc, val) => acc + val, 0);

const sortProcesses = (processes) =>
    processes.slice().sort((a, b) => a.serviceTime - b.serviceTime);
