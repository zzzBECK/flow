"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { v4 as uuidv4 } from "uuid";

type QuestionNodeData = {
  label: string;
  options: Array<{
    id: string;
    text: string;
  }>;
};

export function QuestionNode({
  data,
  isConnectable,
  id,
}: NodeProps<QuestionNodeData>) {
  const [nodeData, setNodeData] = useState<QuestionNodeData>(data);

  const updateLabel = useCallback((newLabel: string) => {
    setNodeData((prev) => ({ ...prev, label: newLabel }));
    // In a real app, you'd update the node data in the parent component
  }, []);

  const updateOptionText = useCallback((optionId: string, text: string) => {
    setNodeData((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, text } : opt
      ),
    }));
    // In a real app, you'd update the node data in the parent component
  }, []);

  const addOption = useCallback(() => {
    setNodeData((prev) => ({
      ...prev,
      options: [...prev.options, { id: uuidv4(), text: "New Option" }],
    }));
    // In a real app, you'd update the node data in the parent component
  }, []);

  const removeOption = useCallback((optionId: string) => {
    setNodeData((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt.id !== optionId),
    }));
    // In a real app, you'd update the node data in the parent component
  }, []);

  return (
    <Card className="min-w-[250px] max-w-[300px] border-2 border-blue-200">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />

      <CardHeader className="p-3 pb-0">
        <Input
          value={nodeData.label}
          onChange={(e) => updateLabel(e.target.value)}
          className="font-medium text-base border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter question..."
        />
      </CardHeader>

      <CardContent className="p-3 space-y-2 relative">
        {nodeData.options.map((option, index) => (
          <div
            key={option.id}
            className="flex items-center space-x-2"
            style={{ position: "relative" }}
          >
            <Input
              value={option.text}
              onChange={(e) => updateOptionText(option.id, e.target.value)}
              className="text-sm"
              placeholder={`Option ${index + 1}`}
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-500"
              onClick={() => removeOption(option.id)}
              disabled={nodeData.options.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>

            <Handle
              id={`handle-${option.id}`}
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="w-2 h-2 bg-blue-500 absolute right-[-16px] top-1/2"
            />
          </div>
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-blue-500 hover:text-blue-700 hover:bg-blue-50"
          onClick={addOption}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Option
        </Button>
      </CardContent>
    </Card>
  );
}
