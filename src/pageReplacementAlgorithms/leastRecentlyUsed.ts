export const leastRecentlyUsed = (pages: number[], size: number): any => {
    const cache = new LRUCache<number>(size);
    let pageFaults = 0;

    for (const page of pages) {
        if (cache.get(page) === undefined) {
            cache.put(page, page);
            pageFaults++;
        }
    }

    return {
        pageFaults,
        cache,
    };
};

class LRUCache<T> {
    private cache: Map<number, number>;
    private counter: number;
    private stack: number[];

    constructor(private size: number) {
        this.cache = new Map<number, number>();
        this.counter = 0;
        this.stack = [];
    }

    private updateCounter(page: number) {
        this.counter++;
        this.cache.set(page, this.counter);
    }

    private removeLRU() {
        const lru = this.stack.shift();
        this.cache.delete(lru);
    }

    public put(page: number, value: number) {
        if (this.cache.has(page)) {
            this.updateCounter(page);
            return;
        }

        if (this.stack.length === this.size) {
            this.removeLRU();
        }

        this.stack.push(page);
        this.updateCounter(page);
        this.cache.set(page, value);
    }

    public get(page: number): any {
        if (this.cache.has(page)) {
            this.updateCounter(page);
            return this.cache.get(page);
        }
        return undefined;
    }
}
