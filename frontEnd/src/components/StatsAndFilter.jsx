import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilter = ({completedTaskCount = 0, activeTaskCount = 0, filter = "all", setFilter}) => {
    return (
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
            {/* stats */}
            <div className="flex gap-3">
                <Badge
                    variant="secondary"
                    className="bg-white/50 border-info/20 text-accent-foreground"
                >
                    {activeTaskCount} {FilterType.active}
                </Badge>
                <Badge
                    variant="secondary"
                    className="bg-white/50 border-success/20 text-success"
                >
                    {completedTaskCount} {FilterType.completed}
                </Badge>
            </div>

            {/* filter */}
            <div className="flex sm:flex-row flex-col gap-2">
                {Object.keys(FilterType).map((type) => (
                    <Button
                        key={type}
                        variant={filter === type ? "gradient" : "ghost"}
                        size="sm"
                        className="capitalize"
                        onClick= {() => setFilter(type)}
                    >
                        <Filter className="size-4"/>
                        {FilterType[type]}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default StatsAndFilter;