class DisjointSet {
    constructor(n) {
        this.parent = new Array(n);
        this.rank = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
    }

    find(u) {
        if (this.parent[u] !== u) {
            this.parent[u] = this.find(this.parent[u]); // Path compression
        }
        return this.parent[u];
    }

    union(u, v) {
        const rootU = this.find(u);
        const rootV = this.find(v);

        if (rootU !== rootV) {
            // Union by rank
            if (this.rank[rootU] > this.rank[rootV]) {
                this.parent[rootV] = rootU;
            } else if (this.rank[rootU] < this.rank[rootV]) {
                this.parent[rootU] = rootV;
            } else {
                this.parent[rootV] = rootU;
                this.rank[rootU]++;
            }
        }
    }
}

function kruskal(vertices, edges) {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    const ds = new DisjointSet(vertices);
    const mst = [];

    for (const edge of edges) {
        const { u, v, weight } = edge;
        // If u and v are in different sets, include this edge in the MST
        if (ds.find(u) !== ds.find(v)) {
            ds.union(u, v);
            mst.push(edge);
        }
    }

    return mst;
}

// Example usage
const vertices = 4;
const edges = [
    { u: 0, v: 1, weight: 10 },
    { u: 0, v: 2, weight: 6 },
    { u: 0, v: 3, weight: 5 },
    { u: 1, v: 3, weight: 15 },
    { u: 2, v: 3, weight: 4 }
];

console.log("Minimum Spanning Tree:", kruskal(vertices, edges));
