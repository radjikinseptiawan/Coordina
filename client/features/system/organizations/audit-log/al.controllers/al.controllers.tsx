"use client";

import {
  Activity,
  Calendar,
  Search,
  UserPlus,
  Pencil,
  Trash2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const logs = [
  {
    id: 1,
    actor: "Pirah",
    type: "JOIN",
    action: "joined organization",
    time: "13:20 WIB",
    date: "Today",
  },
  {
    id: 2,
    actor: "Secretary General",
    type: "CREATE",
    action: "created agenda",
    detail: "Workshop React Advanced",
    time: "13:00 WIB",
    date: "Today",
  },
  {
    id: 3,
    actor: "Chairman",
    type: "UPDATE",
    action: "updated organization settings",
    detail: "Organization description updated",
    time: "12:30 WIB",
    date: "Today",
  },
  {
    id: 4,
    actor: "Treasurer",
    type: "DELETE",
    action: "deleted agenda",
    detail: "Weekly Evaluation Meeting",
    time: "Yesterday",
    date: "Yesterday",
  },
];

function getBadge(type: string) {
  switch (type) {
    case "CREATE":
      return <Badge className="bg-green-500 hover:bg-green-500">CREATE</Badge>;

    case "UPDATE":
      return <Badge className="bg-blue-500 hover:bg-blue-500">UPDATE</Badge>;

    case "DELETE":
      return <Badge variant="destructive">DELETE</Badge>;

    case "JOIN":
      return <Badge className="bg-violet-500 hover:bg-violet-500">JOIN</Badge>;

    default:
      return <Badge>{type}</Badge>;
  }
}

function getIcon(type: string) {
  switch (type) {
    case "JOIN":
      return <UserPlus size={18} />;

    case "CREATE":
      return <Calendar size={18} />;

    case "UPDATE":
      return <Pencil size={18} />;

    case "DELETE":
      return <Trash2 size={18} />;

    default:
      return <Activity size={18} />;
  }
}

export default function AuditLogPage() {
  return (
    <div className="space-y-6 p-8">
      {/* STATISTIC */}

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-muted-foreground text-sm">Total Activities</p>

          <h2 className="mt-2 text-3xl font-bold">124</h2>
        </Card>

        <Card className="p-5">
          <p className="text-muted-foreground text-sm">Members</p>

          <h2 className="mt-2 text-3xl font-bold">15</h2>
        </Card>

        <Card className="p-5">
          <p className="text-muted-foreground text-sm">Today</p>

          <h2 className="mt-2 text-3xl font-bold">3</h2>
        </Card>

        <Card className="p-5">
          <p className="text-muted-foreground text-sm">This Week</p>

          <h2 className="mt-2 text-3xl font-bold">8</h2>
        </Card>
      </div>

      {/* SEARCH */}

      <Card className="p-4">
        <div className="relative">
          <Search
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
            size={16}
          />

          <Input placeholder="Search activity..." className="pl-10" />
        </div>
      </Card>

      {/* TIMELINE */}

      <Card className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Activity Timeline</h2>

          <p className="text-sm text-muted-foreground">
            Latest organization activities
          </p>
        </div>

        <div className="space-y-8">
          {logs.map((log, index) => (
            <div key={log.id} className="flex gap-4">
              {/* TIMELINE */}

              <div className="flex flex-col items-center">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    bg-background
                  "
                >
                  {getIcon(log.type)}
                </div>

                {index !== logs.length - 1 && (
                  <div
                    className="
                      mt-2
                      h-full
                      w-px
                      bg-border
                    "
                  />
                )}
              </div>

              {/* CONTENT */}

              <div className="flex-1 pb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold">{log.actor}</p>

                  {getBadge(log.type)}
                </div>

                <p className="mt-2 text-base">{log.action}</p>

                {log.detail && (
                  <div
                    className="
                      mt-3
                      rounded-lg
                      border
                      bg-muted/40
                      p-3
                    "
                  >
                    <p className="text-sm">{log.detail}</p>
                  </div>
                )}

                <p
                  className="
                    mt-3
                    text-sm
                    text-muted-foreground
                  "
                >
                  {log.date} • {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Button variant="outline" className="w-full">
        Load More Activities
      </Button>
    </div>
  );
}
