import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState('all');
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    // useEffect(() => {
    //     setPage(1);
    // }, [filter, dateQuery]);

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount);
            console.log(res.data);
        } catch (error) {
            console.error("error while fetching tasks", error);
            toast.error("error while fetching tasks");
        }
    };

    const handleTaskChanged = () => {
        fetchTasks();
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "complete";
            default:
                return true;
        }
    });

    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    if (visibleTasks.length === 0) {
        handlePrev();
    };

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    return (
        <>
            <div className="relative bg-[#fefcff] w-full min-h-screen">
                {/* Dreamy Sky Pink Glow */}
                <div
                    className="z-0 absolute inset-0"
                    style={{
                        backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                    }}
                />
                {/* Your Content/Components */}
                <div className="z-10 relative mx-auto pt-8 container">
                    <div className="space-y-6 mx-auto p-6 w-full max-w-2xl">
                        {/* header */}
                        <Header />

                        {/* create mission */}
                        <AddTask handleNewTaskAdded={handleTaskChanged} />

                        {/* Stats and filter */}
                        <StatsAndFilter activeTaskCount={activeTaskCount}
                            completedTaskCount={completeTaskCount}
                            filter={filter}
                            setFilter={setFilter}
                        />

                        {/* list of mission */}
                        <TaskList filteredTasks={visibleTasks}
                            filter={filter}
                            handleTaskChanged={handleTaskChanged}
                        />

                        {/* phân trang và lọc theo Date */}
                        <div className="flex sm:flex-row flex-col justify-between items-center gap-6">
                            <TaskListPagination
                                handleNext={handleNext}
                                handlePrev={handlePrev}
                                handlePageChange={handlePageChange}
                                page={page}
                                totalPages={totalPages}
                            />
                            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                        </div>

                        {/*  */}
                        <Footer activeTaskCount={activeTaskCount}
                            completedTaskCount={completeTaskCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;