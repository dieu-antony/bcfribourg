import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import * as ical from "node-ical";
import { parseCalendar } from "~/lib/utils/parseCalender";

const admin = () => {
  function convertICS(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target?.result;
      if (typeof content !== "string") return;
      const data = ical.sync.parseICS(content);
      const events = parseCalendar(data);
      console.log(events);
    };
    reader.readAsText(file);
  }

  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <>
        <div>admin</div>
        {JSON.stringify(data.user, null, 2)}
        
          <div>
            <input type="file" onChange={convertICS} multiple />
          </div>
      </>
    );
  }
};

export default admin;
