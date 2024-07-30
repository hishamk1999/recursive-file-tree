import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

type Node = {
  name: string;
  nodes?: Node[];
};

const nodes: Node[] = [
  {
    name: "Home",
    nodes: [
      {
        name: "Movies",
        nodes: [
          {
            name: "Action",
            nodes: [
              {
                name: "2000s",
                nodes: [
                  { name: "Gladiator.mp4" },
                  { name: "American-Beauty.mp4" },
                ],
              },
              { name: "2010s", nodes: [] },
            ],
          },
          { name: "Comedy", nodes: [{ name: "2000s", nodes: [] }] },
        ],
      },
      {
        name: "Music",
        nodes: [
          { name: "Rock", nodes: [] },
          { name: "Classical", nodes: [] },
        ],
      },
      { name: "Pictures", nodes: [] },
      { name: "Documents", nodes: [] },
      { name: "Password.txt" },
    ],
  },
];

function App() {
  return (
    <div className="min-w-96 h-full bg-white text-black rounded-md py-2 px-3">
      <ul>
        {nodes.map((node) => (
          <FileSystemItem node={node} key={node.name} />
        ))}
      </ul>
    </div>
  );
}

function FileSystemItem({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="my-1.5" key={node.name}>
      <span className="flex items-center gap-1.5">
        {node.nodes && node.nodes.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRightIcon
              className={`size-4 text-gray-500 ${isOpen && "rotate-90"}`}
            />
          </button>
        )}

        {node.nodes ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${
              node.nodes.length === 0 && "ml-[22px]"
            }`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6 text-gray-900" />
        )}
        {/* Folder name */}
        {node.name}
      </span>
      {isOpen && (
        <ul className="pl-6">
          {/* If folder contains subfolders, display arrow */}
          {node.nodes?.map((node) => (
            <FileSystemItem node={node} key={node.name} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default App;
