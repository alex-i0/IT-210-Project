export const lastFrequentlyUsed = (pages: number[], size: number): any => {
    const cache = new LFUCache<number>(size);
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

class LFUCache<T> {
    private cache: Map<number, T>;
    private counters: Map<number, number>;
    private stack: number[];

    constructor(private size: number) {
        this.cache = new Map<number, T>();
        this.counters = new Map<number, number>();
        this.stack = [];
    }

    private getLFU(): number {
        let minCount = Number.MAX_VALUE;
        let lfu = 0;
        for (const [page, count] of this.counters.entries()) {
            if (count < minCount) {
                minCount = count;
                lfu = page;
            }
        }
        return lfu;
    }

    private removeLFU() {
        const lfu = this.getLFU();
        this.stack.splice(this.stack.indexOf(lfu), 1);
        this.cache.delete(lfu);
        this.counters.delete(lfu);
    }

    private updateCounter(page: number) {
        const count = this.counters.get(page) ?? 0;
        this.counters.set(page, count + 1);
    }

    public put(page: number, value: T) {
        if (this.cache.has(page)) {
            this.updateCounter(page);
            return;
        }

        if (this.stack.length === this.size) {
            this.removeLFU();
        }

        this.stack.push(page);
        this.updateCounter(page);
        this.cache.set(page, value);
    }

    public get(page: number): T | undefined {
        if (this.cache.has(page)) {
            this.updateCounter(page);
            return this.cache.get(page);
        }
        return undefined;
    }
}
