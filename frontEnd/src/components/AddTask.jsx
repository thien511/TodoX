import React, { useState } from "react";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", { title: newTaskTitle });
                toast.success(`nhiệm vụ ${newTaskTitle} đã được thêm vào`);
                handleNewTaskAdded();
            } catch (error) {
                console.error("lỗi xảy ra khi thêm task", error);
                toast.error("lỗi xảy ra khi thêm nhiệm vụ mới");
            }

            setNewTaskTitle("");
        }
        else {
            toast.error("bạn cần nhập nội dung của nhiệm vụ!");
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter") {
            addTask();
        }
    }

    return (
        <Card className="bg-gradient-card shadow-custom-lg p-6 border-0">
            <div className="flex sm:flex-row flex-col gap-3">
                <Input type="text"
                    placeholder="cần phải làm gì?"
                    className="sm:flex-1 bg-slate-50 p-3 border focus:border-primary/80 rounded-[5px] outline-none focus:ring-2 focus:ring-primary/50 h-12 text-primary text-base"
                    value={newTaskTitle}
                    onChange={(even) => setNewTaskTitle(even.target.value)}
                    onKeyPress = {handleKeyPress}
                />

                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={() => addTask()}
                >
                    <Plus className="size-5" />
                    thêm
                </Button>
            </div >
        </Card >
    );
};

export default AddTask;