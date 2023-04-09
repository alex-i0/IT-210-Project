export const firstComeFirtServe = (processes) => {
    let totalTimes = [processes[0].serviceTime];
    let waitingTimes = [0];
    const numberOfProcesses = processes.length;

    // Total time and Processing time for the remaining processes.
    for (let i = 1; i < numberOfProcesses; i++) {
        const totalTimeOfPreviousProcess = totalTimes[i - 1];
        const serviceTime = processes[i].serviceTime;

        waitingTimes[i] = totalTimeOfPreviousProcess;
        totalTimes[i] = waitingTimes[i] + serviceTime;
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
