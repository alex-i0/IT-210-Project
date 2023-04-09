import { firstComeFirtServe } from './firstComeFirstServe';
import { priorityScheduling } from './priorityScheduling';
import { roundRobin } from './roundRobin';
import { shortestJobFirst } from './shortestJobFirst';

describe('cpuSchedulingAlgorithms', () => {
    test('First Come First Serve Algorithm', () => {
        const processes = [
            { id: 1, serviceTime: 10 },
            { id: 2, serviceTime: 5 },
            { id: 3, serviceTime: 8 },
        ];

        expect(firstComeFirtServe(processes).avgWaitingTime).toBe(8.33);
        expect(firstComeFirtServe(processes).avgTurnaroundTime).toBe(16);
    });

    test('Shortest Job First Algorithm', () => {
        const processes = [
            { id: 1, serviceTime: 10 },
            { id: 2, serviceTime: 5 },
            { id: 3, serviceTime: 8 },
        ];

        expect(shortestJobFirst(processes).avgWaitingTime).toBe(6);
        expect(shortestJobFirst(processes).avgTurnaroundTime).toBe(13.67);
    });

    describe('Round Robin', () => {
        const processes = [
            { id: 1, arrivalTime: 0, burstTime: 10 },
            { id: 2, arrivalTime: 2, burstTime: 5 },
            { id: 3, arrivalTime: 3, burstTime: 15 },
            { id: 4, arrivalTime: 5, burstTime: 7 },
            { id: 5, arrivalTime: 6, burstTime: 12 },
        ];

        const roundRobinResults = roundRobin(processes);

        test('average waiting time', () => {
            expect(roundRobinResults.avgWaitingTime).toBe(28);
        });

        test('average turnaround time', () => {
            expect(roundRobinResults.avgTurnaroundTime).toBe(39.2);
        });
    });

    describe('Priority Scheduling', () => {
        const processes = [
            { processId: 1, burstTime: 5, arrivalTime: 0, priority: 3 },
            { processId: 2, burstTime: 3, arrivalTime: 1, priority: 1 },
            { processId: 3, burstTime: 6, arrivalTime: 2, priority: 4 },
            { processId: 4, burstTime: 2, arrivalTime: 3, priority: 2 },
        ];

        test('average waiting time', () => {
            expect(priorityScheduling(processes).avgWaitingTime).toBe(3);
        });

        test('average turnaround time', () => {
            expect(priorityScheduling(processes).avgTurnaroundTime).toBe(7);
        });
    });
});
