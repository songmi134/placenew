import React, { useState, useEffect } from 'react';
import { Button, Row, Layout, Form, Input, Radio } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Title,
  MainContainer,
  SubContainer,
  CateContainer,
  CommunityTable,
} from './Community.style';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';


const Community = () => {
  const { Content } = Layout;
  const { Search } = Input;

  const columns = [
    {
      title: 'No',
      dataIndex: 'commupostNo',
      sorter: {
        compare: (a, b) => a.commupostNo - b.commupostNo,
        multiple: 3,
      },
    },
    {
      title: '제목',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={{ pathname: `/pages/community/${record.commupostNo}` }}>
          {text}
        </Link>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'user',
      render: text => text?.name,
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      sorter: {
        compare: (a, b) => moment(a.createdAt) - moment(b.createdAt),
        multiple: 2,
      },
    },
    {
      title: '조회수',
      dataIndex: 'viewCount',
      sorter: {
        compare: (a, b) => a.viewCount - b.viewCount,
        multiple: 1,
      },
    },
  ];

  const [allPosts, setAllPosts] = useState([]);
  const [categories, setCategories] = useState(undefined);
  const [cateId, setCateId] = useState(undefined);
  const [userInput, setUserInput] = useState('');
  const [totalPostsCount, setTotalPostsCount] = useState(0);

  // TODO : 데이터 가져오는 것을 hook으로 만들기 (custom hook) - 반복되는 부분 없애기
  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      try {
        const response = await axios.get('/communities', {
          params: { title: userInput },
        });
        if (!completed) {
          const posts = response.data.content.map(p => {
            p.createdAt = moment(p.createdAt).format('YYYY.MM.DD');
            return p;
          });
          setAllPosts(posts);
        }
      } catch (err) {
        setAllPosts(undefined);
        console.log(err);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, [userInput]);

  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      const response = await axios.get('/communities', {
        params: { cateId },
      });
      if (!completed) {
        const posts = response.data.content.map(p => {
          p.createdAt = moment(p.createdAt).format('YYYY.MM.DD');
          return p;
        });
        setAllPosts(posts);
        setTotalPostsCount(response.data.totalElements);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, [cateId]);

  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      const response = await axios.get('/categories');
      if (!completed) {
        setCategories(response.data);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, []);

  const handleCateIdChange = v => {
    const selectedcateId = v.target.value;
    if (selectedcateId === 0) {
      setCateId(undefined);
    } else {
      setCateId(selectedcateId);
    }
  };

  const onClick = () => {
    setCateId('');
  };

  const getMountains = async () => {
    let completed = false;
    let page = 1;
    const response = await axios.get('/communities', {
      params: { cateId, page },
    });
    if (!completed) {
      const posts = response.data.content.map(p => {
        p.createdAt = moment(p.createdAt).format('YYYY.MM.DD');
        return p;
      });
      const currentPosts = allPosts.concat(posts);
      setAllPosts(currentPosts);
      page++;
    }
  };

  const hasMore = allPosts.length < totalPostsCount;
  const fetchMoreData = () => {
    if (!hasMore) return;
    getMountains();
  };

  return (
    <MainContainer>
      <Layout>
        <Title>산에 대해 자유롭게 이야기를 나눠요</Title>

        <Content>
          {categories ? (
            <CateContainer>
              <Radio.Group
                defaultValue={0}
                buttonStyle="solid"
                onChange={handleCateIdChange}
              >
                <Radio.Button value={0}>
                  <div onClick={onClick}>모든 글</div>
                </Radio.Button>

                {categories.content.map(v => (
                  <Radio.Button key={v.cateId} value={v.cateId}>
                    {v.cateName}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </CateContainer>
          ) : (
            <Row>Loading...</Row>
          )}

          <SubContainer>
            <Form>
              <Form.Item name="search">
                <Search
                  placeholder="글 제목을 검색하세요"
                  onSearch={setUserInput}
                />
              </Form.Item>
            </Form>
            <Link to="/community/new">
              <Button type="primary">글쓰기</Button>
            </Link>
          </SubContainer>
          
          <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Row align="center">
              <CommunityTable
                dataSource={allPosts}
                columns={columns}
                pagination={false}
              />
            </Row>
          </InfiniteScroll>
        </Content>
      </Layout>
    </MainContainer>
  );
};

export default Community;
