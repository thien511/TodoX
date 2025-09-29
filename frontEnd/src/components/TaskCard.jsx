import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Input } from "./ui/input";

const TaskCard = ({ task, index, handleTaskChanged }) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("nhiệm vụ đã được xóa");
            handleTaskChanged();
        } catch (error) {
            console.error("lỗi xảy ra khi xóa task", error);
            toast.error("lỗi xảy ra khi xóa nhiệm vụ");
        }
    }

    const updateTask = async () => {
        try {
            await api.put(`/tasks/${task._id}`, { title: updateTaskTitle });
            toast.success(`nhiệm vụ đã đổi thành ${updateTaskTitle}`);
            handleTaskChanged();
        } catch (error) {
            console.error("lỗi xảy ra khi update task", error);
            toast.error("lỗi xảy ra khi cập nhật nhiệm vụ");
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if(task.status === 'active') {
                await api.put(`/tasks/${task._id}`, { status: 'complete', completedAt: new Date().toISOString(), });
                toast.success(`${task.title} đã hoàn thành`);
            }
            else {
                await api.put(`/tasks/${task._id}`, { status: 'active', completedAt: null, });
                toast.success(`${task.title} chưa hoàn thành`);
            }

            handleTaskChanged();
        } catch (error) {
            console.error("lỗi xảy ra khi cập nhật task", error);
            toast.error("lỗi xảy ra khi cập nhật nhiệm vụ");
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            updateTask();
        }
    }

    return (
        <Card className={cn(
            "group bg-gradient-card shadow-custom-md hover:shadow-custom-lg p-4 border-0 transition-all animate-fade-in duration-200",
            task.status === 'complete' && 'opacity-75'
        )}
            style={{ AnimationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-center gap-4">
                {/* circle button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 rounded-full size-8 transition-all duration-200",
                        task.status === 'complete' ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === 'complete' ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>
                {/* display or eidt navbar */}
                <div className="flex-1 min-w-0">
                    {isEditting ? (

                        <Input
                            placeholder="cần phải làm gì?"
                            className="flex-1 focus:border-primary/50 border-border/50 focus:ring-primary/20 h-12 text-base"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditting(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                        />
                    ) : (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === 'complete'
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                        )}>
                            {task.title}
                        </p>
                    )}
                    {/* create date and complete date */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-muted-foreground text-xs">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-muted-foreground text-xs"> - </span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-muted-foreground text-xs">
                                    {new Date(task.completedAt).toLocaleDateString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>


                <div className="hidden group-hover:inline-flex gap-2 animate-slide-up">
                    {/* edit button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 size-8 text-muted-foreground hover:text-info transition-color"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdateTaskTitle(task.title || "");
                        }}
                    >
                        <SquarePen className="size-4"></SquarePen>
                    </Button>
                    {/* delete button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 size-8 text-muted-foreground hover:text-destructive transition-color"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4"></Trash2>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;