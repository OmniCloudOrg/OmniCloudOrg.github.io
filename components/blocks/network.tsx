"use client";

import React, { useState, useEffect, useMemo, memo } from "react";

type NodeType = "master" | "controller" | "worker";
type ConnectionType = "master-controller" | "controller-worker";

interface NodeStats {
  cpu: string;
  memory: string;
  uptime: string;
  tasks: number;
  connections: number;
}

interface Node {
  id: string;
  x: number;
  y: number;
  type: NodeType;
  stats: NodeStats;
}

interface Connection {
  id: string;
  master?: Node;
  controller: Node;
  worker?: Node;
  type: ConnectionType;
}

interface MousePosition {
  x: number;
  y: number;
}

// Constants
const CONFIG = {
  GRID: {
    ROWS: 4,
    COLS: 4,
    NODE_SPACING: 150,
    NODE_SIZE: 30,
    HOVER_BOX_SIZE: 60,
  },
  COLORS: {
    MASTER: "#990000",
    CONTROLLER: "#0e6600",
    WORKER: "#000077",
  },
  ANIMATION: {
    PARTICLE_DURATION: 3,
    HOVER_ANIMATION_DURATION: 1.5,
    NUM_PARTICLES: 2,
  },
} as const;

// Helper Functions
const generateNodeStats = (type: NodeType): NodeStats => {
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    cpu: `${rand(10, 85)}%`,
    memory: `${rand(20, 90)}%`,
    uptime: `${rand(95, 99)}.${rand(10, 99)}%`,
    tasks: rand(5, type === "worker" ? 50 : 200),
    connections: rand(
      type === "worker" ? 2 : 10,
      type === "master" ? 100 : 50
    ),
  };
};

const getNodeDescription = (type: NodeType): string => {
  switch (type) {
    case "master":
      return "Primary control plane node managing the entire cluster. Handles API requests, scheduling, and cluster state management.";
    case "controller":
      return "Regional controller managing worker node subset. Handles service discovery, load balancing, and regional orchestration.";
    case "worker":
      return "Compute node running containerized workloads. Executes tasks, manages local storage, and handles network routing.";
  }
};

const getNodeColor = (type: NodeType, gradient = false): string => {
  const baseColor = CONFIG.COLORS[type.toUpperCase() as keyof typeof CONFIG.COLORS];
  if (gradient) {
    return `url(#${type}-gradient)`;
  }
  return baseColor;
};

// Memoized Components
const Tooltip = memo(({ node, stats, mousePosition }: { node: Node; stats: NodeStats; mousePosition: MousePosition }) => (
  <div
    className="fixed z-50 w-72 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl p-4"
    style={{
      left: mousePosition.x + 20,
      top: mousePosition.y,
    }}
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="text-white font-medium">{node.id}</h3>
        <p className="text-cyan-400 text-sm">{node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node</p>
      </div>
      <div className="px-2 py-1 bg-slate-800 rounded text-xs text-emerald-400">Active</div>
    </div>

    <div className="space-y-2 mb-3">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <span className="text-white text-sm font-medium">{value.toString()}</span>
        </div>
      ))}
    </div>

    <p className="text-slate-300 text-sm">{getNodeDescription(node.type)}</p>
  </div>
));

const NetworkNode = memo(({ node, color, isHovered, onHover }: { node: Node; color: string; isHovered: boolean; onHover: (node: Node | null) => void }) => {
    const cubePath = useMemo(() => {
      const s = CONFIG.GRID.NODE_SIZE;
      const front = `M ${-s} ${s / 2} l ${s} ${-s / 2} l ${s} ${s / 2} l 0 ${s} l ${-s} ${s / 2} l ${-s} ${-s / 2} Z`;
      const top = `M ${-s} ${s / 2} l ${s} ${-s / 2} l ${s} ${s / 2} l ${-s} ${s / 2} Z`;
      const side = `M ${s} ${s / 2} l 0 ${s} l ${-s} ${s / 2} l 0 ${-s} Z`;
      return { front, top, side };
    }, []);
  
    return (
      <g
        transform={`translate(${node.x} ${node.y})`}
        className="cursor-pointer"
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Node cube with sides */}
        <path d={cubePath.front} fill={color} opacity="0.8" />
        <path d={cubePath.top} fill={color} opacity="0.6" />
        <path d={cubePath.side} fill={color} opacity="0.4" />
  
        {/* Hover box */}
        <rect
          x={-CONFIG.GRID.HOVER_BOX_SIZE / 2}
          y={-CONFIG.GRID.HOVER_BOX_SIZE / 2}
          width={CONFIG.GRID.HOVER_BOX_SIZE}
          height={CONFIG.GRID.HOVER_BOX_SIZE}
          fill="transparent"
          className="opacity-0 hover:opacity-10"
          stroke={color}
          strokeWidth="1"
        />
  
        {/* Center dot */}
        <circle cx="0" cy="0" r="2" fill={color} />
  
        {/* Hover effect */}
        {isHovered && (
          <rect
            x={-CONFIG.GRID.HOVER_BOX_SIZE / 2}
            y={-CONFIG.GRID.HOVER_BOX_SIZE / 2}
            width={CONFIG.GRID.HOVER_BOX_SIZE}
            height={CONFIG.GRID.HOVER_BOX_SIZE}
            fill="transparent"
            stroke={color}
            strokeWidth="1"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.3;0.1"
              dur={`${CONFIG.ANIMATION.HOVER_ANIMATION_DURATION}s`}
              repeatCount="indefinite"
            />
          </rect>
        )}
      </g>
    );
  });
  

