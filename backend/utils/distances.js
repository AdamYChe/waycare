// backend/utils/astar.js

class Point3D {
    constructor(x, y, z, id = null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id || `${x},${y},${z}`;
    }

    distanceTo(other) {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) +
            Math.pow(this.y - other.y, 2) +
            Math.pow(this.z - other.z, 2)
        );
    }

    equals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
}

class Graph3D {
    constructor() {
        this.nodes = new Map(); // Map of node.id -> node
        this.edges = new Map(); // Map of node.id -> array of {neighbor, weight}
    }

    addNode(point) {
        if (!this.nodes.has(point.id)) {
            this.nodes.set(point.id, point);
            this.edges.set(point.id, []);
        }
    }

    addEdge(point1, point2, weight = null) {
        this.addNode(point1);
        this.addNode(point2);

        const actualWeight = weight !== null ? weight : point1.distanceTo(point2);

        this.edges.get(point1.id).push({ neighbor: point2, weight: actualWeight });
        this.edges.get(point2.id).push({ neighbor: point1, weight: actualWeight });
    }

    getNeighbors(point) {
        return this.edges.get(point.id) || [];
    }

    getNode(id) {
        return this.nodes.get(id);
    }

    getAllNodes() {
        return Array.from(this.nodes.values());
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

function heuristic(point1, point2) {
    // Euclidean distance
    return point1.distanceTo(point2);
}

function aStar(graph, startPoint, endPoint) {
    const start = typeof startPoint === 'string' ? graph.getNode(startPoint) : startPoint;
    const end = typeof endPoint === 'string' ? graph.getNode(endPoint) : endPoint;

    if (!start || !end) {
        throw new Error('Start or end point not found in graph');
    }

    const openSet = new PriorityQueue();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    // Initialize all nodes with infinity
    for (const node of graph.getAllNodes()) {
        gScore.set(node.id, Infinity);
        fScore.set(node.id, Infinity);
    }

    // Initialize start node
    gScore.set(start.id, 0);
    fScore.set(start.id, heuristic(start, end));
    openSet.enqueue(start, fScore.get(start.id));

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue().val;

        // Goal reached
        if (current.equals(end)) {
            return reconstructPath(cameFrom, current);
        }

        // Explore neighbors
        const neighbors = graph.getNeighbors(current);
        for (const { neighbor, weight } of neighbors) {
            const tentativeGScore = gScore.get(current.id) + weight;

            if (tentativeGScore < gScore.get(neighbor.id)) {
                cameFrom.set(neighbor.id, current);
                gScore.set(neighbor.id, tentativeGScore);
                fScore.set(neighbor.id, tentativeGScore + heuristic(neighbor, end));
                openSet.enqueue(neighbor, fScore.get(neighbor.id));
            }
        }
    }

    // No path found
    return null;
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(current.id)) {
        current = cameFrom.get(current.id);
        path.unshift(current);
    }
    return path;
}

// Helper function to create a grid-based graph
function createGridGraph(width, height, depth, obstacles = []) {
    const graph = new Graph3D();
    const obstacleSet = new Set(obstacles.map(o => `${o.x},${o.y},${o.z}`));

    // Create all nodes
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            for (let z = 0; z < depth; z++) {
                const id = `${x},${y},${z}`;
                if (!obstacleSet.has(id)) {
                    graph.addNode(new Point3D(x, y, z, id));
                }
            }
        }
    }

    // Create edges (6-connected: up, down, left, right, forward, backward)
    const directions = [
        [1, 0, 0], [-1, 0, 0],
        [0, 1, 0], [0, -1, 0],
        [0, 0, 1], [0, 0, -1]
    ];

    for (const node of graph.getAllNodes()) {
        for (const [dx, dy, dz] of directions) {
            const neighborId = `${node.x + dx},${node.y + dy},${node.z + dz}`;
            const neighbor = graph.getNode(neighborId);
            if (neighbor) {
                graph.addEdge(node, neighbor);
            }
        }
    }

    return graph;
}

module.exports = {
    Point3D,
    Graph3D,
    aStar,
    createGridGraph
};