import React from "react";
import { Tabs } from "antd";
import MyMountains from "./MyMountains";
import MyComments from "./MyComments";
import MyPosts from "./MyPosts";

const My = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="찜한 산" key="1">
          <MyMountains />
        </TabPane>
        <TabPane tab="작성한 글" key="2">
          <MyPosts />
        </TabPane>
        <TabPane tab="작성한 댓글" key="3">
          <MyComments />
        </TabPane>
      </Tabs>
    </>
  );
};

export default My;
