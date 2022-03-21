import React, { useState, useEffect } from "react";
import { List, Space } from "antd";
import { HeartTwoTone, MessageOutlined } from "@ant-design/icons";
import axios from "axios";
import { MountainHeight, MountainName } from "./Search.style";
import { Link } from "react-router-dom";

const MountainList = () => {
  // 추후 좋아요 & 댓글 수 반영하기

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const [mountains, setMountains] = useState(undefined);

  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      const response = await axios.get("/mountains");
      if (!completed) {
        setMountains(response.data.content);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, []);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{ pageSize: 5 }}
        dataSource={mountains}
        renderItem={(item) => (
          <List.Item
            key={item.mountainNo}
            actions={[
              <IconText
                icon={HeartTwoTone}
                text="156"
                key="list-vertical-star-o"
              />,

              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img width={300} height={180} alt="mountain" src={item.orgUrl} />
            }
          >
            <List.Item.Meta
              title={
                <span>
                  <MountainName>
                    <Link
                      to={{ pathname: `/mountain/search/${item.mountainNo}` }}
                    >
                      {item.mountainName}
                    </Link>
                  </MountainName>
                  <MountainHeight>{item.mountainHeight}m</MountainHeight>
                </span>
              }
              description={item.addressDetail}
            />
            {item.mountainSum?.length > 100
              ? item.mountainSum.slice(0, 100) + "..."
              : item.mountainSum}
          </List.Item>
        )}
      />
    </>
  );
};

export default MountainList;
