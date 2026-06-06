"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  acceptInvite,
  receiveInvite,
} from "@/service/organizations/members.service";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import CardsInvitations from "./mi.component/mi.cards";

export default function InboxMenuDashboardTemplate() {
  const [data, setData] = useState([]);
  const receivedInbox = async () => {
    const response = await receiveInvite();
    setData(response.response.data);
  };
  useEffect(() => {
    receivedInbox();
  }, []);
  console.log("ini data nya coy", data);
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <Card>
          <CardContent className="w-80 md:w-xl">
            <CardTitle>Inbox</CardTitle>
            <hr />

            <div className="my-2">
              {data.length > 0 ? (
                <CardsInvitations data={data} />
              ) : (
                <div>
                  <h1>Its still empty!</h1>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
