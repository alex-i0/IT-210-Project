export const firstInFirstOut = (
    pages: number[],
    pageSize: number,
    memorySize: number
): any => {
    // Create an array to hold the pages
    let pageQueue: number[] = [];
    let pageFaults: number = 0;

    for (let i = 0; i < pages.length; i++) {
        // Check if page is already in memory
        if (pageQueue.indexOf(pages[i]) === -1) {
            // Check if memory is full
            if (pageQueue.length === memorySize / pageSize) {
                // Remove the first page in the queue (FIFO)
                pageQueue.shift();
            }
            // Add the new page to the end of the queue
            pageQueue.push(pages[i]);
            pageFaults++;
        }
    }

    console.log('Number of page faults: ' + pageFaults);
    console.log('Queue: ' + pageQueue);

    return {
        pageFaults,
        pageQueue,
    };
};