const IsometricNetwork: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate nodes
  const { workerNodes, controllerNodes, masterNode, connections } = useMemo(() => {
    const workers: Node[] = [];
    for (let r = 0; r < CONFIG.GRID.ROWS; r++) {
      for (let c = 0; c < CONFIG.GRID.COLS; c++) {
        workers.push({
          id: `worker-${r + 1}-${c + 1}`,
          x: c * CONFIG.GRID.NODE_SPACING + 300,
          y: r * CONFIG.GRID.NODE_SPACING + 100,
          type: "worker",
          stats: generateNodeStats("worker"),
        });
      }
    }

    const controllers: Node[] = Array.from({ length: CONFIG.GRID.ROWS }, (_, i) => ({
      id: `controller-${i + 1}`,
      x: 150,
      y: i * CONFIG.GRID.NODE_SPACING + 100,
      type: "controller",
      stats: generateNodeStats("controller"),
    }));

    const master: Node = {
      id: "master-1",
      x: 150,
      y: 20,
      type: "master",
      stats: generateNodeStats("master"),
    };

    // Generate connections
    const conns: Connection[] = [];
    controllers.forEach((controller, ri) => {
      const rowWorkers = workers.filter((_, i) => Math.floor(i / CONFIG.GRID.COLS) === ri);
      rowWorkers.forEach((worker) => {
        conns.push({
          id: `${controller.id}-${worker.id}`,
          controller,
          worker,
          type: "controller-worker",
        });
      });
    });
    controllers.forEach((controller) => {
      conns.push({
        id: `master-${controller.id}`,
        master,
        controller,
        type: "master-controller",
      });
    });

    return { workerNodes: workers, controllerNodes: controllers, masterNode: master, connections: conns };
  }, []);

  return (
    <div>
      <svg className="w-full h-[720px]">
        <defs>
          {["master", "controller", "worker"].map((type) => (
            <linearGradient
              key={type}
              id={`${type}-gradient`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={CONFIG.COLORS[type.toUpperCase() as keyof typeof CONFIG.COLORS]} />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
          ))}
        </defs>

        {/* Nodes */}
        {masterNode && (
          <NetworkNode
            node={masterNode}
            color={getNodeColor(masterNode.type, true)}
            isHovered={hoveredNode?.id === masterNode.id}
            onHover={setHoveredNode}
          />
        )}
        {controllerNodes.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            color={getNodeColor(node.type, true)}
            isHovered={hoveredNode?.id === node.id}
            onHover={setHoveredNode}
          />
        ))}
        {workerNodes.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            color={getNodeColor(node.type, true)}
            isHovered={hoveredNode?.id === node.id}
            onHover={setHoveredNode}
          />
        ))}

        {/* Connections */}
        {connections.map((conn) => {
          const source = conn.controller;
          const target = conn.worker || conn.master;

          return (
            <g key={conn.id}>
              {/* Connection line */}
              <path
                d={`M${source.x},${source.y} L${target?.x},${target?.y}`}
                stroke={getNodeColor(conn.controller.type)}
                strokeWidth="1"
                opacity="0.7"
              />

              {/* Traffic flow animation */}
              <circle r="3" fill={getNodeColor(conn.controller.type)}>
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={`M${source.x},${source.y} L${target?.x},${target?.y}`}
                />
              </circle>
            </g>
          );
        })}

      </svg>

      {/* Tooltip */}
      {hoveredNode && hoveredNode.stats && (
        <Tooltip node={hoveredNode} stats={hoveredNode.stats} mousePosition={mousePosition} />
      )}
    </div>
  );
};

export default IsometricNetwork;
